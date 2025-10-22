import { Component, inject, OnInit } from '@angular/core';
import { BodyCoporateService, getCookieValue } from 'shared';
import { ContractorCardComponent } from './contractor-card/contractor-card.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from "primeng/progressspinner";

@Component({
  selector: 'app-bc-contractors',
  imports: [ContractorCardComponent, ProgressSpinnerModule, CommonModule],
  templateUrl: './bc-contractors.component.html',
  styles: ``
})
export class BcContractorsComponent implements OnInit {

  private bodyCoporateService = inject(BodyCoporateService);
  contractors = this.bodyCoporateService.contractorDetails;
  loading = true;

  constructor(private router: Router) {}

  async ngOnInit(){
    this.loading = true;
    const bcId = getCookieValue(document.cookie, 'bodyCoporateId');
    this.bodyCoporateService.loadTrustedContractors(bcId);

    const start = Date.now();
    while(this.bodyCoporateService.contractorDetails().length === 0 && Date.now() - start < 2000)
    {
      await new Promise(res => setTimeout(res, 100));
    }

    await new Promise(res => setTimeout(res, 2000)); 
    this.loading = false
  }

  AddNewContractor()
  {
    this.router.navigate(['bodyCoporate/publicContractors'])
  }
}
