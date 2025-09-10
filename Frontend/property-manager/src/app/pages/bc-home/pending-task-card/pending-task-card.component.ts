import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { BodyCoporateService } from 'shared';
import { MaintenanceTask } from 'shared';
import { FormatDatePipe } from "shared";
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: 'app-pending-task-card',
  imports: [CommonModule, TableModule, FormatDatePipe, CardModule, DropdownModule, FormsModule],
  templateUrl: './pending-task-card.component.html',
  styles: ``
})
export class PendingTaskCardComponent {

  rows = 5;
  bodyCoporateService = inject(BodyCoporateService);
  tasks = input.required<MaintenanceTask[]>();
}
