import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one.component';
import { StepTwoComponent } from './step-two.component';
import { StepThreeComponent } from './step-three.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ContractorService } from '../../services/contractor.service';
import { ContractorDetails } from '../../models/contractorDetails.model';
import { getCookieValue } from '../../../utils/cookie-utils';
import { ImageApiService } from '../../services/api/Image api/image-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractor-profile',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent, HeaderComponent],
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.scss']
})


export class ContractorProfileComponent implements OnInit {
  public isDarkMode = false;

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
    services: '',
    project_history: '',
    img: '',
  };

  constructor(private contractorService: ContractorService, private imageService: ImageApiService, private router: Router) {}

  step = 1;

   ngOnInit() {
    this.isDarkMode = document.documentElement.classList.contains('dark-theme');
  }

  submitProfile() {
    const contractorId = getCookieValue(document.cookie, 'contractorId');
    console.log(this.contractor);
    console.log(contractorId);

    this.contractorService.updateContractor(contractorId, this.contractor).subscribe({
      next: () => {
        alert('Contractor created!');
        localStorage.setItem('contractorProfileComplete', 'true'); 

        this.router.navigate(['/contractor-dashboard']);
      },
      error: (err) => alert('Error: ' + err.message)
    });
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      
      //Upload to server
      this.imageService.uploadImage(file).subscribe({
        next: (response) => {
          console.log("File successfully uploaded:", response);
          this.contractor.img = response.imageId;
        }
      })
    }
  }

  onStepOneComplete(data: {name: string, email: string, phone: string, address: string, city: string, suburb: string, postalCode: string, status: boolean}){
    this.contractor.name = data.name;
    this.contractor.email = data.email;
    this.contractor.phone = data.phone;
    this.contractor.address = data.address.concat(', ', data.suburb, ', ', data.postalCode);
    this.contractor.city = data.city;
    this.contractor.status = data.status;
    this.step = 2;
  }

  onStepTwoComplete(data: {reg_number: string, description: string, services: string})
  {
    this.contractor.reg_number = data.reg_number;
    this.contractor.description = data.description;
    this.contractor.services = data.services;
    this.step = 3;
  }

  onStepThreeComplete(data: {description: string}) {
    this.contractor.project_history = data.description;
    this.submitProfile();
  }
}