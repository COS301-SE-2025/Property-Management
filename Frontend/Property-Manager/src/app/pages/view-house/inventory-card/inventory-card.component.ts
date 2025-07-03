import { Component, inject, input, OnInit} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Inventory } from '../../../models/inventory.model';
import { CommonModule } from '@angular/common';
import { HousesService } from '../../../services/houses.service';
import { InventoryAddDialogComponent } from "./inventory-add-dialog/inventory-add-dialog.component";
import { BudgetApiService } from '../../../services/api/Budget api/budget-api.service';
import { BuildingDetails } from '../../../models/buildingDetails.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-card',
  imports: [CardModule, TableModule, CommonModule, InventoryAddDialogComponent, ButtonModule, FormsModule, InputNumberModule],
  templateUrl: './inventory-card.component.html',
  styles: ``
})
export class InventoryCardComponent implements OnInit{
  
  houseService = inject(HousesService);
  budgetApiService = inject(BudgetApiService);
  inventory = input.required<Inventory[]>();
  private houseId = ''; 

  isEditing = false;
  editingRows: boolean[] = [];
  draftQuantities: number[] = [];
  originalQuantities: number[] = [];

  constructor(private route: ActivatedRoute)
  {
    this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }

  ngOnInit()
  {
    this.resetState();
  }

  startAction(rowIndex: number, action: 'increase' | 'decrease' | 'edit')
  {
    if(!this.isEditing)
    {
      this.resetState();
      this.isEditing = true;
    }

    this.editingRows[rowIndex] = true;
    this.originalQuantities[rowIndex] = this.inventory()[rowIndex].quantityInStock;
    this.draftQuantities[rowIndex] = this.originalQuantities[rowIndex];

    if(action === 'increase')
    {
      this.changeQuantity(rowIndex, 1);
    }
    else if(action === 'decrease' && this.originalQuantities[rowIndex] >= 0)
    {
      this.changeQuantity(rowIndex, -1);
    }
  }
  changeQuantity(rowIndex:number, change: number)
  {
    const val = this.draftQuantities[rowIndex] + change;
    if(val >= 0)
    {
      this.draftQuantities[rowIndex] = val;
    }
  }
  async confirmAction()
  { 
    const updatedItems: Inventory[] = [];
    let overallPriceDiff = 0;

    this.inventory().forEach((item, index) => {
      if(this.editingRows[index] && this.draftQuantities[index] >= 0){

        const quantityDiff = this.draftQuantities[index] - this.originalQuantities[index];

        if(quantityDiff > 0)
        {
          overallPriceDiff += quantityDiff * item.price;
        }
        item.quantityInStock = this.draftQuantities[index];
        updatedItems.push(item);
      }
    });

    //API call
   if(updatedItems.length > 0)
   {
    console.log("updating api", updatedItems);
    await this.houseService.updateInventory(updatedItems);

    if(overallPriceDiff > 0)
    {
      console.log("Updating budget", overallPriceDiff)
      await this.getAndUpdateBudget(overallPriceDiff);
    }
   }
   this.resetState();
   window.location.reload();
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
        console.log(newBudget);
        this.budgetApiService.updateBudget(elementID, newBudget).subscribe({
          next: (response) => {
            console.log("Updated budget", response);
          },
          error: (err) => {
            console.error("Couldnt update budget", err);
          }
        });
      }
    )
  }
  cancelAction()
  {
    this.inventory().forEach((item, index) => {
      if(this.editingRows[index]){
        item.quantityInStock = this.originalQuantities[index];
      }
    })
    this.resetState();
  }
  hasChanges(): boolean{
    return this.editingRows.some((edit, index) => {
      edit && this.draftQuantities[index] !== this.originalQuantities[index]
    });
  }
  resetState()
  {
    this.isEditing = false;
    this.editingRows = new Array(this.inventory().length).fill(false);
    this.draftQuantities = [...this.inventory().map(item => item.quantityInStock)];
    this.originalQuantities = [...this.inventory().map(item => item.quantityInStock)];
  }
  preventNegative(event: KeyboardEvent)
  {
    if(event.key === '-' || event.key === 'e' || event.key === 'E')
    {
      event.preventDefault();
    }
  }
}