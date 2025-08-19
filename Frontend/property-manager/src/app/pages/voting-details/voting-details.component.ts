import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaintenanceTask, VotingService, FormatDatePipe, ContractorApiService, InventoryUsage, Inventory, getCookieValue, TaskApiService, ImageApiService, InventoryUsageApiService, InventoryItemApiService, AssignedContractor, NotificationsApiService, Notification, BodyCoporateApiService, BodyCoporateService } from 'shared';
import { CardModule } from 'primeng/card';
import { MultiSelect } from "primeng/multiselect";
import { BreadCrumbService } from '../../components/breadcrumb/breadcrumb.service';
import { InventoryUsageComponent } from '../../components/inventory-usage/inventory-usage.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Toast } from 'primeng/toast';
import { forkJoin, switchMap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { VotingResultsComponent } from './voting-results/voting-results.component';


@Component({
  selector: 'app-voting-details',
  imports: [CardModule, FormatDatePipe, MultiSelect, CommonModule, InventoryUsageComponent, ReactiveFormsModule, ConfirmDialogModule, ButtonModule, Toast, TableModule, QuoteDetailsComponent, ToggleButtonModule, FormsModule, VotingResultsComponent],
  templateUrl: './voting-details.component.html',
  providers: [MessageService, ConfirmationService],
  styles: `
    .due-date-normal{
      color:inherit;
    }
    .due-date-urgent{
      color: #dbdbdb;
    }
    .due-date-past{
      color: #858585;
    }
    .p-togglebutton {
      background-color: #facc15; 
    }
  `,
})
export class VotingDetailsComponent  implements OnInit, OnDestroy {

  public task = signal<MaintenanceTask | undefined>(undefined);
  public taskId: string | null = null;
  private taskName: string | null = null;
  private trusteeId: string | null = null;

  //True if the task has been approved
  public taskType: 'approval' | 'voting' | undefined;
  
  public contractors = signal<AssignedContractor[] | undefined>(undefined);
  public inventoryUsage: InventoryUsage[] | undefined = undefined;
  public inventoryItem: Inventory[] | undefined = undefined;
  public detailError = false;

  public selectedContractorId = signal<string | null>(null);
  public voteSubmitted = signal<boolean>(false); 
  public contractorQuotes = signal<Record<string, string>>({});
  public selectedQuoteId = signal<string | null>(null);

  public form!: FormGroup;
  public confirmDialog = false;
  public bcUser = false;
  public sessionId: string | null = null;

  public voteResult = false;
  public awaitFinal = false;

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
    private bodyCorporateService: BodyCoporateService,
    private fb: FormBuilder,
    private messageSerive: MessageService,
    private confirmService: ConfirmationService,
    private notificationService: NotificationsApiService

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
    this.bcUser = true;
    const bcId = getCookieValue(document.cookie, 'bodyCoporateId');
    this.taskId = this.route.snapshot.paramMap.get('taskId');

    if(this.taskId)
    {
      this.taskType = 'approval';
      this.taskService.getTaskById(this.taskId).subscribe({
        next: async (res) => {

          this.taskName = res.title;
          this.trusteeId = res.tuuid;

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

          await this.bodyCorporateService.loadTrustedContractors(bcId)
          this.contractors.set(this.bodyCorporateService.contractorDetails());
    
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
      this.sessionId = this.route.snapshot.paramMap.get('sessionId');
      this.voteResult = false;
      this.awaitFinal = false;
      if(this.sessionId)
      {
        this.taskType = 'voting';
        this.votingService.getTaskIdFromSessionId(this.sessionId).subscribe({
          next: (res) => {
            if(res.taskUuid)
              {
                this.taskId = res.taskUuid;
                this.trusteeId = res.tuuid;
                
                this.taskService.getTaskById(this.taskId).subscribe({
                  next: (res) => {
                    this.taskName = res.title;
                  if(res.cuuid !== '' && res.cuuid)
                  {
                    this.voteResult = true;
                  }
                  else if(res.approvalStatus === 'PENDING' && res.scheduled_date < new Date())
                  {
                    this.awaitFinal = true;
                  }

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

                              if(!this.voteResult || this.awaitFinal)
                              {
                                const contractorDetails: AssignedContractor = {
                                  ...c,
                                  quoteSubmitted: contractor.quoteSubmitted,
                                  quoteUuid: contractor.quoteUuid
                                }
                                this.addToContractors(contractorDetails);
                              }
                              else
                              {
                                this.contractorService.getContractorById(this.task()?.cuuid!).subscribe({
                                  next: (c) => {
                                    if(this.contractors()?.some(ct => ct.uuid === c.uuid))
                                    {
                                      return;
                                    }
                                    this.contractors.set([]);

                                     const contractorDetails: AssignedContractor = {
                                      ...c,
                                      quoteSubmitted: contractor.quoteSubmitted,
                                      quoteUuid: contractor.quoteUuid
                                    }
                                    this.addToContractors(contractorDetails);
                                  }
                                })
                              }
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

    if(contractor.quoteUuid)
    {
      this.contractorQuotes.update(quotes => ({
        ...quotes,
        [contractor.uuid]: contractor.quoteUuid!
      }));
    }
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

          const noti: Notification = {
            notificationType: 'Task approval',
            message: `Task ${this.taskName} has been initially approved`,
            recipientType: 'trustee',
            recipientUuid: this.trusteeId!,
            relatedTaskUuid: this.taskId!,
            isRead: false
          }
          this.notificationService.createNotifications(noti).subscribe({
            next: () => {
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
            }
          })
        });
      }
    }
  }
  async submitVote()
  {
      const contractorId = this.selectedContractorId();

      if(!contractorId || !this.taskId || this.voteSubmitted()){
        return;
      }

      const quoteId = this.contractorQuotes()[contractorId];

      if(!quoteId)
      {
        this.messageSerive.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Please review quote before voting'
        });
        return;
      }

      //api call and message
      const sessionId = this.route.snapshot.paramMap.get('sessionId');

      let userId = getCookieValue(document.cookie, 'trusteeId');
      let isTrusteee = false;

      if(userId)
      {
        isTrusteee = true;
      }
      else
      {
        userId = getCookieValue(document.cookie, 'bodyCoporateId');
        isTrusteee = false;
      }

      if(sessionId)
      {
        this.votingService.castVote(sessionId, quoteId, userId, isTrusteee).subscribe({
          next: () => {
            this.voteSubmitted.set(true);

            const noti: Notification = {
              notificationType: 'Vote submitted',
              message: `Vote has been cast for task: ${this.taskName!}`,
              recipientType: isTrusteee ? 'trustee' : 'bodycoporate',
              recipientUuid: userId,
              isRead: false,
              relatedSessionUuid: sessionId
            }
            this.notificationService.createNotifications(noti).subscribe({
              next: () => {
                this.messageSerive.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Successfully submitted vote'
                });
    
                setTimeout(() => {
                  this.router.navigate(['/voting']);
                }, 2000);
              }
            });
          },
          error: (err) => {
            console.error(err);
            this.voteSubmitted.set(false);

            this.messageSerive.add({
              severity: 'error',
              summary: 'Error',
              detail: this.votingService.handleVotingError(err)
            });
          }
        });
      }
  }
  voteForContractor(contractorId: string)
  {
    if(!this.voteSubmitted()){
      this.selectedContractorId.set(
        this.selectedContractorId() === contractorId ? null : contractorId
      );

      if(this.contractorQuotes()[contractorId])
      {
        this.selectedQuoteId.set(this.contractorQuotes()[contractorId]);
      }
    }
  }
  onQuoteSelected(contractorId: string, quoteId: string)
  {
    this.contractorQuotes.update(quotes => ({
      ...quotes,
      [contractorId]: quoteId
    }));

    if(this.selectedContractorId() === contractorId)
    {
      this.selectedQuoteId.set(quoteId);
    }
  }
  changeDueDate()
  {
    if(!this.task()?.scheduled_date) return 'due-date-normal';

    if(this.task()!.scheduled_date < new Date()) return 'due-date-past';

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

        const noti: Notification = {
          notificationType: 'Dissaprove task',
          message: `Task: ${this.taskName!} has been disapproved`,
          recipientType: 'trustee',
          recipientUuid: this.trusteeId!,
          isRead: false
        }
        this.notificationService.createNotifications(noti).subscribe({
          next: () => {
            this.messageSerive.add({
              severity: 'sucess',
              summary: 'Success',
              detail: 'Task succesfully disapproved'
            });
    
            setTimeout(() => {
              this.router.navigate(['voting']).then(() => {
                window.location.reload();
              })
            }, 2500);
          }
        })
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
