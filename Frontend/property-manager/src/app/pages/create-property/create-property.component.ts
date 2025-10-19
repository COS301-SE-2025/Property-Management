import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { PropertyService, CreateBuildingPayload, getCookieValue, ImageApiService } from 'shared';
import { ContractorService } from 'shared';
import { Contractor } from 'shared';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AddressMapComponent } from "../../components/address-map/address-map.component";

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
    ToastModule, 
    AddressMapComponent
  ],
  templateUrl: './create-property.component.html',
  styles: [],
  providers: [MessageService]
})
export class CreatePropertyComponent implements OnInit {
  form!: FormGroup;

  selectedImageFiles: File[] = [];
  imagePreviews: string[] = [];

  trusteeUuid: string | null = null;
  coporateUuid: string | null = null;

  bodyCorporates: any[] = [];

  contractors: Contractor[] = [];
  isDarkMode = false;
  isSubmitting = false;
  submissionError: string | null = null;
  showAddressModal = false;

  provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo',
    'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  propertyTypes = [
    'House', 'Apartment', 'Communal Area', 'Townhouse', 'Loft', 'Duplex', 'Penthouse', 'Studio', 'Cluster'
  ];

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private contractorService: ContractorService,
    private router: Router,
    private messageService: MessageService,
    private imageService: ImageApiService
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
      coporateUuid: [''],
      bodyCorporate: [''],
      images: [null],
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

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
    if (files && files.length > 0) {
      this.selectedImageFiles = Array.from(files);
      this.form.patchValue({images: this.selectedImageFiles});
      
      // Generate previews for all selected images
      this.imagePreviews = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.selectedImageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    this.form.patchValue({images: this.selectedImageFiles});
  }

  onAddressSelected(addressParts: { address: string, suburb: string, city: string, province: string }) {
    this.form.patchValue({
      address: addressParts.address,
      suburb: addressParts.suburb,
      city: addressParts.city,
      province: addressParts.province
    });
  }

  get addressControl(): FormControl {
    return this.form.get('address') as FormControl;
  }

  onAddressSelectedModal(addressParts: { address: string, suburb: string, city: string, province: string }) {
    this.form.patchValue({
      address: addressParts.address,
      suburb: addressParts.suburb,
      city: addressParts.city,
      province: addressParts.province
    });
    this.showAddressModal = false;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.submissionError = 'Please fill all required fields.';
      return;
    }

    const formValue = this.form.value;

    this.isSubmitting = true;
    this.submissionError = null;

    // STEP 1: Upload images WITHOUT building UUID (initially)
    let uploadedImageIds: string[] = [];
    let primaryImageId: string | null = null;

    if (this.selectedImageFiles.length > 0) {
      try {
        ////console.log(`Uploading ${this.selectedImageFiles.length} images without building UUID...`);
        
        // Upload all images without building UUID initially
        uploadedImageIds = await this.imageService.uploadImages(
          this.selectedImageFiles,
          undefined,    // user_uuid
          undefined,    // task_uuid
          undefined,    // progress_uuid
          undefined     // building_uuid - NOT YET AVAILABLE
        );
        
        if (uploadedImageIds && uploadedImageIds.length > 0) {
          primaryImageId = uploadedImageIds[0];
          ////console.log('All images uploaded successfully:', uploadedImageIds);
          ////console.log('Primary image ID:', primaryImageId);
        }
      } catch (err: unknown) {
        console.error('Image upload failed:', err);
        this.submissionError = 'Failed to upload images.';
        this.isSubmitting = false;
        return;
      }
    }

    // Compose full address
    const fullAddress = [
      formValue.address,
      formValue.suburb,
      formValue.city,
      formValue.province
    ]
      .filter(part => part && part.trim())
      .join(', ');

    // STEP 2: Build payload with primary image ID
    const payload: CreateBuildingPayload = {
      name: formValue.name as string,
      address: fullAddress,
      type: formValue.type as string,
      propertyValue: Number(formValue.propertyValue),
      latestInspectionDate: new Date().toISOString().split('T')[0],
      trusteeUuid: this.trusteeUuid as string,
      coporateUuid: formValue.coporateUuid,
      propertyImageId: primaryImageId,
      area: Number(formValue.area)
    };

    ////console.log('Creating property with payload:', payload);

    // STEP 3: Create property
    this.propertyService.createProperty(payload).subscribe({
      next: async (propertyResponse: any) => {
        ////console.log('Property created:', propertyResponse);
        
        // Extract building UUID from response
        const buildingUuid = propertyResponse.buildingUuid || 
                            propertyResponse.uuid || 
                            propertyResponse.id ||
                            propertyResponse.corporateUuid;
        
        ////console.log('Building UUID:', buildingUuid);

        // STEP 4: Update ALL image associations with building UUID
        if (uploadedImageIds.length > 0 && buildingUuid) {
          try {
            ////console.log(`Updating ${uploadedImageIds.length} image associations with building UUID...`);
            
            const updatePromises = uploadedImageIds.map(async (imageId, index) => {
              ////console.log(`[${index + 1}/${uploadedImageIds.length}] Updating image ${imageId}`);
              
              try {
                await this.imageService.updateImageAssociations(
                  imageId,
                  undefined,      // user_uuid
                  undefined,      // task_uuid
                  undefined,      // progress_uuid
                  buildingUuid    // building_uuid - NOW AVAILABLE!
                );
                ////console.log(`✓ [${index + 1}/${uploadedImageIds.length}] Image ${imageId} updated`);
              } catch (err) {
                console.error(`✗ [${index + 1}/${uploadedImageIds.length}] Failed to update image ${imageId}:`, err);
                throw err;
              }
            });
            
            await Promise.all(updatePromises);
            ////console.log(`✓ All ${uploadedImageIds.length} images successfully updated with building UUID`);
            
          } catch (err) {
            console.error('Failed to update some image associations:', err);
            // Non-critical error - property is already created
          }
        }

        this.isSubmitting = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Property Created',
          detail: `Property created successfully with ${uploadedImageIds.length} image(s).`
        });

        setTimeout(() => {
          this.router.navigate(['/home']).then(() => window.location.reload());
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error creating property:', err);
        this.submissionError =
          err.status === 400 ? 'Invalid data.' :
          err.status === 404 ? 'Not found.' :
          err.status === 500 ? 'Server error.' :
          'Failed to create property.';
        this.isSubmitting = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'The property was unsuccessfully created.'
        });
      }
    });
  }
}