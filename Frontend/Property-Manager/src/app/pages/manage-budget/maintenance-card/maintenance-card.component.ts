import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BudgetService } from '../../../services/budget.service';
import { Budget } from '../../../models/budget.model';
import { MaintenanceBudget } from '../../../models/maintenanceBudget.model';
import { FormatDatePipe } from "../../../pipes/format-date.pipe";
import { FormatAmountPipe } from "../../../pipes/format-amount.pipe";
import { EditBudgetDialogComponent } from "../edit-budget-dialog/edit-budget-dialog.component";

@Component({
  selector: 'app-maintenance-card',
  imports: [CardModule, TableModule, FormatDatePipe, FormatAmountPipe, EditBudgetDialogComponent],
  templateUrl: './maintenance-card.component.html',
  styles: ``
})
export class MaintenanceCardComponent {
  budgetService = inject(BudgetService);

  maintenance = input.required<MaintenanceBudget[]>();
  budget = input.required<Budget[]>();

  getMaintenanceTotal(): number {
    let total = 0;
    this.maintenance().forEach((item) => {
      total += item.cost;
    });
    return total;
  }

  showMaintenanceDetailsDialog(maintenance: MaintenanceBudget | MaintenanceBudget[] | undefined): void {
    if(!maintenance || Array.isArray(maintenance)){
      console.error("Invalid maintenance data");
      return;
    }

    //TODO: Implement dialog
  }
}
