import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { BodyCoporateService } from 'shared';
import { MaintenanceTask } from 'shared';
import { FormatDatePipe } from "shared";

@Component({
  selector: 'app-pending-task-card',
  imports: [CommonModule, TableModule, FormatDatePipe, CardModule],
  templateUrl: './pending-task-card.component.html',
  styles: ``
})
export class PendingTaskCardComponent {

  bodyCoporateService = inject(BodyCoporateService);
  tasks = input.required<MaintenanceTask[]>();
}
