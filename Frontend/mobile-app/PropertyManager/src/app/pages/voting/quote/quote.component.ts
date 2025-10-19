import { Component, EventEmitter, input, OnInit, Output, signal } from '@angular/core';
import { IonButton, IonModal, IonHeader, IonToolbar, IonButtons, IonContent } from '@ionic/angular/standalone';
import { Contractor, Quote, FormatDatePipe, TaskApiService, ContractorApiService, ApiService } from 'shared';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-quote',
  imports: [IonButton, IonModal, IonHeader, IonToolbar, IonButtons, IonContent, CommonModule, FormatDatePipe],
  templateUrl: './quote.component.html',
  styles: ``,
})
export class QuoteComponent extends ModalComponent implements OnInit {

  taskId = input.required<string>();
  contractorId = input.required<string>();
  
  public quoteError = false;
  public contractorDetails = signal<Contractor | undefined>(undefined);
  public contractorQuotes = signal<Record<string, string>>({});
  public quote = signal<Quote | undefined>(undefined);

  @Output() quoteSelected = new EventEmitter<string>();
  constructor(private taskService: TaskApiService, private contractorService: ContractorApiService, private apiService: ApiService) {
    super();
   }

  ngOnInit() {
    console.log(this.taskId());
    console.log(this.contractorId());
    if(this.taskId())
    {
      this.quoteError = false;
      //get quote details
      this.taskService.getQuoteFromTaskId(this.taskId()).subscribe({
        next: (res) => {
          res.forEach(q => {
            if(q.c_uuid === this.contractorId())
            {
              this.quote.set(q);

              //Get contractor details
              this.contractorService.getContractorById(this.contractorId()).subscribe({
                next: (res) => {
                  this.contractorDetails.set(res);
                },
                error: (err) => {
                  console.error("Couldnt find contractor", err);
                  this.quoteError = true;
                }
              })
            }
          })
        },
        error: () => {
          console.error("Couldnt find quote details");
          this.quoteError = true;
        }
      })
    }
    else
    {
      this.quoteError = true;
    }
  }
  override openModal() {
      super.openModal();
      if(this.quote())
      {
        this.quoteSelected.emit(this.quote()!.uuid)
      }
  }
  viewQuotePDF() {
    const quote = this.quote();
    if (!quote) return;

    this.apiService.getContractorPDF(this.contractorId(), "Quote", this.taskId()).subscribe({
      next: (presignedUrl: string) => {
        window.open(presignedUrl, '_blank');
      },
      error: (err) => {
        console.error('Error getting presigned URL:', err);
      }
    });
  }
}
