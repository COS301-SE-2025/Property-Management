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
  imagePreview: string | null = null;

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

  ngOnInit(): void {
    this.isDarkMode = document.documentElement.classList.contains('dark-theme');
    this.getTrusteeInfo();
    this.loadContractors();
  }

  loadContractors(): void {
    this.contractorService.getAllContractors().subscribe({
      next: (data) => {
        console.log('Contractors loaded from backend:', data);
        this.contractors = data;
      },
      error: (err) => {
        console.error('Failed to load contractors:', err);
      }
    });
  }

  getTrusteeInfo(): void {
    this.trusteeUuid = localStorage.getItem('trusteeID');
    console.log('Loaded trusteeUuid:', this.trusteeUuid);
    if (!this.trusteeUuid) {
      this.submissionError = 'Authentication error: Please log in again.';
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      this.selectedImageFile = file;
      this.form.patchValue({ image: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    console.log('Form Valid:', this.form.valid);
    console.log('Raw Form Values:', this.form.value);

    if (this.form.invalid || !this.trusteeUuid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      if (!this.trusteeUuid) {
        this.submissionError = 'Unable to create property: Trustee information is missing. Please refresh.';
      }
      return;
    }

    const formValue = this.form.value;
    console.log('Selected Primary Contractor UUID:', formValue.primaryContractor);

    if (!formValue.primaryContractor) {
      this.submissionError = 'Please select a Primary Contractor.';
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;

    try {
      let propertyImageId: string | null = null;

      if (this.selectedImageFile) {
        try {
          const uploadResult = await this.propertyService.uploadImage(this.selectedImageFile).toPromise();
          propertyImageId = uploadResult?.imageKey || null;
          console.log('Image uploaded, imageKey:', propertyImageId);
        } catch (err) {
          console.error('Image upload failed:', err);
          this.submissionError = 'Failed to upload image. Please try again.';
          this.isSubmitting = false;
          return;
        }
      }

      const fullAddress = [
        formValue.address,
        formValue.suburb,
        formValue.city,
        formValue.province
      ].filter(part => part && part.trim()).join(', ');

      const payload = {
        name: formValue.name,
        address: fullAddress,
        type: formValue.type,
        propertyValue: Number(formValue.propertyValue),
        primaryContractor: formValue.primaryContractor,
        latestInspectionDate: new Date().toISOString().split('T')[0],
        trusteeUuid: this.trusteeUuid,
        propertyImageId: propertyImageId,
        coporateUuid: this.coporateUuid || null,
        area: Number(formValue.area)
      };

      console.log('Final Payload Sent to Backend:', payload);

      this.propertyService.createProperty(payload).subscribe({
        next: (response) => {
          console.log('Property created successfully:', response);
          this.isSubmitting = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Backend error response:', err);
          this.isSubmitting = false;
          if (err.status === 400) {
            this.submissionError = 'Invalid data provided.';
          } else if (err.status === 404) {
            this.submissionError = 'API not found.';
          } else if (err.status === 500) {
            this.submissionError = 'Server error. Try again later.';
          } else {
            this.submissionError = 'Failed to create property. Please try again.';
          }
        }
      });

    } catch (error) {
      console.error('Unexpected error:', error);
      this.submissionError = 'An unexpected error occurred. Please try again.';
      this.isSubmitting = false;
    }
  }
}
