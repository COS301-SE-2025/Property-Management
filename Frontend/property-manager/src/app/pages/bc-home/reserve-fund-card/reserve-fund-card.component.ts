import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BodyCoporateService } from 'shared';
import { FormatAmountPipe } from "shared";
import { ReserveFund } from 'shared';
import { ReserveFundDialogComponent } from "./reserve-fund-dialog/reserve-fund-dialog.component";
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: 'app-reserve-fund-card',
  imports: [CommonModule, CardModule, TableModule, FormatAmountPipe, ReserveFundDialogComponent, DropdownModule, FormsModule],
  templateUrl: './reserve-fund-card.component.html',
  styles: ``
})
export class ReserveFundCardComponent {

  rows = 5;
  bodyCoporateService = inject(BodyCoporateService);
  schedule = input.required<ReserveFund[]>();
  contri = input.required<number>();
}
