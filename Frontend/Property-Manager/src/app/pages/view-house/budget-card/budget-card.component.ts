import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { HousesService } from '../../../services/houses.service';
import { Budget } from '../../../models/budget.model';

@Component({
  selector: 'app-budget-card',
  imports: [CardModule, CommonModule],
  template: `
    <p-card class="text-center">
      <ng-template #title>Budgets</ng-template>
      <ng-template #subtitle>Overall Allocated Budget</ng-template> 
      <p class = "text-yellow-500 text-lg font-semibold mt-2">R {{ formatAmount(calculateTotalBudget()) }}</p> 

      <div class="flex flex-wrap justify-center gap-4 px-6 mt-4">
        <div *ngFor= "let bud of budget()" class="bg-gray-50 p-4 rounded-lg shadow text-center w-45">
          <p class = "font-medium text-sm text-gray-600 mb-1">Allocated {{ bud.category }} budget</p>
          <p class = "mt-1">R {{ formatAmount(bud.budgetAmount) }}</p>

          <div class="border-t border-gray-300 my-3">
            <p class = "font-medium text-sm text-gray-600 mb-1">Allocated {{bud.category}} Spent</p>
            <p class = "mt-1">R {{ formatAmount(bud.budgetSpent ?? 0) }}</p>
          </div>
        </div>
      </div>
    </p-card>
  `,
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
