import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one.component';
import { StepTwoComponent } from './step-two.component';
import { StepThreeComponent } from './step-three.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ContractorService } from 'shared';
import { ContractorDetails } from 'shared';
import { getCookieValue } from 'shared';
import { ImageApiService } from 'shared';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contractor-profile',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent, HeaderComponent, ToastModule],
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.scss'],
  providers: [MessageService] 
})


export class ContractorProfileComponent implements OnInit {
  public isDarkMode = false;
  public imagePreviewUrl: string | null = null; 
  public imageError = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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

  constructor(private contractorService: ContractorService, private imageService: ImageApiService, private router: Router, private messageService: MessageService) {}

  step = 1;

   ngOnInit() {
    this.isDarkMode = document.documentElement.classList.contains('dark-theme');
    const contractorId = getCookieValue(document.cookie, 'contractorId');
    if (contractorId) {
      this.contractorService.getContractorById(contractorId).subscribe({
        next: (contractor) => {
          this.contractor = contractor;
          if (this.contractor.img) {
            this.imageService.getImage(this.contractor.img).subscribe({
              next: (imageUrl) => {
                this.imagePreviewUrl = imageUrl;
              },
              error: (err) => {
                console.error('Error loading image:', err);
                this.imageError = true;
              }
            });
          }
        },
        error: (err) => {
          console.error('Error fetching contractor data:', err);
        }
      });
    }
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
      if (file.size > 3 * 1024 * 1024) {
        this.imageError = true;
        alert('File size exceeds 3MB limit. Please select a smaller file.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        this.fileInput.nativeElement.value = '';
        this.imageError = true;
        return;
      }

      console.log("File selected:", file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl = e.target?.result as string;
        this.imageError = false; 
      }
      reader.readAsDataURL(file);
      //Upload to server
      this.imageService.uploadImage(file).subscribe({
        next: (response) => {
          console.log("File successfully uploaded:", response);
          this.contractor.img = response.imageId;
          this.loadImage(response.imageId);
        },
        error: (err) => {
          console.error('Error uploading image:', err);
          this.imageError = true;
          alert('Error uploading image. Please try again.');
          this.imagePreviewUrl = null;
          this.fileInput.nativeElement.value = ''; 
        }
      });
    }
  }

  loadImage(imageId: string) {
    this.imageService.getImage(imageId).subscribe({
      next: (imageUrl) => {
        this.imagePreviewUrl = imageUrl;
        this.imageError = false; 
        const img = new Image();
        img.src = imageUrl;
        img.onerror = () => {
          console.error('Pre-signed URL expired or invalid for image:', imageId);
          this.imageError = true;

          this.imageService.getImage(imageId).subscribe({
            next: (newUrl) => {
              this.imagePreviewUrl = newUrl;
              this.imageError = false;
            },
            error: (retryErr) => {
              console.error('Failed to reload image:', retryErr);
              this.imagePreviewUrl = null;
              this.imageError = true;
            }
          });
        };
      },
      error: (err) => {
        console.error('Error loading image:', err);
        this.imageError = true;
        this.imagePreviewUrl = null;
      }
    });
  }

  resetImage() {
    this.imagePreviewUrl = null;
    this.fileInput.nativeElement.value = ''; 
    this.contractor.img = '';
    this.imageError = false;
  }

  onStepOneComplete(data: {name: string, email: string, phone: string, address: string, city: string, suburb: string, postalCode: string, status: boolean}){
    this.contractor.name = data.name;
    this.contractor.email = data.email;
    this.contractor.phone = data.phone;
    this.contractor.address = data.address.concat(', ', data.suburb, ', ', data.postalCode);
    this.contractor.city = data.city;
    this.contractor.status = data.status;
    this.step = 2;

    this.messageService.add({
      severity: 'success',
      summary: 'Step 1 Complete',
      detail: 'Your details have been saved.'
    });
  }

  onStepTwoComplete(data: {reg_number: string, description: string, services: string})
  {
    this.contractor.reg_number = data.reg_number;
    this.contractor.description = data.description;
    this.contractor.services = data.services;
    this.step = 3;

    this.messageService.add({
      severity: 'success',
      summary: 'Step 2 Complete',
      detail: 'Registration details saved.'
    });
  }

  onStepThreeComplete(data: {description: string}) {
    this.contractor.project_history = data.description;
    this.submitProfile();
    
    this.messageService.add({
      severity: 'success',
      summary: 'Profile Complete',
      detail: 'Your profile is now complete!'
    });
    
  }
}