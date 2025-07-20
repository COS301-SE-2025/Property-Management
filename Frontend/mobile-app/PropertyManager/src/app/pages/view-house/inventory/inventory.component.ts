import { Component, inject, input, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader, IonButton, ToastController, IonIcon, IonCardContent } from "@ionic/angular/standalone";
import { BudgetApiService, BuildingDetails, HousesService, Inventory } from 'shared';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { addOutline, removeOutline, checkmarkOutline, closeOutline  } from 'ionicons/icons';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: ``,
  imports: [IonButton, IonCardHeader, IonCardTitle, IonCard, FormsModule, CommonModule, TableModule, IonIcon, IonCardContent, AddInventoryComponent],
})
export class InventoryComponent  implements OnInit {

  houseService = inject(HousesService);
  budgetApiService = inject(BudgetApiService);
  inventory = input.required<Inventory[]>();
  private houseId: string | null = ''; 
  private paramSub!: Subscription;

  isEditing = false;
  editingRows: boolean[] = [];
  draftQuantities: number[] = [];
  originalQuantities: number[] = [];
  
  constructor(private route: ActivatedRoute, private toastController: ToastController) {
    this.paramSub = this.route.paramMap.subscribe(params => {
        this.houseId = params.get('houseId');
      });

      addIcons({ addOutline, removeOutline, checkmarkOutline, closeOutline});
   }

  ngOnInit() {
    this.resetState();
    console.log(this.inventory());
  }
  ngOnDestroy()
  {
    this.paramSub.unsubscribe();
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
      //Toast
      const toast = await this.toastController.create({
        message: "Inventory updated succesfully",
        duration: 1500,
        position: 'top',
        color: "warning"
      })
      await toast.present();
      this.resetState();

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }
  private async getAndUpdateBudget(overallPrice: number)
  {
    if(this.houseId)
    {

      this.budgetApiService.getBudgetsByBuildingId(this.houseId).subscribe(
        (bulidingDetails: BuildingDetails[]) => {
          const element = bulidingDetails[bulidingDetails.length-1];
          const elementID = element.budgetUuid;
  
          const newBudget: BuildingDetails = {
            budgetUuid: elementID,
            buildingUuid: this.houseId!,
            approvalDate: new Date(),
            inventoryBudget: (element.inventoryBudget-overallPrice),
            inventorySpent: overallPrice,
            maintenanceBudget: element.maintenanceBudget,
            maintenanceSpent: element.maintenanceSpent
          };
          console.log(newBudget);
          this.budgetApiService.updateBudget(elementID, newBudget).subscribe({
            error: async (err) => {
              console.error("Couldnt update budget", err);
  
              const toast = await this.toastController.create({
                message: 'Failed to update inventory',
                duration: 1500,
                position: 'top',
                color: "danger"
              });

              await toast.present();
            }
          });
        }
      )
    }
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
      return edit && this.draftQuantities[index] !== this.originalQuantities[index]
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
