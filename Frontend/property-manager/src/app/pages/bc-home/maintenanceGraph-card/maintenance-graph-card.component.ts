import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { BodyCoporateService } from 'shared';
import { Graph } from 'shared';

@Component({
  selector: 'app-maintenance-graph-card',
  imports: [CardModule, ChartModule, CommonModule],
  templateUrl: './maintenance-graph-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceGraphCardComponent {
  bodyCoporateService = inject(BodyCoporateService);
  bcData = input.required<Graph>();

  getChartOptions()
  {
    return{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend:{
          display: false
        }
      }
    };
  }
}
