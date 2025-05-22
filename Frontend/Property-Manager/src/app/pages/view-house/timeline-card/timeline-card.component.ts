import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { HousesService } from '../../../services/houses.service';
import { Timeline } from '../../../models/timeline.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-card',
  imports: [CardModule, TimelineModule, CommonModule],
  template: `
    <p-card class="text-center">
      <ng-template #title>Timeline</ng-template>

      <p-timeline [value]="timeline()">
        <ng-template #content let-time>
            {{ time.description }}
        </ng-template>
        <ng-template #marker let-time>
          <div [class]="time.done ? 'bg-yellow-300': 'bg-gray-300'" class="flex items-center justify-center w-3 h-3 rounded-full shadow-md">
            <i [class]="time.done ? 'pi pi-check text-gray-200' : 'pi pi-clock text-gray-200'"></i>
          </div>
        </ng-template>
      </p-timeline>
    </p-card>
  `,
  styles: ``
})
export class TimelineCardComponent {
  houseService = inject(HousesService);

  timeline = input.required<Timeline[]>();
}
