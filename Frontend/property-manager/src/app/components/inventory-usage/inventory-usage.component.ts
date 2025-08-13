import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { lastValueFrom, forkJoin } from 'rxjs';
import { Inventory, InventoryItemApiService, InventoryUsage, InventoryUsageApiService } from 'shared';

@Component({
  selector: 'app-inventory-usage',
  imports: [ TableModule, CardModule],
  templateUrl: './inventory-usage.component.html',
  styles: ``,
})
export class InventoryUsageComponent  implements OnInit, OnChanges {

  @Input() taskId: string | undefined;
  inventoryUsage: InventoryUsage[] | undefined = undefined;
  inventoryItem: Inventory[] | undefined = undefined;

  constructor(private inventoryUsageService: InventoryUsageApiService, private inventoryItemService: InventoryItemApiService) { }

  ngOnInit() {
    this.getInventoryUsage();
  }
  ngOnChanges(changes: SimpleChanges)
  {
    if(changes['taskId'] && !changes['taskId'].firstChange)
    {
      this.getInventoryUsage();
    }
  }

  async getInventoryUsage()
  {
    if(this.taskId)
    {
      try{
        this.inventoryUsage = await lastValueFrom(
          this.inventoryUsageService.getUsageRecordsByTaskId(this.taskId)
        );

        if(this.inventoryUsage?.length)
        {
          const inventoryReq = this.inventoryUsage.map(item => 
            this.inventoryItemService.getInventoryItemsById(item.itemUuid)
          )
          const inventoryItems = await lastValueFrom(forkJoin(inventoryReq));

          this.inventoryItem = inventoryItems.map((inventory, index) => ({
            ...inventory, 
            quantityUsed: this.inventoryUsage![index].quantityUsed,
          }));
        }
      }
      catch(error) {
        console.error("Error fetching inventory", error);
      }
    }
  }
}
