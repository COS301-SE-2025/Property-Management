import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { ToastController } from '@ionic/angular/standalone';
import { ImageApiService, PropertyService, StorageService } from 'shared';
import { ContractorService } from 'shared';
import { Contractor } from 'shared';
import { HttpErrorResponse } from '@angular/common/http';
import { PhotoService } from 'src/app/services/photo.service';
import { addIcons } from 'ionicons';
import { cameraOutline, trashOutline } from 'ionicons/icons';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TabComponent, IonicModule],
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
  form: FormGroup;
  contractors: Contractor[] = [];
  capturedPhotos: string[] = []; // Changed to array
  selectedImageFiles: File[] = []; // Changed to array
  isSubmitting = false;
  submissionError: string | null = null;
  bodyCorporates: any[] = [];

  trusteeUuid: string | null = null;
  coporateUuid: string | null = null;

  private fb = inject(FormBuilder);
  private propertyService = inject(PropertyService);
  private contractorService = inject(ContractorService);
  private router = inject(Router);
  private photoService = inject(PhotoService);
  private storage = inject(StorageService);
  private imageService = inject(ImageApiService);

  constructor(private toastController: ToastController) {
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
      image: [null],
    });

    addIcons({ cameraOutline, trashOutline });
  }

  async ngOnInit() {
    this.trusteeUuid = await this.storage.get('trusteeId');
    if (!this.trusteeUuid) {
        this.submissionError = 'Authentication error: Please log in again.';
    }
    this.loadBodyCorporates();
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

  loadContractors(): void {
    this.contractorService.getAllContractors().subscribe({
      next: (contractors: Contractor[]) => {
        this.contractors = contractors;
      },
      error: () => {
        this.contractors = [];
      }
    });
  }

  async capturePhoto(): Promise<void> {
    try {
      const photo = await this.photoService.takePhoto();
      if (photo.base64String) {
        const photoUrl = `data:image/${photo.format};base64,${photo.base64String}`;
        this.capturedPhotos.push(photoUrl); // Add to array
        
        const blob = this.photoService.base64ToBlob(photo.base64String, `image/${photo.format}`);
        const file = this.photoService.createFile(blob, `property_${Date.now()}.${photo.format}`, photo.format);
        this.selectedImageFiles.push(file); // Add to array
        
        console.log(`Photo ${this.capturedPhotos.length} captured`);
      }
    } catch (err) {
      console.error("Error capturing photo", err);
      this.submissionError = 'Failed to capture photo';
      await this.presentToast('Failed to capture photo', 'danger');
    }
  }

  deletePhoto(index: number): void {
    this.capturedPhotos.splice(index, 1);
    this.selectedImageFiles.splice(index, 1);
    console.log(`Photo ${index + 1} deleted. Remaining: ${this.capturedPhotos.length}`);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.submissionError = 'Please fill all required fields.';
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;

    const formValue = this.form.value;
    const fullAddress = [
      formValue.address,
      formValue.suburb,
      formValue.city,
      formValue.province
    ].filter(part => part && part.trim()).join(', ');

    try {
      // STEP 1: Upload ALL images WITHOUT building UUID (initially)
      let uploadedImageIds: string[] = [];
      let primaryImageId: string = '00000000-0000-0000-0000-000000000000';

      if (this.selectedImageFiles.length > 0) {
        console.log(`Uploading ${this.selectedImageFiles.length} property images without building UUID...`);
        
        try {
          uploadedImageIds = await this.imageService.uploadImages(
            this.selectedImageFiles,  // Array of files
            undefined,                // user_uuid
            undefined,                // task_uuid
            undefined,                // progress_uuid
            undefined                 // building_uuid - NOT YET AVAILABLE
          );
          
          if (uploadedImageIds && uploadedImageIds.length > 0) {
            primaryImageId = uploadedImageIds[0];
            console.log(`${uploadedImageIds.length} images uploaded successfully`);
            console.log('Primary image ID:', primaryImageId);
          }
        } catch (uploadError) {
          console.error('Error uploading images:', uploadError);
          await this.presentToast('Failed to upload images', 'danger');
          this.isSubmitting = false;
          return;
        }
      }

      // STEP 2: Create property with primary image ID
      const payload = {
        name: formValue.name,
        address: fullAddress,
        type: formValue.type,
        propertyValue: Number(formValue.propertyValue),
        bodyCorporate: formValue.bodyCorporate,
        area: Number(formValue.area),
        propertyImageId: primaryImageId,
        trusteeUuid: this.trusteeUuid!,
        coporateUuid: formValue.coporateUuid
      };

      console.log('Creating property with payload:', payload);

      const propertyResponse: any = await firstValueFrom(
        this.propertyService.createProperty(payload)
      );

      console.log('Property created:', propertyResponse);

      // STEP 3: Update ALL image associations with building UUID (if images were uploaded)
      if (uploadedImageIds.length > 0 && propertyResponse) {
        const buildingUuid = propertyResponse.buildingUuid || 
                            propertyResponse.uuid || 
                            propertyResponse.id ||
                            propertyResponse.corporateUuid;

        if (buildingUuid) {
          try {
            console.log(`Updating ${uploadedImageIds.length} image associations with building UUID:`, buildingUuid);
            
            // Process all image updates sequentially
            for (let i = 0; i < uploadedImageIds.length; i++) {
              const imageId = uploadedImageIds[i];
              console.log(`[${i + 1}/${uploadedImageIds.length}] Updating image ${imageId}`);
              
              try {
                await this.imageService.updateImageAssociations(
                  imageId,
                  undefined,      // user_uuid
                  undefined,      // task_uuid
                  undefined,      // progress_uuid
                  buildingUuid    // building_uuid - NOW AVAILABLE!
                );
                console.log(`✓ Image ${i + 1} updated successfully`);
              } catch (imageError) {
                console.error(`Failed to update image ${imageId}:`, imageError);
                // Continue with other images even if one fails
              }
            }
            
            console.log(`✓ All ${uploadedImageIds.length} images processed`);
          } catch (updateError) {
            console.error('Failed to update some image associations:', updateError);
            // Non-critical error - property is already created
          }
        }
      }

      this.isSubmitting = false;
      await this.presentToast('Successfully created property', 'success');
      this.router.navigate(['/home']).then(() => window.location.reload());

    } catch (err) {
      console.error('Error creating property:', err);
      this.isSubmitting = false;
      this.submissionError = 'Failed to create property.';
      await this.presentToast('Failed to create property', 'danger');
    }
  }

  private async presentToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,      
      position: 'top'
    });
    await toast.present();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImageFiles.push(file);
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.capturedPhotos.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
}