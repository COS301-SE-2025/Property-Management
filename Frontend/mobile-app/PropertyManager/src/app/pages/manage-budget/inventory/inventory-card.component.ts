import { Component, inject, input } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { BuildingDetails, HousesService, Inventory, FormatAmountPipe } from 'shared';
import { TableModule } from 'primeng/table';
import { EditBudgetComponent } from '../edit-budget/edit-budget.component';

@Component({
  selector: 'app-inventory-card',
  templateUrl: './inventory-card.component.html',
  styles: ``,
  imports: [IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, TableModule, IonCard, FormatAmountPipe, EditBudgetComponent],
})
export class InventoryCardComponent {
  houseService = inject(HousesService);

  inventory = input.required<Inventory[]>();

  budget = input.required<BuildingDetails>();
  constructor() { }

   getMaintenanceTotal(): number {
    let total = 0;
    this.inventory().forEach((item) => {
      total += item.price * item.quantityInStock;
    });
    return total;
  }
}
