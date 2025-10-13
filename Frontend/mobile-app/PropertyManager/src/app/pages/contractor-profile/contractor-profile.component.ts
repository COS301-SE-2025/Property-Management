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
      const contractorId = await this.storageService.get('contractorId');
      console.log('Contractor ID from storage:', contractorId);
      
      if (contractorId) {
        this.contractorService.getContractorById(contractorId).subscribe({
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
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl = e.target?.result as string;
        this.imageError = false;
      };
      reader.readAsDataURL(file);

      this.imageService.uploadImage(file).subscribe({
        next: (response) => {
          this.form.patchValue({ img: response.imageId });
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

      const certIds: string[] = [];
      for (const file of this.certFiles) {
        try {
          const res = await firstValueFrom(this.imageService.uploadImage(file));
          certIds.push(res.imageId);
        } catch (uploadError) {
          console.error('Error uploading certification:', uploadError);
          this.submissionError = 'Failed to upload certification files.';
          this.isSubmitting = false;
          return;
        }
      }
      payload.certifications = certIds;

      const licenseIds: string[] = [];
      for (const file of this.licenseFiles) {
        try {
          const res = await firstValueFrom(this.imageService.uploadImage(file));
          licenseIds.push(res.imageId);
        } catch (uploadError) {
          console.error('Error uploading license:', uploadError);
          this.submissionError = 'Failed to upload license files.';
          this.isSubmitting = false;
          return;
        }
      }
      payload.licenses = licenseIds;

      const idIds: string[] = [];
      for (const file of this.idFiles) {
        try {
          const res = await firstValueFrom(this.imageService.uploadImage(file));
          idIds.push(res.imageId);
        } catch (uploadError) {
          console.error('Error uploading ID:', uploadError);
          this.submissionError = 'Failed to upload ID files.';
          this.isSubmitting = false;
          return;
        }
      }
      payload.ids = idIds;

      const recordIds: string[] = [];
      for (const file of this.projectRecordFiles) {
        try {
          const res = await firstValueFrom(this.imageService.uploadImage(file));
          recordIds.push(res.imageId);
        } catch (uploadError) {
          console.error('Error uploading project record:', uploadError);
          this.submissionError = 'Failed to upload project record files.';
          this.isSubmitting = false;
          return;
        }
      }
      payload.projectRecords = recordIds;

      const projectImageIds: string[] = [];
      for (const file of this.projectImageFiles) {
        try {
          const res = await firstValueFrom(this.imageService.uploadImage(file));
          projectImageIds.push(res.imageId);
        } catch (uploadError) {
          console.error('Error uploading project image:', uploadError);
          this.submissionError = 'Failed to upload project image files.';
          this.isSubmitting = false;
          return;
        }
      }
      payload.projectImages = projectImageIds;

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