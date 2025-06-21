import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BodyCoporateService } from '../../../services/body-coporate.service';
import { LifeCycleCost } from '../../../models/lifeCycleCost.model';
import { FormatAmountPipe } from "../../../pipes/format-amount.pipe";

@Component({
  selector: 'app-life-cycle-card',
  imports: [CommonModule, CardModule, TableModule, FormatAmountPipe],
  templateUrl: './life-cycle-card.component.html',
  styles: ``
})
export class LifeCycleCardComponent {

  bodyCoporateService = inject(BodyCoporateService);
  costs = input.required<LifeCycleCost[]>();
}
