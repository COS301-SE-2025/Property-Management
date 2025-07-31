import { Component, effect, input, OnDestroy, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaintenanceTask, VotingService, FormatDatePipe, ContractorApiService, InventoryUsage, Inventory, getCookieValue, TaskApiService, ImageApiService, InventoryUsageApiService, InventoryItemApiService, AssignedContractor } from 'shared';
import { CardModule } from 'primeng/card';
import { MultiSelect } from "primeng/multiselect";
import { BreadCrumbService } from '../../components/breadcrumb/breadcrumb.service';
import { InventoryUsageComponent } from 'property-manager/src/app/components/inventory-usage/inventory-usage.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { forkJoin, switchMap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';


@Component({
  selector: 'app-voting-details',
  imports: [HeaderComponent, CardModule, FormatDatePipe, MultiSelect, CommonModule, InventoryUsageComponent, ReactiveFormsModule, ConfirmDialogModule, ButtonModule, Toast, TableModule, QuoteDetailsComponent],
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
  
  public contractors = signal<AssignedContractor[] | undefined>(undefined);
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
    private inventoryUsageService: InventoryUsageApiService,
    private inventoryItemService: InventoryItemApiService,
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

          //Change in future to get only trusted contractors
          this.contractorService.getAllContractors().subscribe({
            next: (response) => {
              this.contractors.set(response);
            }
          })
    
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

      if(sessionId)
      {
        this.taskType = 'voting';
        this.votingService.getSessionTaskId(sessionId).subscribe({
          next: (res) => {
            if(res.taskUuid)
            {
              this.taskId = res.taskUuid;

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

                  if(this.taskId)
                  {
                    this.votingService.getAssignedContractors(this.taskId).subscribe({
                      next: (contractors) => {
                        contractors.forEach( contractor => {
                          //get contractor details
                          this.contractorService.getContractorById(contractor.contractorUuid!).subscribe({
                            next: (c) => {
                              const contractorDetails: AssignedContractor = {
                                ...c,
                                quoteSubmitted: contractor.quoteSubmitted,
                                quoteUuid: contractor.quoteUuid
                              }
                              this.addToContractors(contractorDetails);
                            },
                            error: (err) => {
                              console.error("Couldnt find assigned contractors", err);
                            }
                          });
                        })
                      }
                    })
                  }
                  this.task.set(res);
                },
                error: (err) => {
                console.error("Couldnt find task", err);
                this.detailError = true;
                }
              });
            }
          },
          error: () => {
            this.detailError = true;
          }
        });
      }
    }
  }
  private addToContractors(contractor: AssignedContractor)
  {
    const curr = this.contractors() || [];
    this.contractors.set([...curr, contractor]);
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

      //Update assigned contractors and approve
      const bcId = getCookieValue(document.cookie, 'bodyCoporateId');

      if(this.taskId)
      {
        //TODO - Change scheduled date
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

    const twoFromNow = new Date();
    twoFromNow.setDate(date.getDate() + 2);

    if(taskDate <= twoFromNow)
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
      //Put inventory back
      //Get inventory usage, find quantity and id and add back to inventory
      this.inventoryUsageService.getInventoryUsageByTaskId(this.taskId).subscribe({
        next: (res) => {
          //Update inventory items
          const updateReq = res.map(item =>
            this.inventoryItemService.updateInventoryItemQuantity(item.itemUuid, item.quantityUsed, 'ADD').pipe(
                //Delete inventory usage
                switchMap(() => this.inventoryUsageService.deleteInventoryUsageById(item.usageUuid))
            )
          );

          if(updateReq.length === 0)
          {
            this.deleteTask();
            return;
          }

          forkJoin(updateReq).subscribe({
            next: () => this.deleteTask(),
            error: (err) => {
              console.error(err);
              this.messageSerive.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Task unsuccesfully deleted'
              });
            }
          })
        }
      });
    }
  }
  private deleteTask()
  {
    if(!this.taskId) return;

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
        console.error(err);
        this.messageSerive.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Task unsuccesfully deleted'
        });
      }
    })
  }
}
