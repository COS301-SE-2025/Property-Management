import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { BodyCoporateService } from '../../services/body-coporate.service';
import { ContractorCardComponent } from './contractor-card/contractor-card.component';

@Component({
  selector: 'app-bc-contractors',
  imports: [HeaderComponent, DrawerComponent, ContractorCardComponent],
  templateUrl: './bc-contractors.component.html',
  styles: ``
})
export class BcContractorsComponent {

  private bodyCoporateService = inject(BodyCoporateService);
  contractors = this.bodyCoporateService.contractorDetails();

  AddNewContractor()
  {
    //TODO: Add new contractor
  }
}
