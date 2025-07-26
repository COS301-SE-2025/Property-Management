import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonModal, IonInput, IonItem, IonToolbar, IonButtons, IonButton, IonContent, IonIcon, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApiService, ImageApiService, ContractorApiService, ContractorDetails, StorageService } from 'shared';
import { addIcons } from 'ionicons';
import { cameraOutline, trashOutline } from 'ionicons/icons';
import { PhotoService } from 'src/app/services/photo.service';


@Component({
  selector: 'app-add-timeline',
  imports: [IonIcon,  IonHeader, IonModal, IonInput, IonItem, IonIcon, IonToolbar, IonButtons, IonButton, IonContent, IonSelect, IonSelectOption, CommonModule, ReactiveFormsModule],
  templateUrl: './add-timeline.component.html',
  styles: ``,
})
export class AddTimelineComponent extends ModalComponent implements OnInit {

  form!: FormGroup;
  houseId = '';
  selectedFile: File | null = null;
  
  public capturedPhoto: string | null = null;
  public contractors: ContractorDetails[] | undefined = undefined;

  constructor(
    private fb: FormBuilder, 
    private route : ActivatedRoute, 
    private router: Router, 
    private taskApiService: TaskApiService, 
    private imageService: ImageApiService, 
    private contractorService: ContractorApiService,
    private storage: StorageService,
    private photoService: PhotoService
  ) {
    super();

    addIcons({ cameraOutline, trashOutline });
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.houseId = params['houseId'] || null;
    });

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      contractorName: [[], Validators.required],
    });

    this.contractorService.getAllContractors().subscribe({
      next: (response) => {
        this.contractors = response;
      }
    });
  }

  override closeModal(): void {
    this.form.reset();
    super.closeModal();
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
  override async confirm() {
    if(this.form.valid)
    {
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

          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail: 'Failed to upload image, please try again'
          // });
        }
      }

      const userId = await this.storage.get('trusteeId');

      const name = this.form.value.name;
      const des = this.form.value.description;
      const date = this.form.value.date;
      const contractorId = this.form.value.contractorName[0];


      this.taskApiService.createTask(name, des, "pending", date, false, this.houseId, userId, imageId, contractorId).subscribe({
        next: () => {
          this.form.reset();
          this.closeModal();

          setTimeout(() => {
            this.router.navigate(['view-house', this.houseId]).then(() => {
              window.location.reload();
            });
          }, 3000);
        },
        error: (err) => {
          console.error("Failed to create task", err);
        }
      });
    }
  }
  deletePhoto()
  {
    this.capturedPhoto = null;
    this.selectedFile = null;
  }
}
