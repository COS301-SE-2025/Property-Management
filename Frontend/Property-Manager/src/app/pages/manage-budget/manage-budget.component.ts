import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { House } from '../../models/house.model';
import { BudgetService } from '../../services/budget.service';
import { GraphCardComponent } from './graph-card/graph-card.component';
import { InventoryBudgetCardComponent } from './inventory-budget-card/inventory-budget-card.component';
import { MaintenanceCardComponent } from "./maintenance-card/maintenance-card.component";


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
  public house: House | undefined;
  public findHouse = false;

  constructor(public budgetService: BudgetService) {}

  ngOnInit(){
    this.findHouse = false;

    this.house = this.budgetService.house();
    
    if(this.house === undefined)
    {
      this.findHouse = true;
    }
  }
}
