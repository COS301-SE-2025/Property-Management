import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonText, IonSpinner } from '@ionic/angular/standalone';
import { ContractorService, ContractorDetails, ImageApiService, StorageService } from 'shared';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-contractor-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent, IonItem, IonInput, IonText, IonSpinner, TabComponent,
  ],
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.scss']
})
export class ContractorProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  form: FormGroup;
  imagePreviewUrl: string | null = null;
  imageError = false;
  isSubmitting = false;
  submissionError: string | null = null;
  contractorId: string | null = null;

  certFiles: File[] = [];
  licenseFiles: File[] = [];
  idFiles: File[] = [];
  projectRecordFiles: File[] = [];
  projectImageFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private contractorService: ContractorService,
    private imageService: ImageApiService,
    private storageService: StorageService, 
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: [''],
      suburb: [''],
      postalCode: [''],
      status: [true],
      reg_number: ['', Validators.required],
      description: ['', Validators.required],
      services: ['', Validators.required],
      project_history: [''],
      img: [null]
    });
  }

  async ngOnInit() {
    try {
      this.contractorId = await this.storageService.get('contractorId');
      console.log('Contractor ID from storage:', this.contractorId);
      
      if (this.contractorId) {
        this.contractorService.getContractorById(this.contractorId).subscribe({
          next: (contractor: ContractorDetails) => {
            console.log('Successfully loaded contractor:', contractor);
            this.form.patchValue(contractor);
            if (contractor.img) {
              this.loadImage(contractor.img);
            }
          },
          error: (err) => {
            console.error('Error fetching contractor data:', err);
            this.submissionError = 'Failed to load contractor data. Please try logging in again.';
          }
        });
      } else {
        console.error('No contractor ID found in storage');
        this.submissionError = 'Please log in to continue.';
      }
    } catch (error) {
      console.error('Error getting contractor ID from storage:', error);
      this.submissionError = 'Failed to access user data. Please try logging in again.';
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    
    if (!file) return;

    // Validation
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

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviewUrl = e.target?.result as string;
      this.imageError = false;
    };
    reader.readAsDataURL(file);

    // Upload using new API
    try {
      console.log('Uploading profile image for contractor:', this.contractorId);
      
      const imageIds = await this.imageService.uploadImages(
        [file],                 // Wrap single file in array
        this.contractorId || undefined,  // user_uuid (contractor UUID)
        undefined,              // task_uuid
        undefined,              // progress_uuid
        undefined               // building_uuid
      );
      
      if (imageIds && imageIds.length > 0) {
        const imageId = imageIds[0];
        console.log('Profile image uploaded successfully:', imageId);
        this.form.patchValue({ img: imageId });
        this.loadImage(imageId);
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      this.imageError = true;
      alert('Error uploading image. Please try again.');
      this.imagePreviewUrl = null;
      this.fileInput.nativeElement.value = '';
    }
  }

  loadImage(imageId: string) {
    this.imageService.getImage(imageId).subscribe({
      next: (imageUrl) => {
        this.imagePreviewUrl = imageUrl;
        this.imageError = false;
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
    this.form.patchValue({ img: '' });
    this.imageError = false;
  }

  onCertUpload(event: Event) {
    this.certFiles = Array.from((event.target as HTMLInputElement).files ?? []);
  }
  
  onLicenseUpload(event: Event) {
    this.licenseFiles = Array.from((event.target as HTMLInputElement).files ?? []);
  }
  
  onIdUpload(event: Event) {
    this.idFiles = Array.from((event.target as HTMLInputElement).files ?? []);
  }
  
  onProjectRecordsUpload(event: Event) {
    this.projectRecordFiles = Array.from((event.target as HTMLInputElement).files ?? []);
  }
  
  onProjectImagesUpload(event: Event) {
    this.projectImageFiles = Array.from((event.target as HTMLInputElement).files ?? []);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.submissionError = 'Please fill all required fields.';
      return;
    }
    
    this.isSubmitting = true;
    this.submissionError = null;

    try {
      const contractorId = await this.storageService.get('contractorId');
      
      if (!contractorId) {
        this.submissionError = 'Contractor ID not found. Please log in again.';
        this.isSubmitting = false;
        return;
      }

      const payload = { ...this.form.value };

      // Upload certifications (multiple files at once)
      if (this.certFiles.length > 0) {
        try {
          console.log(`Uploading ${this.certFiles.length} certification files...`);
          const certIds = await this.imageService.uploadImages(
            this.certFiles,
            contractorId,
            undefined,
            undefined,
            undefined
          );
          payload.certifications = certIds;
          console.log(`✓ Uploaded ${certIds.length} certifications`);
        } catch (uploadError) {
          console.error('Error uploading certifications:', uploadError);
          this.submissionError = 'Failed to upload certification files.';
          this.isSubmitting = false;
          return;
        }
      }

      // Upload licenses (multiple files at once)
      if (this.licenseFiles.length > 0) {
        try {
          console.log(`Uploading ${this.licenseFiles.length} license files...`);
          const licenseIds = await this.imageService.uploadImages(
            this.licenseFiles,
            contractorId,
            undefined,
            undefined,
            undefined
          );
          payload.licenses = licenseIds;
          console.log(`✓ Uploaded ${licenseIds.length} licenses`);
        } catch (uploadError) {
          console.error('Error uploading licenses:', uploadError);
          this.submissionError = 'Failed to upload license files.';
          this.isSubmitting = false;
          return;
        }
      }

      // Upload IDs (multiple files at once)
      if (this.idFiles.length > 0) {
        try {
          console.log(`Uploading ${this.idFiles.length} ID files...`);
          const idIds = await this.imageService.uploadImages(
            this.idFiles,
            contractorId,
            undefined,
            undefined,
            undefined
          );
          payload.ids = idIds;
          console.log(`✓ Uploaded ${idIds.length} IDs`);
        } catch (uploadError) {
          console.error('Error uploading IDs:', uploadError);
          this.submissionError = 'Failed to upload ID files.';
          this.isSubmitting = false;
          return;
        }
      }

      // Upload project records (multiple files at once)
      if (this.projectRecordFiles.length > 0) {
        try {
          console.log(`Uploading ${this.projectRecordFiles.length} project record files...`);
          const recordIds = await this.imageService.uploadImages(
            this.projectRecordFiles,
            contractorId,
            undefined,
            undefined,
            undefined
          );
          payload.projectRecords = recordIds;
          console.log(`✓ Uploaded ${recordIds.length} project records`);
        } catch (uploadError) {
          console.error('Error uploading project records:', uploadError);
          this.submissionError = 'Failed to upload project record files.';
          this.isSubmitting = false;
          return;
        }
      }

      // Upload project images (multiple files at once)
      if (this.projectImageFiles.length > 0) {
        try {
          console.log(`Uploading ${this.projectImageFiles.length} project image files...`);
          const projectImageIds = await this.imageService.uploadImages(
            this.projectImageFiles,
            contractorId,
            undefined,
            undefined,
            undefined
          );
          payload.projectImages = projectImageIds;
          console.log(`✓ Uploaded ${projectImageIds.length} project images`);
        } catch (uploadError) {
          console.error('Error uploading project images:', uploadError);
          this.submissionError = 'Failed to upload project image files.';
          this.isSubmitting = false;
          return;
        }
      }

      console.log('Updating contractor with payload:', payload);
      console.log('Contractor ID:', contractorId);

      await firstValueFrom(this.contractorService.updateContractor(contractorId, payload));
      
      localStorage.setItem('contractorProfileComplete', 'true');
      this.router.navigate(['/contractor-home']);
      
    } catch (err: any) {
      console.error('Full error object:', err);

      if (err.status === 0) {
        this.submissionError = 'Unable to connect to server. Please check your internet connection.';
      } else if (err.status === 404) {
        this.submissionError = 'Contractor not found. Please try logging in again.';
      } else if (err.status === 400) {
        this.submissionError = 'Invalid data provided. Please check all fields.';
      } else if (err.status >= 500) {
        this.submissionError = 'Server error. Please try again later.';
      } else {
        this.submissionError = `Failed to update contractor profile. Error: ${err.message || 'Unknown error'}`;
      }
    } finally {
      this.isSubmitting = false;
    }
  }
}