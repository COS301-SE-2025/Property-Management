import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HousesService } from '../../../services/houses.service';
import { Budget } from '../../../models/budget.model';

@Component({
  selector: 'app-budget-card',
  imports: [CardModule, CommonModule, ButtonModule],
  templateUrl: './budget-card.component.html',
  styles: ``
})
export class BudgetCardComponent {

  houseService = inject(HousesService);

  budget = input.required<Budget[]>();

  calculateTotalBudget(): number
  {
    let total = 0;
    for(const b of this.budget())
    {
      total += b.budgetAmount;
    }
    return total;
  }
  formatAmount(amount: number):string
  {
    const amountString = amount.toString();
    if(amountString.length === 5)
    {
      return `${amountString.slice(0,2)} ${amountString.slice(2)}`;
    }
    else if(amountString.length === 6)
    {
       return `${amountString.slice(0,3)} ${amountString.slice(3)}`;
    }
    return amountString;
  }
}
