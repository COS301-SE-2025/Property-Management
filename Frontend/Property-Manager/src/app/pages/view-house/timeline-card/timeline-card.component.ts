import { Component, inject, input, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { HousesService } from 'shared';
import { CommonModule } from '@angular/common';
import { TimelineAddDialogComponent } from './timeline-add-dialog/timeline-add-dialog.component';
import { MaintenanceTask } from 'shared';
import { TimelineDetailsDialogComponent } from './timeline-details-dialog/timeline-details-dialog.component';

@Component({
  selector: 'app-timeline-card',
  imports: [CardModule, TimelineModule, CommonModule, TimelineAddDialogComponent, TimelineDetailsDialogComponent],
  templateUrl: './timeline-card.component.html',
  styles: ``
})
export class TimelineCardComponent {
  houseService = inject(HousesService);

  timeline = input.required<MaintenanceTask[]>();

  @ViewChild('taskDialog') timelineDetails!: TimelineDetailsDialogComponent;

  openDetailsDialog(item: MaintenanceTask): void
  {
    if(!item)
    {
      console.error("Invalid task");
      return;
    }

    this.timelineDetails.openDialog(item);
  }
}
