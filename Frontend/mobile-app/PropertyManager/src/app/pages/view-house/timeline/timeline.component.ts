import { Component, inject, input } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { TimelineModule } from 'primeng/timeline';
import { CommonModule } from '@angular/common';
import { HousesService, MaintenanceTask } from 'shared';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styles: ``,
  imports: [IonCardHeader, IonCardTitle, IonCardContent, IonCard, TimelineModule, CommonModule],
})
export class TimelineComponent{

  houseService = inject(HousesService);
  timeline = input.required<MaintenanceTask[]>();

  constructor() { }

  openDetailsDialog(item: MaintenanceTask): void
  {

  }
}
