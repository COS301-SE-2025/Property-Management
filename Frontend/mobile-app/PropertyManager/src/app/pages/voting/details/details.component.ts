import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { ContractorApiService, Notification, MaintenanceTask, StorageService, VotingService, FormatDatePipe, AssignedContractor, Inventory, InventoryUsage, ImageApiService, TaskApiService, NotificationsApiService } from 'shared';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { QuoteComponent } from '../quote/quote.component';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { InventoryUsageComponent } from 'src/app/components/inventory-usage/inventory-usage.component';

@Component({
  selector: 'app-details',
  imports: [IonContent, HeaderComponent, TabComponent, IonCard, CommonModule, FormatDatePipe, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, TableModule, ToggleButtonModule, QuoteComponent, FormsModule, InventoryUsageComponent],
  templateUrl: './details.component.html',
  styles: `
    .due-date-normal {
      @apply text-inherit dark:text-white;
    }
    .due-date-urgent {
      @apply text-[#ff3838] dark:text-[#ff3838] font-[200];
    }
    .p-togglebutton {
      background-color: #facc15; 
    }
  `,
})
export class DetailsComponent  implements OnInit {

  public task = signal<MaintenanceTask | undefined>(undefined);
  public taskId: string | null = null;
  private taskName: string | null = null;

  public contractors = signal<AssignedContractor[] | undefined>(undefined);
  public inventoryUsage: InventoryUsage[] | undefined = undefined;
  public inventoryItem: Inventory[] | undefined = undefined;
  public detailError = false;

  public selectedContractorId = signal<string | null>(null);
  public voteSubmitted = signal<boolean>(false); 
  public contractorQuotes = signal<Record<string, string>>({});
  public selectedQuoteId = signal<string | null>(null);
  

  constructor(
    private votingService: VotingService, 
    private contractorService: ContractorApiService,
    private storage: StorageService,
    private router: Router,
    private taskService: TaskApiService,
    private imageService: ImageApiService,
    private toastController: ToastController,
    private notificationService: NotificationsApiService
  ) {
    effect(async () => {
      this.detailError = false;
      const tasks = this.votingService.votingTasks();
  
      if(this.taskId && tasks.length > 0)
      {
        //console.log("getting task", this.taskId);
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
    const sessionId = await this.storage.get('sessionId');
    if(sessionId)
    {
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (res) => {

          this.taskName = res.title;

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
  }
  private addToContractors(contractor: AssignedContractor)
  {
    const curr = this.contractors() || [];
    this.contractors.set([...curr, contractor]);
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
  async submitVote()
  {
    const contractorId = this.selectedContractorId();

    if(!contractorId || !this.taskId || this.voteSubmitted()){
      return;
    }

    const quoteId = this.contractorQuotes()[contractorId];

    if(!quoteId)
    {
      await this.presentToast('Please review quote before voting', 'warning');
      return;
    }

    //api call and message
    const sessionId = await this.storage.get('sessionId');

    let userId = await this.storage.get('trusteeId');

    if(sessionId)
    {
      this.votingService.castVote(sessionId, quoteId, userId, true).subscribe({
        next: async () => {
          this.voteSubmitted.set(true);

          const noti: Notification = {
              notificationType: 'Vote submitted',
              message: `Vote has been cast for task: ${this.taskName!}`,
              recipientType: 'trustee',
              recipientUuid: userId,
              isRead: false,
              relatedSessionUuid: sessionId
          }
          this.notificationService.createNotifications(noti).subscribe({
            next: async () => {
              await this.presentToast('Successfully submitted vote', 'success')
    
              setTimeout(() => {
                this.router.navigate(['/voting']);
              }, 1000);
            },
            error: async (err) => {
              console.error(err);
              this.voteSubmitted.set(false);

              await this.presentToast(this.votingService.handleVotingError(err), 'danger');
            }
          })

        },
        error: async (err) => {
          console.error(err);
          this.voteSubmitted.set(false);

          await this.presentToast(this.votingService.handleVotingError(err), 'danger');
        }
      });
    }
  }
  private async presentToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,      
      position: 'top'
    });
    await toast.present();
  }
}

