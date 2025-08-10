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
  styles: ``,
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
  async capturePhoto(){
    try{
      const photo = await this.photoService.takePhoto();
      if(photo.base64String)
      {
        this.capturedPhoto = `data:image/${photo.format};base64,${photo.base64String}`;

        const blob = this.photoService.base64ToBlob(photo.base64String, `image/$(photo.format)`);
        this.selectedFile = this.photoService.createFile(blob, `captured_${Date.now()}.${photo.format}`, photo.format);
      }
    }
    catch(err){
      console.error("Error capturing photo", err);
    }
  }
  deletePhoto()
  {
    this.capturedPhoto = null;
    this.selectedFile = null;
  }
  async onSubmit() {
    if(this.form.valid)
    {
      this.updateError = false;
  
      let imageId: string | undefined = "00000000-0000-0000-0000-000000000000";
  
      if(this.selectedFile)
      {
        try{
          const upload = await this.imageService.uploadImage(this.selectedFile).toPromise();
          if(upload?.imageId){
            imageId = upload?.imageId;
          }
        }
        catch(err)
        {
          console.error("Image upload failed", err);
  
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to upload image, please try again'
          });
        }
      }
  
      const name = this.form.value.name;
      const bcId = this.form.value.corporateUuid; 
  
      this.buildingService.updateBuilding(this.houseId(), name, imageId,  bcId).subscribe({
        next: () => {
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
        }
      });
    }
   }
}
