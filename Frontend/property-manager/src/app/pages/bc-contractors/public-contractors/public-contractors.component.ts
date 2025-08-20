import { Component, inject, OnInit } from '@angular/core';
import { ContractorCardComponent } from "../contractor-card/contractor-card.component";
import { BodyCoporateService, getCookieValue } from 'shared';

@Component({
  selector: 'app-public-contractors',
  imports: [ContractorCardComponent],
  templateUrl: './public-contractors.component.html',
  styles: ``
})
export class PublicContractorsComponent implements OnInit {
  private bodyCoporateService = inject(BodyCoporateService);
  publicContractors = this.bodyCoporateService.contractorDetails;

  ngOnInit(): void {
    const bcId = getCookieValue(document.cookie, 'bodyCoporateId');
    this.bodyCoporateService.loadPublicContractors(bcId);   
  }
}
