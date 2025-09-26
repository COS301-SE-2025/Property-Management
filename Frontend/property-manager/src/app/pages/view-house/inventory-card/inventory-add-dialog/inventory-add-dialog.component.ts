import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItemApiService } from 'shared';
import { BudgetApiService } from 'shared';
import { BuildingDetails } from 'shared';
import { HousesService } from 'shared';

@Component({
  selector: 'app-inventory-add-dialog',
  imports: [DialogModule, CommonModule, ReactiveFormsModule, DatePickerModule, ToastModule],
  templateUrl: './inventory-add-dialog.component.html',
  styles: ``,
  providers: [MessageService]
})
export class InventoryAddDialogComponent extends DialogComponent implements OnInit{

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
    private messageService: MessageService
  ){ 
    super() ;
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
  }
 async onSubmit(){

    if(this.form.valid){
      const name = this.form.value.name;
      const price = this.form.value.price;
      const quantity = this.form.value.quantity;

      this.inventoryItemApiService.detectAnomaly(name, price).subscribe({
        next: (res) => {
          const status = res.message === 'Item normal' ? 'normal' : 'ANOMALY';
          this.addInventoryItem(name, status, price, quantity);
        },
        error: (err) => {
          console.error("Anomaly detection failed", err)
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'Inventory anomaly detection failed',
          });
        }
      });
    }
    else
    {
      this.addError = true;
    }
  }
  private addInventoryItem(name: string, status: string, price : number, quantity: number)
  {
    this.inventoryItemApiService.addInventoryItem(name, status, price, quantity, this.houseId).subscribe({
      next: async () => {
        if (status === 'normal') {
          await this.getAndUpdateBudget((price * quantity));
        }

        await this.housesService.loadInventory(this.houseId);
        await this.housesService.loadBudget(this.houseId);

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
      error: async(err) => {
        console.error("Failed to create inventory item", err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add inventory item',
        });
      }
    })
  }
  private async getAndUpdateBudget(overallPrice: number)
  {
    this.budgetApiService.getBudgetsByBuildingId(this.houseId).subscribe(
       (bulidingDetails: BuildingDetails[]) => {
        const element = bulidingDetails[bulidingDetails.length-1];
        const elementID = element.budgetUuid;

        const newBudget: BuildingDetails = {
          budgetUuid: elementID,
          buildingUuid: this.houseId,
          approvalDate: new Date(),
          inventoryBudget: (element.inventoryBudget-overallPrice),
          inventorySpent: overallPrice,
          maintenanceBudget: element.maintenanceBudget,
          maintenanceSpent: element.maintenanceSpent
        };
        this.budgetApiService.updateBudget(elementID, newBudget).subscribe({
          error: (err) => {
            console.error("Couldnt update budget", err);
            
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add inventory item',
            })
          }
        });
      }
    )
  }
}
