import { Component, inject, input, ViewChild } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { TimelineModule } from 'primeng/timeline';
import { CommonModule } from '@angular/common';
import { HousesService, MaintenanceTask } from 'shared';
import { AddTimelineComponent } from './add-timeline/add-timeline.component';
import { ViewTaskComponent } from './view-task/view-task.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styles: ``,
  imports: [IonCardHeader, IonCardTitle, IonCardContent, IonCard, TimelineModule, CommonModule, AddTimelineComponent, ViewTaskComponent],
})
export class TimelineComponent{

  houseService = inject(HousesService);
  timeline = input.required<MaintenanceTask[]>();

  @ViewChild('taskModal') viewTask!: ViewTaskComponent;

  constructor() { }

  openDetailsDialog(item: MaintenanceTask): void
  {
    if(!item)
    {
      console.error("Invalid task");
      return;
    }

    this.viewTask.openModal(item);
  }
}
