import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { BodyCoporateService } from '../../../services/body-coporate.service';
import { Graph } from '../../../models/graph.model';

@Component({
  selector: 'app-maintenanceGraph-card',
  imports: [CardModule, ChartModule],
  templateUrl: './maintenanceGraph-card.component.html',
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
      plugins: {
        legend:{
          display: false
        }
      }
    };
  }
}
