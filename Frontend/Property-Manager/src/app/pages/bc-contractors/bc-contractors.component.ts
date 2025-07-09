import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { BodyCoporateService } from '../../services/body-coporate.service';
import { ContractorCardComponent } from './contractor-card/contractor-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bc-contractors',
  imports: [HeaderComponent, DrawerComponent, ContractorCardComponent],
  templateUrl: './bc-contractors.component.html',
  styles: ``
})
export class BcContractorsComponent implements OnInit {

  private bodyCoporateService = inject(BodyCoporateService);
  contractors = this.bodyCoporateService.contractorDetails;

  constructor(private router: Router) {}

  ngOnInit(){
    this.bodyCoporateService.loadTrustedContractors();
  }

  AddNewContractor()
  {
    this.router.navigate(['bodyCoporate/publicContractors'])
  }
}
