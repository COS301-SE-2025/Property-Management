import { Component } from '@angular/core';
import { ContractorService } from './contractor.service';
import { Contractor } from '../models/contractor.model';

@Component({
  selector: 'app-contractor-profile',
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.scss']
})
export class ContractorProfileComponent {
  step = 1;

  contractorData: Partial<Contractor> = {};

  constructor(private contractorService: ContractorService) {}

  onStepOneNext(data: Partial<Contractor>) {
    this.contractorData = { ...this.contractorData, ...data };
    this.step = 2;
  }

  onStepTwoNext(data: Partial<Contractor>) {
    this.contractorData = { ...this.contractorData, ...data };
    this.step = 3;
  }

  onStepThreeDone(data: Partial<Contractor>) {
    this.contractorData = { ...this.contractorData, ...data };
    this.submitProfile();
  }

  submitProfile() {
    this.contractorService.addContractor(this.contractorData as Contractor).subscribe({
      next: (response) => {
        console.log('Contractor profile created:', response);
      },
      error: (err) => {
        console.error('Error creating contractor profile:', err);
      }
    });
  }
}