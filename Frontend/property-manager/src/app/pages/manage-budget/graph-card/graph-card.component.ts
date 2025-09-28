import { ChangeDetectorRef, Component, input, OnInit, ViewChild } from '@angular/core';
// import { BudgetService } from '../../../services/budget.service';
import { Graph } from 'shared';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { UIChart } from 'primeng/chart';

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

  @ViewChild('chart') chart!: UIChart;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit()
  {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.chartOptions = this.getChartOptions();

    window.addEventListener('darkModeChange', () => {
      this.darkMode = localStorage.getItem('darkMode') === 'true';
      this.chartOptions = this.getChartOptions();

      this.cdr.markForCheck();
      this.chart?.refresh();
    });
  }

  getChartOptions(){

    if(!this.budgetGraphData() || !this.budgetGraphData().datasets)
    {
      return {};
    }

    const textColor = this.darkMode ? '#ffffff' : '#000000';
    const gridColor = this.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

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
