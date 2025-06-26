import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { BodyCoporateService } from '../../../services/body-coporate.service';
import { MaintenanceTask } from '../../../models/maintenanceTask.model';
import { FormatDatePipe } from "../../../pipes/format-date.pipe";

@Component({
  selector: 'app-pending-task-card',
  imports: [CommonModule, TableModule, FormatDatePipe],
  templateUrl: './pending-task-card.component.html',
  styles: ``
})
export class PendingTaskCardComponent {

  bodyCoporateService = inject(BodyCoporateService);
  tasks = input.required<MaintenanceTask[]>();
}
