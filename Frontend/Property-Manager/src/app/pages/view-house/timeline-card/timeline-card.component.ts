import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { HousesService } from '../../../services/houses.service';
import { CommonModule } from '@angular/common';
import { TimelineAddDialogComponent } from './timeline-add-dialog/timeline-add-dialog.component';
import { MaintenanceTask } from '../../../models/maintenanceTask.model';

@Component({
  selector: 'app-timeline-card',
  imports: [CardModule, TimelineModule, CommonModule, TimelineAddDialogComponent],
  templateUrl: './timeline-card.component.html',
  styles: ``
})
export class TimelineCardComponent {
  houseService = inject(HousesService);

  timeline = input.required<MaintenanceTask[]>();
}
