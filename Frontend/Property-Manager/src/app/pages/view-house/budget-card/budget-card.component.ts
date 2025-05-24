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
        <div *ngFor= "let bud of budget()" class="bg-gray-50 p-4 rounded-md shadow-sm text-center w-40">
          <p class = "font-medium">{{ bud.category }}</p>
          <p class = "mt-1 font-semibold">R {{ formatAmount(bud.amount) }}</p>
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
      total += b.amount;
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
