import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { ContractorCardComponent } from "../contractor-card/contractor-card.component";
import { BodyCoporateService } from 'shared';

@Component({
  selector: 'app-public-contractors',
  imports: [HeaderComponent, ContractorCardComponent],
  templateUrl: './public-contractors.component.html',
  styles: ``
})
export class PublicContractorsComponent implements OnInit {
  private bodyCoporateService = inject(BodyCoporateService);
  publicContractors = this.bodyCoporateService.contractorDetails;

  ngOnInit(): void {
    this.bodyCoporateService.loadPublicContractors();   
  }
}
