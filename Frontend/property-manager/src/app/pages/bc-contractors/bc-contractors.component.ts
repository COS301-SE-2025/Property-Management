import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { BodyCoporateService, getCookieValue } from 'shared';
import { ContractorCardComponent } from './contractor-card/contractor-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bc-contractors',
  imports: [HeaderComponent, ContractorCardComponent],
  templateUrl: './bc-contractors.component.html',
  styles: ``
})
export class BcContractorsComponent implements OnInit {

  private bodyCoporateService = inject(BodyCoporateService);
  contractors = this.bodyCoporateService.contractorDetails;

  constructor(private router: Router) {}

  ngOnInit(){
    const bcId = getCookieValue(document.cookie, 'bodyCoporateId');
    this.bodyCoporateService.loadTrustedContractors(bcId);
  }

  AddNewContractor()
  {
    this.router.navigate(['bodyCoporate/publicContractors'])
  }
}
