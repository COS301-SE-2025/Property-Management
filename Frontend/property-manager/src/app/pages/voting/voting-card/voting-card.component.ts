import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MaintenanceTask, VotingService, FormatDatePipe, Voting } from 'shared';

@Component({
  selector: 'app-voting-card',
  imports: [CardModule, CommonModule, FormatDatePipe],
  templateUrl: './voting-card.component.html',
  styles: `
   .due-date-normal{
      color:inherit;
    }
    .due-date-urgent{
      color: #ff3838;
      font-weight:600;
    }
  `,
})
export class VotingCardComponent{

  votingService = inject(VotingService);
  task = input.required<MaintenanceTask | Voting>();
  type = input.required<string>();

  constructor(private router: Router) { }

  viewTask(id: string)
  {
    if(this.type() === 'approval')
    {
      this.router.navigate(['voting', id, 'approval']);
    }
    else
    {
      this.router.navigate(['voting', id])
    }
  }
  changeDueDate()
  {
    const task = this.task() as MaintenanceTask;

    if(!task.scheduled_date) return 'due-date-normal';

    const date = new Date();
    const taskDate = new Date(task.scheduled_date);

    date.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    const threeFromNow = new Date();
    threeFromNow.setDate(date.getDate() + 3);

    if(taskDate <= threeFromNow)
    {
      return 'due-date-urgent';
    }
    return 'due-date-normal';
  }
}
