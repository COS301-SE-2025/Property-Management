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
          <div class="flex items-center justify-center w-6 h-6 rounded-full shadow-md bg-white-200">
          <ng-container *ngIf="time.done; else pending">
            <img src="assets/icons/task_done.svg" alt="Done" class="w-5 h-5" />
            </ng-container>
            <ng-template #pending>
              <i class="pi pi-clock text-gray-400"></i>
            </ng-template>
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
