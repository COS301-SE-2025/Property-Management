import { Component, input, OnInit } from '@angular/core';
import { Toast } from "primeng/toast";
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonIcon, IonButtons, IonButton, IonContent, IonModal } from "@ionic/angular/standalone";
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BodyCoporate, BodyCoporateService, BuildingApiService, ImageApiService, PropertyService, StorageService } from 'shared';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { PhotoService } from 'src/app/services/photo.service';
import { addIcons } from 'ionicons';
import { cameraOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-update-house',
  templateUrl: './update-house.component.html',
  styles: `
    .dark .p-select {
      background: #000000;
    }
  `,
  imports: [IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, Toast, ReactiveFormsModule, CommonModule, SelectModule],
  providers: [MessageService]
})
export class UpdateHouseComponent extends ModalComponent implements OnInit {

  houseId = input.required<string>();
  selectedFile: File | null = null;
  form!: FormGroup;

  public bodyCorporates: BodyCoporate[] = [];
  public updateError = false;
  public capturedPhoto: string | null = null;
  
  constructor(
    private messageService: MessageService, 
    private fb: FormBuilder, 
    private imageService: ImageApiService,
    private buildingService: BuildingApiService, 
    private propertyService: PropertyService, 
    private bodyCorporateService: BodyCoporateService, 
    private photoService: PhotoService,
    private storage: StorageService
  ) {
    super();

    addIcons({ cameraOutline, trashOutline });
  }

  async ngOnInit() {
    this.bodyCorporates = [];

    const id = await this.storage.get('trusteeId');

    let corporateIds: string[] = [];
    this.propertyService.getInvitations().subscribe({
      next: (invite) => {
        invite.forEach((i) => {
          if(i.trusteeUuid === id && i.status === "ACCEPTED")
          {
            corporateIds.push(i.coporateUuid!);
          }
        });

        if(corporateIds.length > 0 || !corporateIds)
        {
          corporateIds.forEach((id) => {
            this.bodyCorporateService.getBodyCorporate(id).subscribe({
              next: (bc) => {
                this.bodyCorporates.push(bc);

                const curr = this.form.get('corporateUuid')?.value;
                if(curr === bc.corporateUuid)
                {
                  this.form.get('corporateUuid')?.setValue(bc.corporateUuid);
                }
              }
            })
          })
        }
      }
    });

    this.form = this.fb.group({
        name: ['', Validators.required],
        corporateUuid: [null]
    });
  }

  async capturePhoto() {
    try {
      const photo = await this.photoService.takePhoto();
      if (photo.base64String) {
        this.capturedPhoto = `data:image/${photo.format};base64,${photo.base64String}`;

        const blob = this.photoService.base64ToBlob(photo.base64String, `image/${photo.format}`);
        this.selectedFile = this.photoService.createFile(blob, `captured_${Date.now()}.${photo.format}`, photo.format);
      }
    } catch (err) {
      console.error("Error capturing photo", err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to capture photo'
      });
    }
  }

  deletePhoto() {
    this.capturedPhoto = null;
    this.selectedFile = null;
  }

  async onSubmit() {
    if (this.form.valid) {
      this.updateError = false;

      const name = this.form.value.name;
      const bcId = this.form.value.corporateUuid;
      let imageId: string = "00000000-0000-0000-0000-000000000000";

      // STEP 1: Upload image WITHOUT building UUID (if new image is selected)
      if (this.selectedFile) {
        try {
          console.log('Uploading new building image...');
          
          const imageIds = await this.imageService.uploadImages(
            [this.selectedFile],  // Wrap single file in array
            undefined,            // user_uuid
            undefined,            // task_uuid
            undefined,            // progress_uuid
            undefined             // building_uuid - NOT YET AVAILABLE
          );

          if (imageIds && imageIds.length > 0) {
            imageId = imageIds[0];
            console.log('Image uploaded successfully:', imageId);
          }
        } catch (err) {
          console.error("Image upload failed", err);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to upload image, please try again'
          });
          return; // Stop if image upload fails
        }
      }

      // STEP 2: Update building with image ID
      console.log('Updating building:', { houseId: this.houseId(), name, imageId, bcId });

      this.buildingService.updateBuilding(this.houseId(), name, imageId, bcId).subscribe({
        next: async (buildingResponse: any) => {
          console.log('Building updated successfully:', buildingResponse);

          // STEP 3: Update image association with building UUID (if new image was uploaded)
          if (this.selectedFile && imageId !== "00000000-0000-0000-0000-000000000000") {
            try {
              console.log('Updating image association with building UUID:', this.houseId());

              await this.imageService.updateImageAssociations(
                imageId,
                undefined,        // user_uuid
                undefined,        // task_uuid
                undefined,        // progress_uuid
                this.houseId()    // building_uuid - NOW AVAILABLE!
              );

              console.log('✓ Image association updated successfully');
            } catch (updateError) {
              console.error('Failed to update image association:', updateError);
              // Non-critical error - building is already updated
            }
          }

          this.form.reset();
          this.closeModal();

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Building successfully updated'
          });

          setTimeout(() => {
            window.location.reload();
          }, 150);
        },
        error: (err) => {
          console.error("Failed to update building", err);
          this.updateError = true;

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update building'
          });
        }
      });
    }
  }
}