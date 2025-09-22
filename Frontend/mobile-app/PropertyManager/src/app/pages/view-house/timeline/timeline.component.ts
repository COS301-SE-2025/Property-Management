import { Component, inject, input, ViewChild } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { TimelineModule } from 'primeng/timeline';
import { CommonModule } from '@angular/common';
import { HousesService, MaintenanceTask } from 'shared';
import { AddTimelineComponent } from './add-timeline/add-timeline.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styles: `
  `,
  imports: [IonCardHeader, IonCardTitle, IonCardContent, IonCard, TimelineModule, CommonModule, AddTimelineComponent],
})
export class TimelineComponent{

  houseService = inject(HousesService);
  timeline = input.required<MaintenanceTask[]>();

  count = 2;

  constructor(private router: Router) { }

  openDetails(item: MaintenanceTask): void
  {
    if(!item)
    {
      console.error("Invalid task");
      return;
    }

    this.router.navigate(['/view-task', item.uuid])
  }

  get VisibleTask(): MaintenanceTask[]{
    return this.timeline().slice(0, this.count);
  }

  toggleShow(){
    if(this.count >= this.timeline().length)
    {
      this.count = 2;
    }
    else
    {
      this.count = Math.min(this.count + 3, this.timeline().length);
    }
  }

  get toggleButton(): string
  {
    return this.count >= this.timeline().length ? 'Show Less' : 'Show More';
  }
}
