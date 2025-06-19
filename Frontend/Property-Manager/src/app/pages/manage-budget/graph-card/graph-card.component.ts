import { Component, inject, input } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';
import { BudgetGraph } from '../../../models/budgetGraph.model';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-graph-card',
  imports: [ChartModule, CardModule],
  templateUrl: './graph-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphCardComponent {

  budgetService = inject(BudgetService);
  budgetGraphData = input.required<BudgetGraph>();
  displayDialog = true;

  getCharOptions(){
    return {
      responsive: true,
      plugins: {
        legend:{
          display: false
        }
      }
    };
  }
}
