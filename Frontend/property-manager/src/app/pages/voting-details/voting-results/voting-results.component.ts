import { Component, Input, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { lastValueFrom } from 'rxjs';
import { ContractorApiService, VotingResults, VotingService } from 'shared';


interface Results{
  quoteUuid: string | null;
  votesFor: number;
  contractorName: string;
  contractorId: string | null;
}
@Component({
  selector: 'app-voting-results',
  imports: [CardModule, TableModule],
  templateUrl: './voting-results.component.html',
  styles: ``,
})
export class VotingResultsComponent  implements OnInit, OnChanges {

  public sessionId = input.required<string>();
  @Input() assignedContractors : Record<string, string> = {};

  public results = signal<Results[]>([]);
  public error = signal<string | null>(null);

  constructor(private votingService: VotingService, private contractorService: ContractorApiService) { }

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

    this.votingService.getAllVotes(this.sessionId()).subscribe({
      next: (res) => {
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

}
