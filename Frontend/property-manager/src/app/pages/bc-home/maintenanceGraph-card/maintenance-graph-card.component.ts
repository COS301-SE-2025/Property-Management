import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule, UIChart } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { BodyCoporateService, FormatAmountPipe } from 'shared';
import { Graph } from 'shared';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-maintenance-graph-card',
  imports: [CardModule, ChartModule, CommonModule, FormatAmountPipe, DividerModule],
  templateUrl: './maintenance-graph-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceGraphCardComponent {
  bodyCoporateService = inject(BodyCoporateService);
  bcData = input.required<Graph>();

  chartOptions!: ChartOptions<'bar'>;
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

  getChartOptions()
  {
    if(!this.bcData() || !this.bcData().datasets)
    {
      return {};
    }

    const textColor = this.darkMode ? '#ffffff' : '#000000';
    const gridColor = this.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    const hasPrediction = this.bcData().datasets.some(g => g.label === 'Predicted Budget' && g.data.some(v => v !== null));

    return{
      responsive: true,
      maintainAspectRatio: false,
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
