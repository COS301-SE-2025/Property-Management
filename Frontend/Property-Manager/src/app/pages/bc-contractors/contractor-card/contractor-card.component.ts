import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { BodyCoporateService } from '../../../services/body-coporate.service';
import { ContractorDetails } from '../../../models/contractorDetails.model';

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

  viewContractorDetails(contractorId: number)
  {
    const currentPath = this.router.url;
    const source = currentPath.includes('publicContractors') ? 'public' : 'trusted';

    this.router.navigate(['contractorDetails', contractorId, source])
  }
}
