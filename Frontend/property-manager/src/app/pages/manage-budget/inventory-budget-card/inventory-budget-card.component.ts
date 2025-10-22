import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ContractorService, Inventory, InventoryUsage, InventoryUsageApiService, FormatDatePipe } from 'shared';
import { FormatAmountPipe } from "shared";
import { EditBudgetDialogComponent } from "../edit-budget-dialog/edit-budget-dialog.component";
import { HousesService } from 'shared';
import { BuildingDetails } from 'shared';

interface InventoryUsageDisplay{
  itemName: string;
  quantityUsed: number;
  contractorName: string;
  contractorUuid: string;
  approvalDate: Date;
};

@Component({
  selector: 'app-inventory-budget-card',
  imports: [CardModule, TableModule, FormatAmountPipe, EditBudgetDialogComponent, CommonModule, FormatDatePipe],
  templateUrl: './inventory-budget-card.component.html',
  styles: ``
})

export class InventoryBudgetCardComponent  implements OnInit{
  houseService = inject(HousesService);
  inventory = input.required<Inventory[]>();
  budget = input.required<BuildingDetails>();
  inventoryUsage = signal<InventoryUsageDisplay[]>([]);


  constructor(private inventoryUsageService: InventoryUsageApiService, private contractorService: ContractorService){}

  async ngOnInit()
  {
    //Get inventory usage for each item in inventory
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
          contractorUuid: inventoryUsage.contractorUuid!,
          approvalDate: inventoryUsage.approvalDate!
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
        contractorUuid: '',
        approvalDate: inventoryUsage.approvalDate!
      };

      this.inventoryUsage.update(curr => [...curr, display]);
    }
  }
}
