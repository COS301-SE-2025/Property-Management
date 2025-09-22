import { Component, inject, input, OnInit, signal } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { BuildingDetails, HousesService, Inventory, FormatAmountPipe, InventoryUsageApiService, ContractorApiService, InventoryUsage } from 'shared';
import { TableModule } from 'primeng/table';
import { EditBudgetComponent } from '../edit-budget/edit-budget.component';

interface InventoryUsageDisplay{
  itemName: string;
  quantityUsed: number;
  contractorName: string;
  contractorUuid: string;
};

@Component({
  selector: 'app-inventory-card',
  templateUrl: './inventory-card.component.html',
  styles: `
    .dark .p-datatable-thead > tr > th {
      background: #000000;         
    }
  `,
  imports: [IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, TableModule, IonCard, FormatAmountPipe, EditBudgetComponent],
})
export class InventoryCardComponent implements OnInit{
  houseService = inject(HousesService);
  inventory = input.required<Inventory[]>();
  budget = input.required<BuildingDetails>();
  inventoryUsage = signal<InventoryUsageDisplay[]>([]);

  constructor(private inventoryUsageService: InventoryUsageApiService, private contractorService: ContractorApiService) { }

  async ngOnInit() {
      this.inventory().forEach(item => {
        this.inventoryUsageService.getUsageRecordsByItemId(item.itemUuid).subscribe({
          next: (res) => {
            res.forEach(usage => {
              this.updateInventoryUsage(item.name, usage);
            });
          }
        }); 
      });
  }
  updateInventoryUsage(name: string, inventoryUsage: InventoryUsage)
  {
    if(inventoryUsage.contractorUuid)
    {
      this.contractorService.getContractorById(inventoryUsage.contractorUuid).subscribe({
        next: (c) => {
         const display: InventoryUsageDisplay = {
          itemName: name,
          quantityUsed: inventoryUsage.quantityUsed,
          contractorName: c.name,
          contractorUuid: inventoryUsage.contractorUuid!
         };

         this.inventoryUsage.update(curr => {
          const filtered = curr.filter(u => 
            !(u.itemName === name && u.contractorUuid === inventoryUsage.contractorUuid)
          );
          return [...filtered, display];
         })
        }
      })
    }
    else
    {
      const display: InventoryUsageDisplay = {
        itemName: name,
        quantityUsed: inventoryUsage.quantityUsed,
        contractorName: 'N/A',
        contractorUuid: ''
      };

      this.inventoryUsage.update(curr => [...curr, display]);
    }
  }
}
