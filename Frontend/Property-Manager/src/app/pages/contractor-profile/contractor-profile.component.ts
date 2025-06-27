import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one.component';
import { StepTwoComponent } from './step-two.component';
import { StepThreeComponent } from './step-three.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Contractor } from '../../models/contractor.model';
import { ContractorService } from '../../services/contractor.service';



@Component({
  selector: 'app-contractor-profile',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent, HeaderComponent],
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.scss']
})


export class ContractorProfileComponent implements OnInit {

  contractor: Contractor = {
    name: '',
    contact_info: '',
    status: false,
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
    this.contractorService.addContractor(this.contractor).subscribe({
      next: (res) => alert('Contractor created!'),
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