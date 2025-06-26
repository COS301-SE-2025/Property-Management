import { Component, effect, OnInit, signal } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { HousesService } from '../../services/houses.service';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InventoryCardComponent } from "./inventory-card/inventory-card.component";
import { BudgetCardComponent } from "./budget-card/budget-card.component";
import { TimelineCardComponent } from "./timeline-card/timeline-card.component";
import { Property } from '../../models/property.model';

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
    effect(() => {
      const houseId = this.route.snapshot.paramMap.get('houseId');
      const houses = this.houseService.houses();

      console.log(houseId);

      if(houseId && houses.length > 0)
      {
        const house = this.houseService.getHouseById(houseId);
        console.log(house);

        if(house)
        {
          this.house.set(house);
        }
      }
      else
      {
        console.log("Setting findhouse to true");
        this.findHouse.set(true);
      }
    });
  }

  ngOnInit()
  {
    const houseId = String(this.route.snapshot.paramMap.get('houseId'));
    this.houseService.loadInventory(houseId);
  }
}
