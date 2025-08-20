import { Component, Input, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { lastValueFrom } from 'rxjs';
import { ContractorApiService, Notification, NotificationsApiService, Quote, TaskApiService, VotingResults, VotingService } from 'shared';
import { Toast } from "primeng/toast";


interface Results{
  quoteUuid: string | null;
  votesFor: number;
  contractorName: string;
  contractorId: string | null;
}
@Component({
  selector: 'app-voting-results',
  imports: [CardModule, TableModule, Toast],
  templateUrl: './voting-results.component.html',
  styles: ``,
  providers: [MessageService]
})
export class VotingResultsComponent  implements OnInit, OnChanges {

  public sessionId = input.required<string>();
  @Input() assignedContractors : Record<string, string> = {};

  public results = signal<Results[]>([]);
  public error = signal<string | null>(null);
  public votingEnded = false;
  public contractorHasBeenAssigned = false;
  private taskId: string | null = null;
  private quoteId: string | null = null;

  constructor(
    private votingService: VotingService, 
    private contractorService: ContractorApiService, 
    private taskService: TaskApiService, 
    private messageService: MessageService,
    private notificationService: NotificationsApiService
  ) { }

  ngOnInit() {
    this.loadResults();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes['assignedContractors'] && !changes['assignedContractors'].firstChange)
    {
      this.loadResults();
    }
  }
  loadResults()
  {
    this.error.set(null);
    this.votingEnded = false;
    this.contractorHasBeenAssigned = false;

    this.votingService.getAllVotes(this.sessionId()).subscribe({
      next: (res) => {
        this.quoteId = res.winningQuoteUuid;
        this.votingService.getTaskIdFromSessionId(this.sessionId()).subscribe({
          next: (task) => {
            if(task.taskUuid)
            {
              this.taskId = task.taskUuid;

              this.taskService.getTaskById(task.taskUuid).subscribe({
                next: (t) => {
                  if(t.scheduled_date < new Date() && (t.cuuid === '' || !t.cuuid))
                  {
                    this.votingEnded = true;
                  }
                  else if(t.approvalStatus === "APPROVED" && t.cuuid && t.cuuid !== '')
                  {
                    this.contractorHasBeenAssigned = true;
                  }
                }
              });
            }
          }
        })
        this.processResults(res.results).then(proccessed => {
          this.results.set(proccessed);
        });
      },
      error: (err) => {
        console.error('Error loading voting results', err);
        this.error.set('Failed to load voting results')
      }
    });
  }
  private async processResults(voteResults: VotingResults['results']): Promise<Results[]>
  {
    const results: Results[] = [];

    for(const res of voteResults)
    {
      const contractorId = Object.keys(this.assignedContractors).find(
        key => this.assignedContractors[key] === res.quoteUuid
      );

      if(contractorId)
      {
        try{
          const contractor = await lastValueFrom(this.contractorService.getContractorById(contractorId));
           results.push({
              quoteUuid: res.quoteUuid,
              votesFor: res.votesFor,
              contractorName: contractor.name,
              contractorId
          });
        }
        catch(err)
        {
          console.error("Error fetching contractor", err);
        }
      }
    }
    return results;
  }
  async endVoting()
  {
    let winningContractorId = '' 
    let max = 0;
    this.results().forEach(r => {
      if(r.votesFor > max)
      {
        max = r.votesFor;
        winningContractorId = r.contractorId ?? ''; 
        this.quoteId = r.quoteUuid;
      }
    });

    this.votingService.getTaskIdFromSessionId(this.sessionId()).subscribe({
      next: (res) => 
      {
        if(res.taskUuid)
        {
          this.taskService.updateTaskAssignedContractor(winningContractorId, res.taskUuid).subscribe({
            next: (res) => {
              this.votingService.updateQuoteStatus(this.quoteId!, "APPROVED").subscribe({
                next: () => {

                  const notiTrustee: Notification = {
                    notificationType: 'Vote ended',
                    message: `Voting has ended for ${res.title}`,
                    recipientType: 'trustee',
                    recipientUuid: `${res.trusteeUuid}`,
                    isRead: false,
                    relatedSessionUuid: this.sessionId()
                  }
                  const notiContractor: Notification = {
                    notificationType: 'Vote ended',
                    message: `You have been assigned task: ${res.title}`,
                    recipientType: 'contractor',
                    recipientUuid: winningContractorId,
                    isRead: false,
                    relatedTaskUuid: res.taskUuid
                  }
                  this.notificationService.createNotifications(notiTrustee);
                  this.notificationService.createNotifications(notiContractor);
    
                  setTimeout(() => {
                    window.location.reload()
                  }, 1500);
                },
                error: (err) => {
                    console.error(err);
                    this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error assigning contractor to task'
                  })
                }
              });

            },
            error: (err) => {
              console.error(err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error assigning contractor to task'
              })
            }
          });
        }
      },
      error: (err) => {
        console.error("Error assigning contractor", err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Error assigning contractor to task"
        })
      }
    })
  }
}
