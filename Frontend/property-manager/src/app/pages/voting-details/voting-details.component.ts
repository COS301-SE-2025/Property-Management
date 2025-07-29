import { Component, effect, input, OnDestroy, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaintenanceTask, VotingService, FormatDatePipe, ContractorDetails, ContractorApiService, InventoryUsage, Inventory, Voting, getCookieValue, TaskApiService, ImageApiService } from 'shared';
import { CardModule } from 'primeng/card';
import { MultiSelect } from "primeng/multiselect";
import { BreadCrumbService } from '../../components/breadcrumb/breadcrumb.service';
import { InventoryUsageComponent } from 'property-manager/src/app/components/inventory-usage/inventory-usage.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';


@Component({
  selector: 'app-voting-details',
  imports: [HeaderComponent, CardModule, FormatDatePipe, MultiSelect, CommonModule, InventoryUsageComponent, ReactiveFormsModule, ConfirmDialogModule, ButtonModule, Toast],
  templateUrl: './voting-details.component.html',
  providers: [MessageService, ConfirmationService],
  styles: `
    .due-date-normal{
      color:inherit;
    }
    .due-date-urgent{
      color: #f01111;
    }
  `,
})
export class VotingDetailsComponent  implements OnInit, OnDestroy {

  public task = signal<MaintenanceTask | undefined>(undefined);
  public taskId: string | null = null;

  //True if the task has been approved
  public taskType: 'approval' | 'voting' | undefined;
  
  public contractors: ContractorDetails[] | undefined = undefined;
  public inventoryUsage: InventoryUsage[] | undefined = undefined;
  public inventoryItem: Inventory[] | undefined = undefined;
  public detailError = false;

  public form!: FormGroup;
  public confirmDialog = false;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private votingService: VotingService,
    private contractorService: ContractorApiService, 
    private taskService: TaskApiService,
    private imageService: ImageApiService,
    private breadCrumb: BreadCrumbService, 
    private fb: FormBuilder,
    private messageSerive: MessageService,
    private confirmService: ConfirmationService
   ) {
    effect(async () => {
      this.detailError = false;
      const currentTask = this.task();
  
      if(currentTask)
      {
        const crumbLabel = this.taskType === 'voting' ? 'Task Voting' : 'Validating Task';

        breadCrumb.setBreadCrumbs([
          { label: crumbLabel, route: `/voting/${this.taskId}`}
        ]);
      }
    });
   }

  async ngOnInit() {

    //If there is a taskId we still need to approve it
    this.taskId = this.route.snapshot.paramMap.get('taskId');

    if(this.taskId)
    {
      this.taskType = 'approval';
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (res) => {

          if(res.img)
          {
            this.imageService.getImage(res.img).subscribe({
              next: (url) => {
                res.img = url
              } 
            })
          }
          else
          {
            res.img = "assets/images/no_img.png";
          }
          this.task.set(res);
    
          this.form = this.fb.group({
            contractorName: ['', Validators.required]
          });
        },
        error: (err) => {
          console.error("Couldnt find task", err);
          this.detailError = true;
        }
      });
    }
    else
    {
      //Get session details and taskId 
      const sessionId = this.route.snapshot.paramMap.get('sessionId');
      console.log(sessionId);

      if(sessionId)
      {
        this.taskType = 'voting';
        
      }
    }

    this.contractorService.getAllContractors().subscribe({
      next: (response) => {
        this.contractors = response;
      }
    })
  }
  ngOnDestroy(): void {
    this.breadCrumb.clearBreadCrumb();
  }

  async onSubmit()
  {
    //Approve task or vote
    if(this.form.valid)
    {
      const contractors = this.form.value.contractorName;
      console.log(contractors);

      //Update assigned contractors and approve
      const bcId = getCookieValue(document.cookie, 'bodyCoporateId');

      if(this.taskId)
      {
        await this.votingService.createVotingSession(contractors, this.taskId, bcId).then(() => {
          this.messageSerive.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Task succesfully approved'
          });

          setTimeout(() => {
            this.router.navigate(['voting']).then(() => {
              window.location.reload();
            })
          }, 2500);
        });
      }
    }
  }
  private async submitVote()
  {
    
  }
  private async updateTask()
  {

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
  confirmDisapprove(event: Event) {
    this.confirmDialog = true;
    this.confirmService.confirm({
      target: event.target as EventTarget,
      message: `
        Are you sure you want to disapprove this task?<br>
        This will delete the task from the property
      `,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-outlined p-button-success',
      rejectButtonStyleClass: 'p-button-outlined p-button-danger',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times'
    });
  }
  onDisapprove()
  {
    if(this.taskId)
    {
      console.log('deleting task');
      this.taskService.deleteTask(this.taskId).subscribe({
        next: () => {
          this.confirmDialog = false;

          setTimeout(() => {
            this.router.navigate(['voting']).then(() => {
              window.location.reload();
            })
          }, 2500);
        },
        error: (err) => {
          console.log(err);
          this.messageSerive.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Task unsuccesfully deleted'
          });
        }
      });
    }
  }
}
