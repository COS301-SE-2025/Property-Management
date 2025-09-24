import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, InventoryItemApiService, getCookieValue, MaintenanceTask } from 'shared';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contractor-inventory-request',
  templateUrl: './contractor-inventory-request.component.html',
  styleUrls: ['./contractor-inventory-request.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService],
  standalone: true
})
export class ContractorInventoryRequestComponent implements OnInit {
  @Input() task!: MaintenanceTask;
  form: FormGroup;
  availableItems: any[] = [];
  assignedTasks: MaintenanceTask[] = [];
  loading = false;
  error: string | null = null;
  itemControls: { selected: FormControl, quantity: FormControl }[] = [];


  constructor(
    private fb: FormBuilder,
    private api: ApiService, 
    private inventoryItemApi: InventoryItemApiService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      taskUuid: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loading = true;
    const contractorId = getCookieValue(document.cookie, 'contractorId');
    this.api.getContractorMaintenanceTasks(contractorId).subscribe({
      next: (tasks: MaintenanceTask[]) => {
        this.assignedTasks = tasks;
        this.loading = false;

        if (tasks.length > 0) {
          this.form.get('taskUuid')?.setValue(tasks[0].uuid);
        }
      },
      error: () => {
        this.error = 'Failed to load tasks';
        this.loading = false;
      }
    });

    this.form.get('taskUuid')?.valueChanges.subscribe(selectedUuid => {

      const task = this.assignedTasks.find(t => String(t.uuid) === String(selectedUuid));
      if (task && task['buildingUuid']) {
        this.inventoryItemApi.getInventoryItemsByBuilding(task['buildingUuid']).subscribe({
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
          },
          error: () => {
            this.error = 'Failed to load inventory items';
          }
        });
      } else {
        this.availableItems = [];
        this.itemControls = [];
      }
    });
  }

  onSubmit() {
    if (this.loading) return;

    const requests = this.availableItems
      .map((item, i) => ({
        itemUuid: item.itemUuid,
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
      next: () => {
        requests.forEach(r => {
          const item = this.availableItems.find(i => i.itemUuid === r.itemUuid);
          if (item) {
            item.quantityInStock -= r.quantity;
            this.inventoryItemApi.updateInventoryItemQuantity(item.itemUuid, r.quantity, 'SUBTRACT').subscribe();
          }
        });
        
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