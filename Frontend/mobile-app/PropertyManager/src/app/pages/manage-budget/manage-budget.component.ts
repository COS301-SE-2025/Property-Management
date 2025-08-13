import { Component, effect, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { HousesService, Property, StorageService } from 'shared';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from "@ionic/angular/standalone";
import { TabComponent } from "src/app/components/tab/tab.component";
import { GraphComponent } from "./graph/graph.component";
import { InventoryCardComponent } from "./inventory/inventory-card.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";

@Component({
  selector: 'app-manage-budget',
  imports: [IonContent, HeaderComponent, CommonModule, TabComponent, GraphComponent, InventoryCardComponent, MaintenanceComponent],
  templateUrl: './manage-budget.component.html',
  styles: ``,
})
export class ManageBudgetComponent  implements OnInit {

  public house = signal<Property | undefined>(undefined);
  public findHouse = signal(false);
  public loading = signal(true);
  
  constructor(public houseService: HousesService, private route: ActivatedRoute, private storage: StorageService) {
     effect(() => {
      const houses = this.houseService.houses();

      const sub = this.route.paramMap.subscribe(params => {
        const houseId = params.get('houseId');
        if(houseId && houses.length > 0)
        {
          const house = this.houseService.getHouseById(houseId);
  
          if(house)
          {
            this.house.set(house);
          }
        }
        else
        {
          this.findHouse.set(true);
        }
      })
      return () => sub.unsubscribe();
    })
  }

  async ngOnInit() {
    
   this.loading.set(true);

   let id = await this.storage.get('trusteeId');

  if(!id)
  {
    id = await this.storage.get("bodyCorporateId");
  }

  const sub = this.route.paramMap.subscribe(async params => {
    const houseId = params.get('houseId');
    
    try{
     await Promise.all([
       this.houseService.loadHouses(id),
       this.houseService.loadInventory(houseId!),
       this.houseService.loadBudget(houseId!),
       this.houseService.loadTasks(houseId!)
     ]);
    }
    catch(error)
    {
     console.error("Error loading data:", error);
     this.findHouse.set(true);
    }
    finally{
     this.loading.set(false);
    }
  });
  sub.unsubscribe();
  }
}
