import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MaintenanceTask, VotingService, FormatDatePipe, StorageService } from 'shared';

@Component({
  selector: 'app-vote',
  imports: [ FormatDatePipe ],
  templateUrl: './vote.component.html',
  styles: `
     .due-date-normal{
      color:inherit;
    }
    .due-date-urgent{
      color: #ff3838;
      font-weight:200;
    }
  `,
})
export class VoteComponent {

  votingService = inject(VotingService);
  task = input.required<MaintenanceTask>();

  constructor(private router: Router, private storage: StorageService) { }

  async viewTask(taskId: string)
  {
    await this.storage.set('taskId', taskId);
    this.router.navigate(['voting', taskId]);
  }
  changeDueDate()
  {
    if(!this.task()?.scheduled_date) return 'due-date-normal';

    const date = new Date();
    const taskDate = new Date(this.task().scheduled_date);

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
