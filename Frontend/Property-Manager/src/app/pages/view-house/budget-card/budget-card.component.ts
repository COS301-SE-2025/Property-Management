import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { HousesService } from '../../../services/houses.service';
import { Budget } from '../../../models/budget.model';
import { FormatAmountPipe } from "../../../pipes/format-amount.pipe";

@Component({
  selector: 'app-budget-card',
  imports: [CardModule, CommonModule, ButtonModule, FormatAmountPipe],
  templateUrl: './budget-card.component.html',
  styles: ``
})
export class BudgetCardComponent {

  houseService = inject(HousesService);

  budget = input.required<Budget[]>();

  constructor(private router: Router, private route: ActivatedRoute){}

  calculateTotalBudget(): number
  {
    let total = 0;
    for(const b of this.budget())
    {
      total += b.budgetAmount;
    }
    return total;
  }
  RouteToManageBudget()
  {
    const houseId = Number(this.route.snapshot.paramMap.get('houseId'));
    this.router.navigate(['/manageBudget', houseId]);
  }
}
