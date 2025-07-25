import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Inventory } from '../../../models/inventory.model';
import { FormatAmountPipe } from "../../../pipes/format-amount.pipe";
import { EditBudgetDialogComponent } from "../edit-budget-dialog/edit-budget-dialog.component";
import { HousesService } from '../../../services/houses.service';
import { BuildingDetails } from '../../../models/buildingDetails.model';

@Component({
  selector: 'app-inventory-budget-card',
  imports: [CardModule, TableModule, FormatAmountPipe, EditBudgetDialogComponent],
  templateUrl: './inventory-budget-card.component.html',
  styles: ``
})
export class InventoryBudgetCardComponent {
  houseService = inject(HousesService);

  inventory = input.required<Inventory[]>();

  budget = input.required<BuildingDetails>();

  getMaintenanceTotal(): number {
    let total = 0;
    this.inventory().forEach((item) => {
      total += item.price * item.quantityInStock;
    });
    return total;
  }
}
