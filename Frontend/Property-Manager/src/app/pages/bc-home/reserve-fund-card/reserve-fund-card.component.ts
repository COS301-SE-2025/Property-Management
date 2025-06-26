import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BodyCoporateService } from '../../../services/body-coporate.service';
import { FormatAmountPipe } from "../../../pipes/format-amount.pipe";
import { ReserveFund } from '../../../models/reserveFund.model';

@Component({
  selector: 'app-reserve-fund-card',
  imports: [CommonModule, CardModule, TableModule, FormatAmountPipe],
  templateUrl: './reserve-fund-card.component.html',
  styles: ``
})
export class ReserveFundCardComponent {

  bodyCoporateService = inject(BodyCoporateService);
  schedule = input.required<ReserveFund[]>();
}
