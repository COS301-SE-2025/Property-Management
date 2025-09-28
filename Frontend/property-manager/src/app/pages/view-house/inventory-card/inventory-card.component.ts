import { Component, EventEmitter, inject, Input, input, OnInit, Output} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from 'primeng/inputnumber';
import { getCookieValue, Inventory, InventoryUsageApiService } from 'shared';
import { CommonModule } from '@angular/common';
import { HousesService } from 'shared';
import { BudgetApiService } from 'shared';
import { BuildingDetails } from 'shared';
import { ActivatedRoute } from '@angular/router';
import { InventoryAddDialogComponent } from "./inventory-add-dialog/inventory-add-dialog.component";
// import { InventoryForecastComponent, ForecastResponse } from './inventory-forecast/inventory-forecast.component';
import { InventoryForecastComponent } from './inventory-forecast/inventory-forecast.component';
import { ForecastResponse } from 'shared';

@Component({
  selector: 'app-inventory-card',
  imports: [CardModule, TableModule, CommonModule, ButtonModule, FormsModule, InputNumberModule, ToastModule, InventoryAddDialogComponent, DropdownModule, InventoryForecastComponent],
  templateUrl: './inventory-card.component.html',
  styles: ``,
  providers: [MessageService]
})
export class InventoryCardComponent implements OnInit{
  
  houseService = inject(HousesService);
  budgetApiService = inject(BudgetApiService);
  inventory = input.required<Inventory[]>();
  private houseId = ''; 
  bcUser = false;

  forecastData: ForecastResponse | null = null;

  isEditing = false;
  editingItems = new Map<string, boolean>();
  draftQuantities = new Map<string, number>();
  originalQuantities = new Map<string, number>();

  rows = 5;

  @Output() itemUsage = new EventEmitter<{taskId: string, itemId: string, quantity: number}>();
  @Output() quantitiesChanged = new EventEmitter<Inventory[]>();

  @Input() capOriginal = false;
  @Input() showAddButton = true;
  @Input() readOnly = false;
  @Input() showPrice = true;

  constructor(private route: ActivatedRoute, private messageService: MessageService, private inventoryUsage: InventoryUsageApiService)
  {
    this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }

  async ngOnInit() {
    if(getCookieValue(document.cookie, 'bodyCoporateId')) {
      this.bcUser = true;
    }

    this.resetState();

    await this.loadForecastData();
  }

  private async loadForecastData() {
    try {
      await this.houseService.loadInventoryForecast(this.houseId);
      this.forecastData = this.houseService.inventoryForecast();
    } catch (error) {
      console.error('Error loading forecast data:', error);
      this.forecastData = null;
    }
  }

  startAction(inventory: Inventory, action: 'increase' | 'decrease' | 'edit')
  {
    if(!this.isEditing)
    {
      this.resetState();
      this.isEditing = true;
    }

    this.editingItems.set(inventory.itemUuid, true);
    this.originalQuantities.set(inventory.itemUuid, inventory.quantityInStock);
    this.draftQuantities.set(inventory.itemUuid, inventory.quantityInStock);

    if(action === 'increase')
    {
      this.changeQuantity(inventory, 1);
    }
    else if(action === 'decrease' &&  inventory.quantityInStock >= 0)
    {
      this.changeQuantity(inventory, -1);
    }
  }
  changeQuantity(inventory: Inventory, change: number)
  {
    const curr = this.draftQuantities.get(inventory.itemUuid) || 0;
    const max = this.originalQuantities.get(inventory.itemUuid) || 0;
    const val = curr + change;

    if(val >= 0 && (!this.capOriginal || val <= max))
    {
      this.draftQuantities.set(inventory.itemUuid, val)

      this.emitQuantities();
    }
  }
  onManualInput(inventory: Inventory, event: Event)
  {
    const input = event.target as HTMLInputElement;
    const max = this.originalQuantities.get(inventory.itemUuid) || 0;
    let value = Number(input.value);

    if(value < 0) value = 0;
    if(this.capOriginal && value > max)
    {
      value = max;
    }

    this.draftQuantities.set(inventory.itemUuid, value);
    this.emitQuantities();
  }
  async confirmAction()
  { 
    const updatedItems: Inventory[] = [];
    let overallPriceDiff = 0;

    this.inventory().forEach(item => {
      const isEditing = this.editingItems.get(item.itemUuid);
      const draftQty = this.draftQuantities.get(item.itemUuid);
      const originalQty = this.originalQuantities.get(item.itemUuid);

      if(isEditing && draftQty !== undefined && originalQty !== undefined && draftQty >= 0){

        const quantityDiff = draftQty - originalQty;

        if(quantityDiff > 0)
        {
          overallPriceDiff += quantityDiff * item.price;
        }
        item.quantityInStock = draftQty;
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
    
    await this.loadForecastData();
   }
   this.resetState();

   setTimeout(() => {
     window.location.reload();
   }, 2000);
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
    this.inventory().forEach(item => {
      if(this.editingItems.get(item.itemUuid)){
        item.quantityInStock = this.originalQuantities.get(item.itemUuid) || 0;
      }
    })
    this.resetState();
  }
  hasChanges(): boolean{
    return Array.from(this.editingItems.keys()).some(id => {
      return this.draftQuantities.get(id) && this.draftQuantities.get(id) !== this.originalQuantities.get(id);
    });
  }
  resetState()
  {
    this.isEditing = false;
    this.editingItems.clear();
    this.draftQuantities.clear();
    this.originalQuantities.clear();

    this.inventory().forEach(item => {
      this.draftQuantities.set(item.itemUuid, item.quantityInStock);
      this.originalQuantities.set(item.itemUuid, item.quantityInStock);
    })
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
    const updated = this.inventory().map(item => ({
      ...item,
      quantityInStock: this.draftQuantities.get(item.itemUuid) ?? item.quantityInStock
    }));
    this.quantitiesChanged.emit(updated);
  }

  //Used in dialogs
  async addItemToUsage(taskId: string, itemId: string, quantity: number, write: boolean)
  {
    if(write)
    {
      //Delete inventory item
      const item = this.houseService.getInventoryById(itemId);
      if(item)
      {
        this.itemUsage.emit({ taskId, itemId, quantity });
      }
  
      //Create inventory usage
      this.inventoryUsage.createInventoryUsage(itemId, taskId, quantity).subscribe({
        next: (res) => {
          return res.usageUuid;
        },
        error: (err) => {
          console.error("Error creating inventory usage", err);
        }
      });
    }
  }
}