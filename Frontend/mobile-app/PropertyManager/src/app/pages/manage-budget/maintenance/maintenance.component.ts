import { Component, inject, input } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { TableModule } from 'primeng/table';
import { BuildingDetails, FormatAmountPipe, HousesService, MaintenanceTask } from "shared";

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styles: ``,
  imports: [IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonCard, TableModule, FormatAmountPipe],
})
export class MaintenanceComponent {

  houseService = inject(HousesService);

  maintenance = input.required<MaintenanceTask[]>();
  budget = input.required<BuildingDetails>();
  constructor() { }

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
