import { Component, inject, input, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { HousesService } from 'shared';
import { CommonModule } from '@angular/common';
import { TimelineAddDialogComponent } from './timeline-add-dialog/timeline-add-dialog.component';
import { MaintenanceTask } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline-card',
  imports: [CardModule, TimelineModule, CommonModule, TimelineAddDialogComponent],
  templateUrl: './timeline-card.component.html',
  styles: ``
})
export class TimelineCardComponent {
  houseService = inject(HousesService);

  timeline = input.required<MaintenanceTask[]>();

  constructor(private router: Router){}

  showDetails(task: MaintenanceTask)
  {
    this.router.navigate(['taskDetails', task.uuid])
  }
}
