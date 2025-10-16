import { Component, EventEmitter, input, OnInit, Output, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { ApiService, getCookieValue } from 'shared'; 
import { Contractor, ContractorApiService, Quote, TaskApiService, FormatDatePipe } from 'shared';

@Component({
  selector: 'app-quote-details',
  imports: [DialogModule, CommonModule, FormatDatePipe],
  templateUrl: './quote-details.component.html',
  styles: ``,
})
export class QuoteDetailsComponent extends DialogComponent implements OnInit {

  taskId = input.required<string>();
  contractorId = input.required<string>();
  
  public quoteError = false;
  public contractorDetails = signal<Contractor | undefined>(undefined);
  public contractorQuotes = signal<Record<string, string>>({});
  public quote = signal<Quote | undefined>(undefined);

  @Output() quoteSelected = new EventEmitter<string>();

  constructor(private taskService: TaskApiService, private apiService: ApiService, private contractorService: ContractorApiService) { 
    super();
  }

  ngOnInit() {
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
        error: (res) => {
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
  override openDialog()
  {
    super.openDialog();
    if(this.quote())
    {
      this.quoteSelected.emit(this.quote()!.uuid);
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
