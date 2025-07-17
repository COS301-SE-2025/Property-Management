import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { BodyCoporateService } from 'shared';
import { ContractorDetails } from 'shared';

@Component({
  selector: 'app-contractor-card',
  imports: [CardModule],
  templateUrl: './contractor-card.component.html',
  styles: ``
})
export class ContractorCardComponent {
  
  constructor(private router: Router){}
  bodyCoporateService = inject(BodyCoporateService);

  contractor = input.required<ContractorDetails>();

  viewContractorDetails(contractorId: string)
  {
    const currentPath = this.router.url;
    const source = currentPath.includes('publicContractors') ? 'public' : 'trusted';

    this.router.navigate(['contractorDetails', contractorId, source])
  }
}
