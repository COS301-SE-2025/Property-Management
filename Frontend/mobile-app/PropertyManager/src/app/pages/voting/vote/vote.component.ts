import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MaintenanceTask, VotingService, FormatDatePipe, StorageService, Voting } from 'shared';

@Component({
  selector: 'app-vote',
  imports: [ FormatDatePipe ],
  templateUrl: './vote.component.html',
  styles: `
    .due-date-normal {
      @apply text-inherit dark:text-white;
    }
    .due-date-urgent {
      @apply text-[#ff3838] dark:text-[#ff3838] font-[200];
    }
  `,
})
export class VoteComponent {

  votingService = inject(VotingService);
  task = input.required<Voting>();

  constructor(private router: Router, private storage: StorageService) { }

  async viewTask(sessionId: string, taskId: string)
  {
    await this.storage.set('taskId', taskId);
    await this.storage.set('sessionId', sessionId);
    this.router.navigate(['voting', sessionId]);
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
