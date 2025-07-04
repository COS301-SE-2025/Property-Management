import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
// import { FormatDatePipe } from "../../../pipes/format-date.pipe";
import { FormatAmountPipe } from "../../../pipes/format-amount.pipe";
import { EditBudgetDialogComponent } from "../edit-budget-dialog/edit-budget-dialog.component";
import { MaintenanceTask } from '../../../models/maintenanceTask.model';
// import { TaskDialogComponent } from '../../task-dialog/task-dialog.component';
import { BuildingDetails } from '../../../models/buildingDetails.model';
import { HousesService } from '../../../services/houses.service';

@Component({
  selector: 'app-maintenance-card',
  imports: [CardModule, TableModule, FormatAmountPipe, EditBudgetDialogComponent],
  templateUrl: './maintenance-card.component.html',
  styles: ``
})
export class MaintenanceCardComponent {
  houseService = inject(HousesService);

  maintenance = input.required<MaintenanceTask[]>();
  budget = input.required<BuildingDetails>();

  // @ViewChild('taskDialog') taskDialog!: TaskDialogComponent;

  // getMaintenanceTotal(): number {
  //   let total = 0;
  //   this.maintenance().forEach((item) => {
  //     total += item.;
  //   });
  //   return total;
  // }

  showMaintenanceDetailsDialog(maintenance: MaintenanceTask | MaintenanceTask[] | undefined): void {
    if(!maintenance || Array.isArray(maintenance)){
      console.error("Invalid maintenance data");
      return;
    }
    console.log("Inside show details", maintenance);

    //TODO: Implement dialog
    // this.taskDialog.openDialog(maintenance);
  }
}
