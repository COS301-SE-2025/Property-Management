import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one.component';
import { StepTwoComponent } from './step-two.component';
import { StepThreeComponent } from './step-three.component';
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
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent, ToastModule],
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
    specializations: []
  };

  constructor(
    private contractorService: ContractorService,
    private imageService: ImageApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  step = 1;

  ngOnInit() {
    this.isDarkMode = document.documentElement.classList.contains('dark-theme');
    const contractorId = getCookieValue(document.cookie, 'contractorId');
    if (contractorId) {
      this.contractorService.getContractorById(contractorId).subscribe({
        next: (contractor) => {
          //console.log(contractor);
          this.contractor = contractor;
          
          // Load image if available
          if (this.contractor.img) {
            this.loadImage(this.contractor.img);
          } else {
            // Try loading by contractor UUID if no img field
            this.loadImageByContractorUuid(contractorId);
          }
        },
        error: (err) => {
          console.error('Error fetching contractor data:', err);
        }
      });
    }
  }

  /**
   * Load image by contractor UUID (fallback method)
   */
  loadImageByContractorUuid(contractorId: string) {
    this.imageService.getImage(undefined, undefined, contractorId).subscribe({
      next: (imageUrl) => {
        this.imagePreviewUrl = imageUrl;
        this.imageError = false;
      },
      error: (err) => {
        // If no image found, it's okay - user might not have uploaded one yet
        //console.log('No image found for contractor, this is expected for new profiles');
        this.imageError = false;
        this.imagePreviewUrl = null;
      }
    });
  }

  /**
   * Load image by direct image ID
   */
  loadImage(imageId: string) {
    this.imageService.getImage(imageId).subscribe({
      next: (imageUrl) => {
        this.imagePreviewUrl = imageUrl;
        this.imageError = false;
        
        // Set up error handler to detect expired pre-signed URLs
        const img = new Image();
        img.src = imageUrl;
        img.onerror = () => {
          console.error('Pre-signed URL expired or invalid for image:', imageId);
          this.imageError = true;
          
          // Retry fetching the image to get a fresh pre-signed URL
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

  submitProfile() {
    const contractorId = getCookieValue(document.cookie, 'contractorId');

    this.contractorService.updateContractor(contractorId, this.contractor).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Profile Complete',
          detail: 'Your profile is now complete!',
          life: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/contractorHome']);
        }, 1500);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Profile',
          detail: 'Error occurred during profile creation, Please try again',
          life: 3000
        });
        console.error(err);
      }
    });
  }

  onFileSelected(event: Event, isStepThree: boolean = false) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      // Validate file size
      if (file.size > 3 * 1024 * 1024) {
        this.imageError = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'File size exceeds 3MB limit. Please select a smaller file.',
          life: 3000
        });
        if (!isStepThree) {
          this.fileInput.nativeElement.value = '';
        }
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please upload an image file',
          life: 3000
        });
        this.imageError = true;
        if (!isStepThree) {
          this.fileInput.nativeElement.value = '';
        }
        return;
      }

      // Show preview for non-step-three uploads
      if (!isStepThree) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviewUrl = e.target?.result as string;
          this.imageError = false;
        };
        reader.readAsDataURL(file);
      }

      // Upload to server
      this.imageService.uploadImages([file], this.contractor.uuid, "", "", "")
        .then((response: any) => {
          //console.log("File successfully uploaded:", response);
          
          // Extract image ID from response
          const uploadedImageId = Array.isArray(response) ? response[0] : response.imageId;
          
          // Update contractor img field
          this.contractor.img = uploadedImageId;
          
          // Load the newly uploaded image
          this.loadImage(uploadedImageId);
          
          if (isStepThree) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Images uploaded',
              life: 3000
            });
          }
        })
        .catch((err) => {
          console.error('Error uploading image:', err);
          this.imageError = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: isStepThree ? 'Failed to upload image, try again' : 'Error uploading image. Please try again.',
            life: 3000
          });
          this.imagePreviewUrl = null;
          if (!isStepThree) {
            this.fileInput.nativeElement.value = '';
          }
        });
    }
  }

  resetImage() {
    this.imagePreviewUrl = null;
    this.fileInput.nativeElement.value = '';
    this.contractor.img = '';
    this.imageError = false;
  }

  onStepOneComplete(data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    suburb: string;
    postalCode: string;
    specializations: string[];
    status: boolean;
  }) {
    this.contractor.name = data.name;
    this.contractor.email = data.email;
    this.contractor.phone = data.phone;
    const addressParts = [data.address, data.suburb, data.postalCode].filter(part => part).join(', ');
    this.contractor.address = addressParts || '';
    this.contractor.city = data.city;
    this.contractor.status = data.status;
    this.contractor.specializations = data.specializations;
    this.step = 2;
    this.messageService.add({
      severity: 'success',
      summary: 'Step 1 Complete',
      detail: 'Your details have been saved.',
      life: 3000
    });
  }

  onStepTwoComplete(data: { reg_number: string; descriptionSkills: string; services: string }) {
    this.contractor.reg_number = data.reg_number;
    this.contractor.description = data.descriptionSkills;
    this.contractor.services = data.services;
    this.step = 3;
    this.messageService.add({
      severity: 'success',
      summary: 'Step 2 Complete',
      detail: 'Registration details saved.',
      life: 3000
    });
  }

  onStepThreeComplete(data: { description: string }) {
    this.contractor.project_history = data.description;
    this.submitProfile();
  }

  onStepThreeImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      const files: FileList = input.files;
      // Handle step three images if needed
    }
  }
}