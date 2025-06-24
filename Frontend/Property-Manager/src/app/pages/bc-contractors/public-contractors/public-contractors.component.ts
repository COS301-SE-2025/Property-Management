import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { DrawerComponent } from "../../../components/drawer/drawer.component";
import { ContractorCardComponent } from "../contractor-card/contractor-card.component";
import { BodyCoporateService } from '../../../services/body-coporate.service';

@Component({
  selector: 'app-public-contractors',
  imports: [HeaderComponent, DrawerComponent, ContractorCardComponent],
  templateUrl: './public-contractors.component.html',
  styles: ``
})
export class PublicContractorsComponent {

  private bodyCoporateService = inject(BodyCoporateService);
  publicContractors = this.bodyCoporateService.contractorDetails();
}
