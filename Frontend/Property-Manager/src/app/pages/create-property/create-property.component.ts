import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { PropertyService } from '../../services/property.service'; 
import { ContractorService } from '../../services/contractor.service';
import { Contractor } from '../../models/contractor.model';
import { TrusteeResponse } from '../../models/trusteeresponse.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, InputTextModule, FloatLabelModule, DropdownModule],
  templateUrl: './create-property.component.html',
  styles: [],
})
export class CreatePropertyComponent implements OnInit {
  form: ReturnType<FormBuilder['group']>;
  selectedImageFile: File | null = null;

  trusteeId: number | null = null;
  trusteeUuid: string | null = null;
  coporateUuid: string | null = null;

  contractors: Contractor[] = [];
  public isDarkMode = false;
  isSubmitting = false;
  submissionError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private contractorService: ContractorService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(0)]],
      propertyValue: ['', [Validators.required, Validators.min(0)]],
      address: ['', Validators.required],
      suburb: [''],
      city: [''],
      province: [''],
      type: ['', Validators.required],
      primaryContractor: ['', Validators.required],
      bodyCorporate: [''],
      image: [null],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      this.selectedImageFile = file;
      this.form.patchValue({ image: file });
    }
  }

  ngOnInit(): void {
    this.isDarkMode = document.documentElement.classList.contains('dark-theme');
    this.getTrusteeInfo();
    this.loadContractors();
  }

  loadContractors(): void {
    this.contractorService.getAllContractors().subscribe({
      next: (data) => {
        this.contractors = data;
        console.log('Loaded contractors:', data);
      },
      error: (err) => {
        console.error('Failed to load contractors:', err);
      }
    });
  }

  getTrusteeInfo(): void {
    this.trusteeUuid = localStorage.getItem('trusteeID');

    if (!this.trusteeUuid) {
      console.error('Trustee Uuid not found in localStorage.');
      this.submissionError = 'Authentication error: Please log in again.';
      return;
    }

  }

  async onSubmit() {
    if (!this.form.valid) {
      console.log('Form is invalid:', this.form.errors);
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    if (!this.trusteeUuid) {
      this.submissionError = 'Unable to create property: Trustee information is missing. Please try refreshing the page.';
      console.error('Cannot create property without trusteeUuid');
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;

    try {
      console.log('Form values:', this.form.value);
      let propertyImageId: string | null = null;

      // Upload image if selected
      if (this.selectedImageFile) {
        try {
          const uploadResult = await this.propertyService.uploadImage(this.selectedImageFile).toPromise();
          propertyImageId = uploadResult?.imageKey || null;
          console.log('Image uploaded successfully:', propertyImageId);
        } catch (err) {
          console.error('Image upload failed:', err);
          this.submissionError = 'Failed to upload image. Please try again.';
          this.isSubmitting = false;
          return;
        }
      }

      const formValue = this.form.value;

      // Construct the full address string
      const fullAddress = [
        formValue.address,
        formValue.suburb,
        formValue.city,
        formValue.province
      ].filter(part => part && part.trim()).join(', ');

      // Build payload with proper types to match API
      const payload = {
        name: formValue.name,
        address: fullAddress,
        type: formValue.type,
        propertyValue: Number(formValue.propertyValue),
        primaryContractors: formValue.primaryContractor,
        latestInspectionDate: new Date().toISOString().split('T')[0],
        trusteeUuid: this.trusteeUuid, // Now guaranteed to be non-null
        propertyImageId: propertyImageId,
        coporateUuid: this.coporateUuid || null,
        area: Number(formValue.area) // Ensure area is a number
      };

      console.log('Payload to create property:', payload);

      this.propertyService.createProperty(payload).subscribe({
        next: (response) => {
          console.log('Property created successfully:', response);
          this.isSubmitting = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error creating property:', err);
          this.isSubmitting = false;
          this.submissionError = 'Failed to create property. Please try again.';
          
          // More specific error handling
          if (err.status === 400) {
            this.submissionError = 'Invalid data provided. Please check all fields.';
          } else if (err.status === 404) {
            this.submissionError = 'API endpoint not found. Please contact support.';
          } else if (err.status === 500) {
            this.submissionError = 'Server error. Please try again later.';
          }
        }
      });

    } catch (error) {
      console.error('Unexpected error during submission:', error);
      this.submissionError = 'An unexpected error occurred. Please try again.';
      this.isSubmitting = false;
    }
  }
}