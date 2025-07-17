import { Component, effect, OnInit, signal } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { GraphCardComponent } from './graph-card/graph-card.component';
import { InventoryBudgetCardComponent } from './inventory-budget-card/inventory-budget-card.component';
import { MaintenanceCardComponent } from "./maintenance-card/maintenance-card.component";
import { HousesService } from 'shared';
import { Property } from 'shared';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-manage-budget',
  imports: [HeaderComponent, CommonModule, GraphCardComponent, InventoryBudgetCardComponent, MaintenanceCardComponent],
  templateUrl: './manage-budget.component.html',
  styles: ``,
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
export class ManageBudgetComponent implements OnInit {
  public house = signal<Property | undefined>(undefined);
  public findHouse = signal(false);
  public loading = signal(true);

  constructor(public houseService: HousesService, private route: ActivatedRoute) {
    effect(() => {
      const houseId = this.route.snapshot.paramMap.get('houseId');
      const houses = this.houseService.houses();

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
  }

  async ngOnInit(){
   const houseId = String(this.route.snapshot.paramMap.get('houseId'));
   this.loading.set(true);

   try{
    await Promise.all([
      this.houseService.loadHouses(),
      this.houseService.loadInventory(houseId),
      this.houseService.loadBudget(houseId),
      this.houseService.loadTasks(houseId)
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
  }
}
