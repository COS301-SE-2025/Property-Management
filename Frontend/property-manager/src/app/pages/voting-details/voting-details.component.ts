import { Component, effect, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaintenanceTask, VotingService, FormatDatePipe, ContractorDetails, ContractorApiService } from 'shared';
import { CardModule } from 'primeng/card';
import { MultiSelect } from "primeng/multiselect";
import { BreadCrumbService } from '../../components/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-voting-details',
  imports: [HeaderComponent, CardModule, FormatDatePipe, MultiSelect, CommonModule],
  templateUrl: './voting-details.component.html',
  styles: `
    .due-date-normal{
      color:inherit;
    }
    .due-date-urgent{
      color: #ef4444;
      font-weight:600;
    }
  `,
})
export class VotingDetailsComponent  implements OnInit {

  public task = signal<MaintenanceTask | undefined>(undefined);
  private taskId: string | null = null;
  public contractors: ContractorDetails[] | undefined = undefined;
  public detailError = false;
  
  constructor(private route: ActivatedRoute, private votingService: VotingService, private contractorService: ContractorApiService, private breadCrumb: BreadCrumbService ) {
    effect(async () => {
      this.detailError = false;
      const tasks = this.votingService.votingTasks();
  
      if(this.taskId && tasks.length > 0)
      {
        console.log("getting task", this.taskId);
        let task = this.votingService.getPendingTaskById(this.taskId);
        
        if(!task)
        {
          task = this.votingService.getVotingTaskById(this.taskId);
        }
  
        if(task)
        {
          this.task.set(task);

          const crumbLabel = task.approved ? 'Task Voting' : 'Validating Task';

          breadCrumb.setBreadCrumbs([
            { label: crumbLabel, route: `/voting/${this.taskId}`}
          ]);
        }
        else
        {
          this.detailError = true;
        }
      }
    });
   }

  async ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    if(this.taskId)
    {
      await this.votingService.getTrusteeVotingTasks('test');
    }

    this.contractorService.getAllContractors().subscribe({
      next: (response) => {
        this.contractors = response;
      }
    })
  }

  async onSubmit()
  {
    //Approve task or vote
    //Assign contractors to task, ask KTO
  }
  private async submitVote()
  {

  }
  private async updateTask()
  {

  }
  changeDueDate()
  {
    const date = new Date().getDay;
    if(this.task()?.scheduled_date.getDay === date)
    {
      return 'due-date-urgent';
    }
    return 'due-date-normal';
  }
}
