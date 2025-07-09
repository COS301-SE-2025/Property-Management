import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { PropertyService, CreateBuildingPayload } from '../../services/property.service';
import { ContractorService } from '../../services/contractor.service';
import { Contractor } from '../../models/contractor.model';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    InputTextModule,
    FloatLabelModule,
    DropdownModule
  ],
  templateUrl: './create-property.component.html',
  styles: [],
})
export class CreatePropertyComponent implements OnInit {
  form!: FormGroup;

  selectedImageFile: File | null = null;
  imagePreview: string | null = null;

  trusteeUuid: string | null = null;
  coporateUuid: string | null = null;

  contractors: Contractor[] = [];
  isDarkMode = false;
  isSubmitting = false;
  submissionError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private contractorService: ContractorService,
    private router: Router,
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
    this.trusteeUuid = localStorage.getItem('trusteeID');
    this.coporateUuid = localStorage.getItem('bodyCoporateID');
    if (!this.trusteeUuid) {
      this.submissionError = 'Authentication error: Please log in again.';
    }
    this.loadContractors();
  }

  loadContractors(): void {
    this.contractorService.getAllContractors().subscribe({
      next: (data: Contractor[]) => this.contractors = data,
      error: (err: any) => console.error('Failed to load contractors:', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.submissionError = 'Please fill all required fields.';
      return;
    }

    const formValue = this.form.value;
    if (!formValue.primaryContractor) {
      this.submissionError = 'Please select a Primary Contractor.';
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;

    // 1) Upload image if selected
    let propertyImageId: string | null = null;
    if (this.selectedImageFile) {
      try {
        const uploadResult = await this.propertyService.uploadImage(this.selectedImageFile).toPromise();
        // backend returns { "imageKey": "..." }
        propertyImageId = (uploadResult as any).imageKey;
      } catch (err) {
        console.error('Image upload failed:', err);
        this.submissionError = 'Failed to upload image.';
        this.isSubmitting = false;
        return;
      }
    }

    // 2) Compose full address
    const fullAddress = [
      formValue.address,
      formValue.suburb,
      formValue.city,
      formValue.province
    ]
      .filter(part => part && part.trim())
      .join(', ');

    // 3) Build payload
    const payload: CreateBuildingPayload = {
      name: formValue.name as string,
      address: fullAddress,
      type: formValue.type as string,
      propertyValue: Number(formValue.propertyValue),
      primaryContractor: formValue.primaryContractor,
      latestInspectionDate: new Date().toISOString().split('T')[0],
      trusteeUuid: this.trusteeUuid as string,
      coporateUuid: this.coporateUuid ?? null,
      propertyImageId: propertyImageId,
      area: Number(formValue.area)
    };

    console.log('Payload:', payload);

    // 4) Send request
    this.propertyService.createProperty(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Error creating property:', err);
        this.submissionError =
          err.status === 400 ? 'Invalid data.' :
          err.status === 404 ? 'Not found.' :
          err.status === 500 ? 'Server error.' :
          'Failed to create property.';
        this.isSubmitting = false;
      }
    });
  }
}
