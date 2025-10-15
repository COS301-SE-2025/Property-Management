import { Component, EventEmitter, inject, Input, input, OnDestroy, OnInit, Output } from '@angular/core';
import { IonCard, IonCardTitle, IonCardHeader, IonButton, ToastController, IonIcon, IonCardContent } from "@ionic/angular/standalone";
import { BudgetApiService, BuildingDetails, ForecastResponse, HousesService, Inventory, InventoryUsageApiService } from 'shared';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { addOutline, removeOutline, checkmarkOutline, closeOutline  } from 'ionicons/icons';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { InventoryForecastComponent } from './inventory-forecast/inventory-forecast.component';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styles: `
    .dark .p-datatable-thead > tr > th {
      background: #000000;         
    }
  `,
  imports: [IonButton, IonCardHeader, IonCardTitle, IonCard, FormsModule, CommonModule, TableModule, IonIcon, IonCardContent, AddInventoryComponent , InventoryForecastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryComponent implements OnInit, OnDestroy {

  houseService = inject(HousesService);
  budgetApiService = inject(BudgetApiService);
  inventory = input.required<Inventory[]>();
  private houseId: string | null = ''; 
  private paramSub!: Subscription;

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
  
  constructor(private route: ActivatedRoute, private toastController: ToastController, private inventoryUsage: InventoryUsageApiService) {
    this.paramSub = this.route.paramMap.subscribe(params => {
        this.houseId = params.get('houseId');
        // ensure forecast loads when route params change
        if (this.houseId) {
          this.loadForecastData().catch(err => console.error('Error loading forecast on param change', err));
        }
      });

      addIcons({ addOutline, removeOutline, checkmarkOutline, closeOutline});
   }

  // call loadForecastData on init so mobile behaves like web
  async ngOnInit() {
    this.resetState();
    await this.loadForecastData();
  }
  ngOnDestroy()
  {
    this.paramSub.unsubscribe();
  }

  private async loadForecastData() {
    try {
      if (this.houseId) {
        await this.houseService.loadInventoryForecast(this.houseId);
        this.forecastData = this.houseService.inventoryForecast();
      } else {
        this.forecastData = null;
      }
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
    else if(action === 'decrease' && inventory.quantityInStock >= 0)
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
  async confirmAction()
  { 
    const updatedItems: Inventory[] = [];
    let overallPriceDiff = 0;

    this.inventory().forEach(item => {
      const isEditing = this.editingItems.get(item.itemUuid);
      const draftQty = this.draftQuantities.get(item.itemUuid);
      const originalQty = this.originalQuantities.get(item.itemUuid);

      if(isEditing &&  draftQty !== undefined && originalQty !== undefined && draftQty >= 0){

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
      const toast = await this.toastController.create({
        message: "Inventory updated succesfully",
        duration: 1500,
        position: 'top',
        color: "warning"
      })
      await toast.present();

      await this.loadForecastData();

      this.resetState();
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
    const updated = this.inventory().map((item, index) => ({
      ...item,
      quantityInStock: this.draftQuantities.get(item.itemUuid) ?? item.quantityInStock
    }));
    this.quantitiesChanged.emit(updated);
  }
  //Used in modals
  async addItemToUsage(taskId: string, itemId: string, quantity: number)
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
