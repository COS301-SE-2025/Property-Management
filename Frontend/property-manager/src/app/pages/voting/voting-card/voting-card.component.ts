import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MaintenanceTask, VotingService, FormatDatePipe } from 'shared';

@Component({
  selector: 'app-voting-card',
  imports: [CardModule, CommonModule, FormatDatePipe],
  templateUrl: './voting-card.component.html',
  styles: ``,
})
export class VotingCardComponent{

  votingService = inject(VotingService);
  task = input.required<MaintenanceTask>();

  constructor(private router: Router) { }

  viewTask(taskId: string)
  {
    this.router.navigate(['voting', taskId]);
  }
}
