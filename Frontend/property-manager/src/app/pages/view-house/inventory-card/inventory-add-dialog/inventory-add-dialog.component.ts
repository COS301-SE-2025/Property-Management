import { Component, OnInit, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { InventoryItemApiService, NotificationsApiService, BuildingApiService } from 'shared';
import { BudgetApiService } from 'shared';
import { BuildingDetails } from 'shared';
import { HousesService } from 'shared';
import { getCookieValue } from 'shared';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-inventory-add-dialog',
  imports: [DialogModule, CommonModule, ReactiveFormsModule, DatePickerModule, ToastModule],
  templateUrl: './inventory-add-dialog.component.html',
  styles: ``,
  providers: [MessageService]
})
export class InventoryAddDialogComponent extends DialogComponent implements OnInit {

  @Input() buildingUuid: string = '';
  form!: FormGroup;
  houseId = '';

  public boughtOn = new Date();
  public addError = false;

  constructor(
    private fb: FormBuilder,
    private inventoryItemApiService: InventoryItemApiService, 
    private route: ActivatedRoute, 
    private budgetApiService: BudgetApiService, 
    private housesService: HousesService,
    private messageService: MessageService,
    private notificationsService: NotificationsApiService,
    private buildingApiService: BuildingApiService,
  ){ 
    super();
    this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      boughtOn: ['']
    });
  }
  
  override closeDialog(): void {
    super.closeDialog();
    this.form.reset();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  async onSubmit() {
    if (this.form.valid) {
      const name = this.form.value.name;
      const price = this.form.value.price;
      const quantity = this.form.value.quantity;
      const buildingId = this.buildingUuid || this.houseId;

      let role: 'TRUSTEE' | 'CONTRACTOR' | null = null;

      if (getCookieValue(document.cookie, 'trusteeId')) {
        role = 'TRUSTEE';
      } else if (getCookieValue(document.cookie, 'contractorId')) {
        role = 'CONTRACTOR';
      }

      if (role === 'CONTRACTOR') {
        this.handleContractorRequest(name, price, quantity, buildingId);
      } else {
        this.inventoryItemApiService.detectAnomaly(name, price).subscribe({
          next: (res) => {
            const status = res.message === 'Item normal' ? 'normal' : 'ANOMALY';
            this.addInventoryItem(name, status, price, quantity);
          },
          error: (err) => {
            console.error("Anomaly detection failed", err);
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: 'Inventory anomaly detection failed, adding item anyway',
            });
            this.addInventoryItem(name, 'normal', price, quantity);
          }
        });
      }
    } else {
      this.addError = true;
    }
  }


  private handleContractorRequest(name: string, price: number, quantity: number, buildingId: string) {
    this.inventoryItemApiService.addInventoryItem(name, "PENDING", price, quantity, buildingId).subscribe({
      next: async (inventoryItem) => {
        const trusteeUuid = await this.getBuildingTrustee(buildingId);
        if (trusteeUuid) {
          const contractorId = getCookieValue(document.cookie, 'contractorId');
          this.notificationsService.createNotification({
            type: 'INVENTORY_REQUEST',
            message: `Contractor requested to add ${quantity} of ${name} at R${price} each (Total: R${price * quantity}) for building ${buildingId}`,
            recipientUuid: trusteeUuid,
            metadata: {
              inventoryItemUuid: inventoryItem.itemUuid,
              contractorId: contractorId,
              name: name,
              price: price,
              quantity: quantity,
              buildingId: buildingId,
              totalCost: price * quantity
            }
          }).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'info',
                summary: 'Pending Approval',
                detail: 'Inventory request sent to trustee for approval',
              });
              this.form.reset();
              this.closeDialog();
            },
            error: (err) => {
              console.error("Failed to send notification", err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Could not send request for approval',
              });
            }
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not find trustee for this building',
          });
        }
      },
      error: (err) => {
        console.error("Failed to add pending inventory item", err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not create inventory request',
        });
      }
    });
  }

  private async getBuildingTrustee(buildingId: string): Promise<string | null> {
    try {
      const building = await firstValueFrom(this.buildingApiService.getBuildingById(buildingId));
      return building?.trusteeUuid || null;
    } catch (error) {
      console.error('Error fetching building details:', error);
      return null;
    }
  }

  private addInventoryItem(name: string, status: string, price: number, quantity: number) {
    const buildingId = this.buildingUuid || this.houseId;
    this.inventoryItemApiService.addInventoryItem(name, status, price, quantity, buildingId).subscribe({
      next: async () => {
        if (status === 'normal') {
          await this.getAndUpdateBudget((price * quantity), buildingId);
        }

        await this.housesService.loadInventory(buildingId);
        await this.housesService.loadBudget(buildingId);

        const severity = status === 'normal' ? 'success' : 'warn';
        const summary = status === 'normal' ? 'Success' : 'Warning';
        const detail = status === 'normal' 
          ? 'Inventory item added successfully' 
          : 'Inventory anomaly detected, awaiting body corporate approval';

        this.messageService.add({
          severity,
          summary,
          detail,
        });
        
        this.form.reset();
        this.closeDialog();
      },
      error: async (err) => {
        console.error("Failed to create inventory item", err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add inventory item',
        });
      }
    });
  }

  private async getAndUpdateBudget(overallPrice: number, buildingId?: string) {
    const targetBuildingId = buildingId || this.houseId;

    if (!targetBuildingId) {
      console.error("No building ID available for budget update");
      return;
    }

    this.budgetApiService.getBudgetsByBuildingId(targetBuildingId).subscribe(
      (bulidingDetails: BuildingDetails[]) => {
        const element = bulidingDetails[bulidingDetails.length - 1];
        const elementID = element.budgetUuid;

        const newBudget: BuildingDetails = {
          budgetUuid: elementID,
          buildingUuid: targetBuildingId,
          approvalDate: new Date(),
          inventoryBudget: (element.inventoryBudget - overallPrice),
          inventorySpent: overallPrice,
          maintenanceBudget: element.maintenanceBudget,
          maintenanceSpent: element.maintenanceSpent
        };
        this.budgetApiService.updateBudget(elementID, newBudget).subscribe({
          error: (err) => {
            console.error("Couldnt update budget", err);
          }
        });
      }
    );
  }
}
