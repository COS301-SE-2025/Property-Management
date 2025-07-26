import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { ContractorApiService, ContractorDetails, MaintenanceTask, StorageService, VotingService, FormatDatePipe } from 'shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [IonContent, HeaderComponent, TabComponent, IonCard, CommonModule, FormatDatePipe, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle],
  templateUrl: './details.component.html',
  styles: `
    .due-date-normal{
      color:inherit;
    }
    .due-date-urgent{
      color: #f01111;
    }
  `,
})
export class DetailsComponent  implements OnInit {

  public task = signal<MaintenanceTask | undefined>(undefined);
  private taskId: string | null = null;
  public contractors: ContractorDetails[] | undefined = undefined;
  public detailError = false;

  constructor(
    private votingService: VotingService, 
    private contractorService: ContractorApiService,
    private storage: StorageService
  ) {
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
        }
        else
        {
          this.detailError = true;
        }
      }
    })
  }

  async ngOnInit() {
    this.taskId = await this.storage.get('taskId');
    console.log(this.taskId);
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
  changeDueDate()
  {
    if(!this.task()?.scheduled_date) return 'due-date-normal';

    const date = new Date();
    const taskDate = new Date(this.task()!.scheduled_date);

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

