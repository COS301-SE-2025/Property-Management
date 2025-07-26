import { Component, EventEmitter, inject, Input, input, OnInit, Output} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { Inventory, InventoryUsageApiService } from 'shared';
import { CommonModule } from '@angular/common';
import { HousesService } from 'shared';
import { BudgetApiService } from 'shared';
import { BuildingDetails } from 'shared';
import { ActivatedRoute } from '@angular/router';
import { InventoryAddDialogComponent } from "./inventory-add-dialog/inventory-add-dialog.component";

@Component({
  selector: 'app-inventory-card',
  imports: [CardModule, TableModule, CommonModule, ButtonModule, FormsModule, InputNumberModule, ToastModule, InventoryAddDialogComponent],
  templateUrl: './inventory-card.component.html',
  styles: ``,
  providers: [MessageService]
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

  //Used inside dialogs that call the table
  @Output() itemUsage = new EventEmitter<{taskId: string, itemId: string, quantity: number}>();
  @Output() quantitiesChanged = new EventEmitter<Inventory[]>();

  @Input() capOriginal = false;
  @Input() showAddButton = true;
  @Input() readOnly = false;

  constructor(private route: ActivatedRoute, private messageService: MessageService, private inventoryUsage: InventoryUsageApiService)
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
    const max = this.originalQuantities[rowIndex];

    if(val >= 0 && (!this.capOriginal || val <= max))
    {
      this.draftQuantities[rowIndex] = val;

      this.emitQuantities();
    }
  }
  onManualInput(rowIndex: number, event: Event)
  {
    const input = event.target as HTMLInputElement;
    const max = this.originalQuantities[rowIndex];
    let value = Number(input.value);

    if(value < 0) value = 0;
    if(this.capOriginal && value > max)
    {
      value = max;
    }

    this.draftQuantities[rowIndex] = value;
    this.emitQuantities();
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
    await this.houseService.updateInventory(updatedItems);

    if(overallPriceDiff > 0)
    {
      await this.getAndUpdateBudget(overallPriceDiff);
    }
    //Toast
    this.messageService.add({
     severity: 'success',
     summary: 'Success',
     detail: 'Inventory updated successfully'
    });
   }
   this.resetState();

   setTimeout(() => {
     window.location.reload();
   }, 3000);
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
          error: (err) => {
            console.error("Couldnt update budget", err);

            this.messageService.add({
              severity: 'danger',
              summary: 'Error',
              detail: 'Failed to update inventory'
            });
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
  private emitQuantities()
  {
    const updated = this.inventory().map((item, index) => ({
      ...item,
      quantityInStock: this.draftQuantities[index]
    }));
    this.quantitiesChanged.emit(updated);
  }

  async addItemToUsage(taskId: string, itemId: string, quantity: number)
  {
    //Delete inventory item
    const item = this.houseService.getInventoryById(itemId);
    if(item)
    {
      this.itemUsage.emit({ taskId, itemId, quantity });
    }

    //Create inventory usage
    this.inventoryUsage.createInventoryUsage(itemId, taskId, '00000000-0000-0000-0000-000000000000', quantity).subscribe({
      next: (res) => {
        console.log(res);
        return res.usageUuid;
      },
      error: (err) => {
        console.error("Error creating inventory usage", err);
      }
    });
  }
}