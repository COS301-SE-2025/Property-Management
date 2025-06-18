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
  templateUrl: './view-house.component.html',
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
