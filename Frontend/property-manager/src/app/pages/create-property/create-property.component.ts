import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { PropertyService, CreateBuildingPayload, ImageUploadResponse, getCookieValue } from 'shared';
import { ContractorService } from 'shared';
import { Contractor } from 'shared';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    DropdownModule,
    ToastModule
  ],
  templateUrl: './create-property.component.html',
  styles: [],
  providers: [MessageService]
})
export class CreatePropertyComponent implements OnInit {
  form!: FormGroup;

  selectedImageFile: File | null = null;
  imagePreview: string | null = null;

  trusteeUuid: string | null = null;
  coporateUuid: string | null = null;

  bodyCorporates: any[] = [];

  contractors: Contractor[] = [];
  isDarkMode = false;
  isSubmitting = false;
  submissionError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private contractorService: ContractorService,
    private router: Router,
    private messageService: MessageService
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
      // primaryContractor: ['', Validators.required],
      coporateUuid: ['', Validators.required],
      bodyCorporate: [''],
      image: [null],
    });
  }

  ngOnInit(): void {
    this.isDarkMode = document.documentElement.classList.contains('dark-theme');
    this.trusteeUuid = getCookieValue(document.cookie, 'trusteeId');
    if (!this.trusteeUuid) {
      this.coporateUuid = getCookieValue(document.cookie, 'bodyCoporateID');
      if(!this.coporateUuid) {
        this.submissionError = 'Authentication error: Please log in again.';
      }
    }
    // this.loadContractors();
    this.loadBodyCorporates();
  }

  private loadContractors(): void {
    this.contractorService.getAllContractors().subscribe({
      next: (data: Contractor[]) => {
        this.contractors = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load contractors:', err);
      }
    });
  }

  loadBodyCorporates(): void {
    if (this.trusteeUuid) {
      this.propertyService.getBodyCorporatesForTrustee(this.trusteeUuid).subscribe({
        next: async (invites: any[]) => {
          const acceptedInvites = invites.filter(invite => invite.status === 'ACCEPTED');
          const bodyCorporatePromises = acceptedInvites.map(invite =>
            this.propertyService.getBodyCorporateByUuid(invite.coporateUuid).toPromise()
          );
          const bodyCorporateDetails = await Promise.all(bodyCorporatePromises);
          this.bodyCorporates = bodyCorporateDetails.map(bc => ({
            coporateName: bc.corporateName,
            coporateUuid: bc.corporateUuid
          }));
        },
        error: (err: HttpErrorResponse) => console.error('Failed to load body corporates:', err)
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (file) {
      this.selectedImageFile = file;
      this.form.patchValue({image: file});
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
    // if (!formValue.primaryContractor) {
    //   this.submissionError = 'Please select a Primary Contractor.';
    //   return;
    // }

    this.isSubmitting = true;
    this.submissionError = null;

    let propertyImageId: string | null = null;
    if (this.selectedImageFile) {
      try {
        const uploadResult = await this.propertyService.uploadImage(this.selectedImageFile).toPromise();
        propertyImageId = (uploadResult as ImageUploadResponse).imageKey;
      } catch (err: unknown) {
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
      // primaryContractor: formValue.primaryContractor,
      latestInspectionDate: new Date().toISOString().split('T')[0],
      trusteeUuid: this.trusteeUuid as string,
      coporateUuid: formValue.coporateUuid,
      propertyImageId: propertyImageId,
      area: Number(formValue.area)
    };

    console.log('Payload:', payload);

    // 4) Send request
    this.propertyService.createProperty(payload).subscribe({
      next: () => {
        this.isSubmitting = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Property Created',
          detail: 'The property was created successfully.'
        });

        setTimeout(() => {
          this.router.navigate(['/home']).then(() => window.location.reload);
        }, 2000)
      },
      error: (err: HttpErrorResponse) => {
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
