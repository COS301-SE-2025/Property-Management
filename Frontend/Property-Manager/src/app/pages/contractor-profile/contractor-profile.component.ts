import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one.component';
import { StepTwoComponent } from './step-two.component';
import { StepThreeComponent } from './step-three.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ContractorService } from '../../services/contractor.service';
import { ContractorDetails } from '../../models/contractorDetails.model';
import { getCookieValue } from '../../../utils/cookie-utils';



@Component({
  selector: 'app-contractor-profile',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent, HeaderComponent],
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.scss']
})


export class ContractorProfileComponent implements OnInit {

  contractor: ContractorDetails = {
    uuid: '',
    name: '',
    contact_info: '',
    status: true,
    apikey: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    reg_number: '',
    description: '',
    services: ''
  };

  constructor(private contractorService: ContractorService) {}

  step = 1;

  submitProfile() {
  const contractorId = getCookieValue(document.cookie, 'contractorId');
  console.log(this.contractor);
  console.log(contractorId);

  this.contractorService.updateContractor(contractorId, this.contractor).subscribe({
    next: () => {
      alert('Contractor created!');
      localStorage.setItem('contractorProfileComplete', 'true'); 
    },
    error: (err) => alert('Error: ' + err.message)
  });
}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
}

public isDarkMode = false;

ngOnInit() {
  this.isDarkMode = document.documentElement.classList.contains('dark-theme');
}
}