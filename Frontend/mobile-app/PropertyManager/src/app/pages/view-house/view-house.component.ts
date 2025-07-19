import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from "@ionic/angular/standalone";
import { HousesService, Property, StorageService } from 'shared';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from "src/app/components/tab/tab.component";
import { BudgetComponent } from "./budget/budget.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { TimelineComponent } from "./timeline/timeline.component";

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styles: ``,
  imports: [IonContent, TabComponent, HeaderComponent, CommonModule, BudgetComponent, InventoryComponent, TimelineComponent],
  animations: [
    trigger('floatUp', [
      state('void', style({
        transform: 'translateY(20%)',
        opacity: 0
      })),
      transition(':enter', [
        animate('600ms ease-out', style({
          transform: 'translateY(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class ViewHouseComponent  implements OnInit {

  public house = signal<Property | undefined>(undefined);
  public findHouse = signal(false);

  constructor(private route: ActivatedRoute, public houseService: HousesService, private storage: StorageService) {
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
          else
          {
            this.findHouse.set(true);
          }
        }
        else{
          this.findHouse.set(true);
        }
      });

      return () => sub.unsubscribe();
    });
   }

  async ngOnInit() {
    let id = await this.storage.get('trusteeId');

    if(!id)
    {
      id = await this.storage.get("bodyCorporateId");
    }

     const sub = this.route.paramMap.subscribe(async params => {
      const houseId = params.get('houseId');
      console.log(houseId);
      
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
    });
    sub.unsubscribe();
  }
}
