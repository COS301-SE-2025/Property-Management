import { Component, input } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { Graph } from 'shared';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styles: ``,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, ChartModule],
})
export class GraphComponent {

  budgetGraphData = input.required<Graph>();
  displayDialog = true;

  constructor() { }

  getChartOptions(){
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
