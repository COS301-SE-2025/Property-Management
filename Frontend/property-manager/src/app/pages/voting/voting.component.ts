import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { getCookieValue, MaintenanceTask, Voting, VotingService, FormatDatePipe } from 'shared';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TableModule, TableRowSelectEvent  } from "primeng/table";
import { Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from "primeng/dropdown";
import { SelectModule } from "primeng/select";
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-voting',
  imports: [HeaderComponent, CommonModule, TableModule, FormatDatePipe, FormsModule, TagModule, DropdownModule, SelectModule, ProgressSpinnerModule],
  templateUrl: './voting.component.html',
  styles: `
    .due-date-normal{
      color:inherit;
    }
    .due-date-urgent{
      color: #f01111;
    }
    .due-date-past{
      color: #858585;
    }
  `,
  animations: [
    trigger('floatUp', [
      state('void', style({
        transform: 'translateY(20%)',
        opacity: 0
      })),
      transition(':enter', [
        animate('600ms ease-out', style({
          transform: 'translateY(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class VotingComponent  implements OnInit {

  private votingService = inject(VotingService);
  votingTasks = this.votingService.votingTasks;
  pendingTasks = this.votingService.pendingTasks;
  finalApproval = this.votingService.finalApproval;
  approvedTasks = this.votingService.approvedTasks;

  bcUser = false;
  loading = true;

  priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'N/A', value: 'N/A'}
  ];

  typeOptions = [
    { label: 'Open for voting', value: 'Open for voting' },
    { label: 'Pending initial approval', value: 'Pending initial approval' },
    { label: 'Pending final approval', value: 'Pending final approval' },
    { label: 'Task approved', value: 'Task approved' }
  ];
  
  
  constructor(private router : Router) { 
    if(getCookieValue(document.cookie, 'bodyCoporateId'))
    {
      this.bcUser = true;
    }
  }
  
  async ngOnInit() {

    this.loading = true;
    if(!this.bcUser)
    {
      const trusteeId = getCookieValue(document.cookie, 'trusteeId');
      await this.votingService.getTrusteeVotingTasks(trusteeId);
    }
    else
    {
      await this.votingService.getBodyCorporateVotingTasks();
    }
    this.loading = false;
  }

  get allTasks(): (Voting | MaintenanceTask)[] {
    return [
      ...this.votingTasks().map(task => ({...task, type: 'Open for voting' , priority: task.priority ?? 'N/A' })),
      ...this.pendingTasks().map(task => ({...task, type: 'Pending initial approval', priority: task.priority ?? 'N/A' })),
      ...this.finalApproval().map(task => ({...task, type: 'Pending final approval', priority: task.priority ?? 'N/A' })),
      ...this.approvedTasks().map(task => ({...task, type: 'Task approved', priority: task.priority ?? 'N/A' })),
    ]
  }

  showDetails(event: TableRowSelectEvent<Voting | MaintenanceTask>) {    
    const task = event.data;
    if (!task) return;

    const isVotingTask = (t: any): t is Voting => 'sessionUuid' in t;
    
    const taskType = (task as any).type;

    if (taskType === 'Open for voting' && isVotingTask(task)) 
    {
      this.router.navigate(['/voting', task.sessionUuid]);
    } 
    else if (this.bcUser && taskType === 'Pending initial approval' && 'uuid' in task) 
    {
      this.router.navigate(['/voting', task.uuid, '/approval']);
    } 
    else if (this.bcUser && 'uuid' in task) 
    {
      this.router.navigate(['/voting', task.sessionUuid]);
    }
  }
  changeDueDate(task: MaintenanceTask | Voting)
  {
    if(!task.scheduled_date) return 'due-date-normal';

    if(task.scheduled_date < new Date()) return 'due-date-past';

    const date = new Date();
    const taskDate = new Date(task!.scheduled_date);

    date.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    const twoFromNow = new Date();
    twoFromNow.setDate(date.getDate() + 2);

    if(taskDate <= twoFromNow)
    {
      return 'due-date-urgent';
    }
    return 'due-date-normal';
  }
  getSeverity(option: string) : string
  {
    if(option === 'Low')
    {
      return 'success';
    }
    else if(option === 'Medium')
    {
      return 'warn';
    }
    else if(option === 'High')
    {
      return 'danger';
    }

    return 'secondary';
  }
}
