import { Component, inject, input} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Inventory } from '../../../models/inventory.model';
import { CommonModule } from '@angular/common';
import { HousesService } from '../../../services/houses.service';

@Component({
  selector: 'app-inventory-card',
  imports: [CardModule, TableModule, CommonModule],
  template: `
    <div class = "flex">
      <p-card class="text-center">
        <ng-template #title>Inventory</ng-template>
        <p-table [value] = "inventory()" [tableStyle]="{ 'min-width': '22rem' }">
          <ng-template #header>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </ng-template>
          <ng-template #body let-inventory>
            <tr>
              <td>{{ inventory.name }}</td>
              <td>{{ inventory.quantityInStock }}</td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: ``
})
export class InventoryCardComponent {
  
  houseService = inject(HousesService);

  inventory = input.required<Inventory[]>();
}
