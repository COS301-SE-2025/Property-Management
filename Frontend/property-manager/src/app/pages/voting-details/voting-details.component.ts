import { Component, effect, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { MaintenanceTask, VotingService, FormatDatePipe } from 'shared';
import { CardModule } from 'primeng/card';
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-voting-details',
  imports: [HeaderComponent, CardModule, FormatDatePipe, CdkDragPlaceholder],
  templateUrl: './voting-details.component.html',
  styles: ``,
})
export class VotingDetailsComponent  implements OnInit {

  public task = signal<MaintenanceTask | undefined>(undefined);
  private taskId: string | null = null;
  constructor(private route: ActivatedRoute, private votingService: VotingService ) {
    effect(async () => {
      const tasks = this.votingService.votingTasks();
      console.log(tasks);
      console.log(this.taskId);
  
      if(this.taskId && tasks.length > 0)
      {
        const task = this.votingService.getTaskById(this.taskId);
        console.log(task);
  
        if(task)
        {
          this.task.set(task);
        }
      }
    })
   }

  async ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    if(this.taskId)
    {
      await this.votingService.getTrusteeVotingTasks('test');
    }
  }

}
