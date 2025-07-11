import { Component, inject, input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { HousesService } from '../../../services/houses.service';
import { FormatAmountPipe } from "../../../pipes/format-amount.pipe";
import { BuildingDetails } from '../../../models/buildingDetails.model';
import { BudgetAddDialogComponent } from './budget-app-dialog/budget-card/budget-add-dialog.component';

@Component({
  selector: 'app-budget-card',
  imports: [CardModule, CommonModule, ButtonModule, FormatAmountPipe, BudgetAddDialogComponent],
  templateUrl: './budget-card.component.html',
  styles: ``
})
export class BudgetCardComponent implements OnInit{

  houseService = inject(HousesService);
  houseId = '';

  budget = input.required<BuildingDetails>();
  hasBudget = false;

  constructor(private router: Router, private route: ActivatedRoute){
    this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }

  async ngOnInit() {
    this.hasBudget = await this.isExistingBudget();
  }

  async isExistingBudget(): Promise<boolean>
  {
    return await this.houseService.isBudget(this.houseId);
  }

  calculateTotalBudget(): number
  {
    return (this.budget().inventoryBudget + this.budget().maintenanceBudget);
  }
  RouteToManageBudget()
  {
    this.router.navigate(['/manageBudget', this.houseId]);
  }
}
