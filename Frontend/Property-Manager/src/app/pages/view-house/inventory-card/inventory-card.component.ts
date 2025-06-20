import { Component, inject, input} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Inventory } from '../../../models/inventory.model';
import { CommonModule } from '@angular/common';
import { HousesService } from '../../../services/houses.service';
import { InventoryAddDialogComponent } from "./inventory-add-dialog/inventory-add-dialog.component";

@Component({
  selector: 'app-inventory-card',
  imports: [CardModule, TableModule, CommonModule, InventoryAddDialogComponent],
  templateUrl: './inventory-card.component.html',
  styles: ``
})
export class InventoryCardComponent {
  
  houseService = inject(HousesService);

  inventory = input.required<Inventory[]>();
}
