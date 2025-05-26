import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { HousesService } from '../../services/houses.service';
import { ActivatedRoute } from '@angular/router';
import { House } from '../../models/house.model';
import { CardModule } from 'primeng/card';
import { InventoryCardComponent } from "./inventory-card/inventory-card.component";
import { BudgetCardComponent } from "./budget-card/budget-card.component";
import { TimelineCardComponent } from "./timeline-card/timeline-card.component";

@Component({
  selector: 'app-view-house',
  imports: [HeaderComponent, CommonModule, CardModule, InventoryCardComponent, BudgetCardComponent, TimelineCardComponent],
  template: `
    <app-header/>
    <div class= "flex flex-col items-center pt-10">
      
      <div *ngIf = "findHouse" class = "pb-200">
        <p *ngIf = "findHouse" class = "text-yellow-500 font-semibold">Could not load house. Please try again</p>
      </div>

      <div class="px-4 space-y-8">
        <div class = "w-full mx-auto">
          <img [src]="house?.image" class="w-60 h-40 mx-auto object-scale-down mt-4 rounded-md" alt="">
          <p class = "text-center text-xl font-bold mt-4"> {{ house?.name }}</p>
        </div>

        <!-- 3 cards -->
        <div class = "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"> 
          <app-inventory-card class="shadow-md" [inventory]="houseService.inventory()"/>
          <app-budget-card class="shadow-md" [budget]="houseService.budgets()"/>
          <app-timeline-card class="shadow-md" [timeline]="houseService.timeline()"/>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class ViewHouseComponent implements OnInit{
  public house: House | undefined;
  public findHouse = false;

  constructor(private route: ActivatedRoute, public houseService: HousesService){}

  ngOnInit()
  {
    this.findHouse = false;

    
    const houseId = Number(this.route.snapshot.paramMap.get('houseId'));
    this.house = this.houseService.getHouseById(houseId);

    this.houseService.loadInventory(houseId);
    this.houseService.loadBudgetTimeline(houseId);

    if(this.house === undefined)
    {
      this.findHouse = true;
    }
  }
}
