import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, InventoryItemApiService, getCookieValue, MaintenanceTask, NotificationsApiService, Notification, ContractorApiService, BuildingApiService } from 'shared';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InventoryAddDialogComponent } from '../view-house/inventory-card/inventory-add-dialog/inventory-add-dialog.component';

@Component({
  selector: 'app-contractor-inventory-request',
  templateUrl: './contractor-inventory-request.component.html',
  styleUrls: ['./contractor-inventory-request.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ToastModule, InventoryAddDialogComponent],
  providers: [MessageService],
  standalone: true
})
export class ContractorInventoryRequestComponent implements OnInit {
  @Input() task!: MaintenanceTask;
  @ViewChild('inventoryAddDialog') inventoryAddDialog!: InventoryAddDialogComponent;
  form: FormGroup;
  availableItems: any[] = [];
  assignedTasks: MaintenanceTask[] = [];
  loading = false;
  error: string | null = null;
  itemControls: { selected: FormControl, quantity: FormControl }[] = [];

  contractor = false;
  contractorDetails: any = null;
  buildingDetails: any = null;

  // Check if task is approved
  get isTaskApproved(): boolean {
    return this.task?.status === 'APPROVED';
  }

  constructor(
    private fb: FormBuilder,
    private api: ApiService, 
    private inventoryItemApi: InventoryItemApiService,
    private notificationsApi: NotificationsApiService,
    private contractorApi: ContractorApiService,
    private buildingApi: BuildingApiService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      taskUuid: ['', Validators.required]
    });
  }

  ngOnInit() {
    const contractorId = getCookieValue(document.cookie, 'contractorId');

    if(contractorId) {
      this.contractor = true;
      this.loadContractorDetails(contractorId);
    } else {
      return;
    }

    // Only load inventory if task is approved
    if (!this.isTaskApproved) {
      return;
    }
    
    this.loading = true;
    this.loadBuildingDetails();
    this.loadInventoryItems();
  }

  async loadContractorDetails(contractorId: string) {
    try {
      this.contractorDetails = await this.contractorApi.getContractorById(contractorId).toPromise();
    } catch (error) {
      console.error('Failed to load contractor details:', error);
    }
  }

  async loadBuildingDetails() {
    if (this.task?.buuid) {
      try {
        this.buildingDetails = await this.buildingApi.getBuildingById(this.task.buuid).toPromise();
      } catch (error) {
        console.error('Failed to load building details:', error);
      }
    }
  }

  loadInventoryItems() {
    if (this.task?.buuid) {
      this.inventoryItemApi.getInventoryItemsByBuilding(this.task.buuid).subscribe({
        next: (items) => {
          this.availableItems = items.map(item => ({
            ...item,
            buildingUuid: item.buildingUuidFk ?? item.buildingUuid
          }));
          this.itemControls = items.map(() => ({
            selected: new FormControl(false),
            quantity: new FormControl({ value: 1, disabled: true }, [Validators.min(1)])
          }));

          this.itemControls.forEach((ctrl, i) => {
            ctrl.selected.valueChanges.subscribe(selected => {
              if (selected) {
                ctrl.quantity.enable();
              } else {
                ctrl.quantity.disable();
              }
            });
          });
          
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load inventory items';
          this.loading = false;
        }
      });
    } else {
      this.availableItems = [];
      this.itemControls = [];
      this.loading = false;
    }
  }

  openAddInventoryDialog() {
    if (this.inventoryAddDialog && this.task?.buuid) {
      this.inventoryAddDialog.buildingUuid = this.task.buuid; 
      this.inventoryAddDialog.openDialog();
    }
  }

  async createNotificationForTrustee(itemName: string, quantity: number) {
    try {
      // Get trustee UUID from the task
      const trusteeUuid = this.task?.tuuid;
      if (!trusteeUuid) {
        console.warn('No trustee UUID found for notification');
        return;
      }

      const contractorName = this.contractorDetails?.name || 'Contractor';
      const taskTitle = this.task?.title || 'Unknown Task';
      const buildingName = this.buildingDetails?.name || 'Unknown Building';

      const notification: Notification = {
        notificationType: 'inventory_usage_request',
        message: `The contractor ${contractorName} requested ${quantity} ${itemName} for task "${taskTitle}" in building "${buildingName}"`,
        recipientType: 'trustee',
        recipientUuid: trusteeUuid,
        isRead: false,
        relatedTaskUuid: this.task.uuid
      };

      await this.notificationsApi.createNotifications(notification).toPromise();
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
  }

  onSubmit() {
    if (this.loading) return;

    if (!this.isTaskApproved) {
      this.error = 'This task must be approved before you can request inventory items.';
      return;
    }

    const requests = this.availableItems
      .map((item, i) => ({
        itemUuid: item.itemUuid,
        itemName: item.name,
        quantity: this.itemControls[i].quantity.value,
        selected: this.itemControls[i].selected.value
      }))
      .filter(r => r.selected && r.quantity > 0);

    if (requests.length === 0) {
      this.error = 'Please select at least one inventory item and enter a valid quantity.';
      return;
    }

    this.loading = true;
    this.error = null;

    const contractorId = getCookieValue(document.cookie, 'contractorId');
    const taskUuid = this.task.uuid;

    const apiCalls = requests.map(r =>
      this.api.createInventoryUsage({
        itemUuid: r.itemUuid,
        taskUuid,
        usedByContractorUuid: contractorId,
        quantityUsed: r.quantity
      })
    );

    forkJoin(apiCalls).subscribe({
      next: async () => {
        // Update inventory quantities and create notifications
        for (const request of requests) {
          const item = this.availableItems.find(i => i.itemUuid === request.itemUuid);
          if (item) {
            item.quantityInStock -= request.quantity;
            this.inventoryItemApi.updateInventoryItemQuantity(item.itemUuid, request.quantity, 'SUBTRACT').subscribe();
          }
          
          // Create notification for each requested item
          await this.createNotificationForTrustee(request.itemName, request.quantity);
        }
        
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Inventory Requested',
          detail: 'Your inventory request has been submitted successfully.',
          life: 3000
        });
        setTimeout(() => this.router.navigate(['/contractorHome']), 1000);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to submit inventory requests. Please try again.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to submit inventory requests.',
          life: 3000
        });
        console.error(err);
      }
    });
  }
}