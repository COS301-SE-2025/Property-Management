import { Component, inject, OnInit } from '@angular/core';
import { ContractorCardComponent } from "../contractor-card/contractor-card.component";
import { BodyCoporateService, getCookieValue } from 'shared';
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-contractors',
  imports: [ContractorCardComponent, ProgressSpinnerModule, CommonModule],
  templateUrl: './public-contractors.component.html',
  styles: ``
})
export class PublicContractorsComponent implements OnInit {
  private bodyCoporateService = inject(BodyCoporateService);
  publicContractors = this.bodyCoporateService.contractorDetails;
  loading = true;

  async ngOnInit() {
    this.loading = true;
    const bcId = getCookieValue(document.cookie, 'bodyCoporateId');
    this.bodyCoporateService.loadPublicContractors(bcId);   

    const start = Date.now();
    while(this.bodyCoporateService.contractorDetails().length === 0 && Date.now() - start < 3000)
    {
      await new Promise(res => setTimeout(res, 100));
    }

    await new Promise(res => setTimeout(res, 3000)); 
    this.loading = false;
  }
}
