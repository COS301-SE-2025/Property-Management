// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CardModule } from 'primeng/card';
// import { DialogModule } from 'primeng/dialog';
// import { TableModule } from 'primeng/table';
// import { MaintenanceTask } from '../../models/maintenanceTask.model';
// import { DialogComponent } from '../../components/dialog/dialog.component';
// import { FormatDatePipe } from "../../pipes/format-date.pipe";
// import { FormatAmountPipe } from "../../pipes/format-amount.pipe";

// @Component({
//   selector: 'app-task-dialog',
//   imports: [CardModule, DialogModule, TableModule, CommonModule, FormatDatePipe, FormatAmountPipe],
//   templateUrl: './task-dialog.component.html',
//   styles: ``
// })
// export class TaskDialogComponent extends DialogComponent {
//   task: MaintenanceTask | undefined;

//   override openDialog(task?: MaintenanceTask): void {
//       this.task = task;
//       this.displayDialog = true;
//   }
//   override closeDialog(): void {
//     super.closeDialog();
//     this.task = undefined;
//   }
  
// }
