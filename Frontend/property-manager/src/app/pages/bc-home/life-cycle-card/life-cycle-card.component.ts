import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BodyCoporateService } from 'shared';
import { LifeCycleCost } from 'shared';
import { FormatAmountPipe } from "shared";
import { AddCostDialogComponent } from "./add-cost-dialog/add-cost-dialog.component";

@Component({
  selector: 'app-life-cycle-card',
  imports: [CommonModule, CardModule, TableModule, FormatAmountPipe, AddCostDialogComponent],
  templateUrl: './life-cycle-card.component.html',
  styles: ``
})
export class LifeCycleCardComponent {

  bodyCoporateService = inject(BodyCoporateService);
  costs = input.required<LifeCycleCost[]>();
}
