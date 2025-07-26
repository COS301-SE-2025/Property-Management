import { Component, effect, OnInit, signal } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { getCookieValue, HousesService } from 'shared';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InventoryCardComponent } from "./inventory-card/inventory-card.component";
import { BudgetCardComponent } from "./budget-card/budget-card.component";
import { TimelineCardComponent } from "./timeline-card/timeline-card.component";
import { Property } from 'shared';

@Component({
  selector: 'app-view-house',
  imports: [HeaderComponent, CommonModule, CardModule, InventoryCardComponent, BudgetCardComponent, TimelineCardComponent],
  templateUrl: './view-house.component.html',
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
export class ViewHouseComponent implements OnInit{
  public house = signal<Property | undefined>(undefined);
  public findHouse = signal(false);

  constructor(private route: ActivatedRoute, public houseService: HousesService){
    effect(async () => {
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
    });
  }

  async ngOnInit()
  {
    let id = getCookieValue(document.cookie, 'trusteeId');

    if(!id)
    {
      id = getCookieValue(document.cookie, 'bodyCorporateId');
    }
    const houseId = String(this.route.snapshot.paramMap.get('houseId'));
    
    try{
      await Promise.all([
        this.houseService.loadHouses(id),
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
  }
}
