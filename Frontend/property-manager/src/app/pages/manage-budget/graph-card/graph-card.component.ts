import { Component, input, OnInit } from '@angular/core';
// import { BudgetService } from '../../../services/budget.service';
import { Graph } from 'shared';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-graph-card',
  imports: [ChartModule, CardModule],
  templateUrl: './graph-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphCardComponent implements OnInit {

  // budgetService = inject(BudgetService);
  budgetGraphData = input.required<Graph>();
  displayDialog = true;
  chartOptions!: ChartOptions<'line'>;
  darkMode = false;

  ngOnInit()
  {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.chartOptions = this.getChartOptions();

    window.addEventListener('storage', () => {
      this.darkMode = localStorage.getItem('darkMode') === 'true';
      this.chartOptions = this.getChartOptions();
    });
  }

  getChartOptions(){
    const textColor = this.darkMode ? '#000000' : '#000000';
    const gridColor = this.darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.1)';

    const hasPrediction = this.budgetGraphData().datasets.some(g => g.label === 'Predicted Budget' && g.data.some(v => v !== null));
    return {
      responsive: true,
      plugins: {
        legend:{
          display: hasPrediction,
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        },
        y: {
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        }
      }
    };
  }
}
