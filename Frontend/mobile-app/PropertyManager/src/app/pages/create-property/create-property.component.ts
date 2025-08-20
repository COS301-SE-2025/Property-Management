import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { IonicModule, ToastController } from '@ionic/angular';
import { ImageApiService, PropertyService, StorageService, getCookieValue } from 'shared';
import { ContractorService } from 'shared';
import { Contractor } from 'shared';
import { HttpErrorResponse } from '@angular/common/http';
import { PhotoService } from 'src/app/services/photo.service';
import { addIcons } from 'ionicons';
import { cameraOutline, trashOutline } from 'ionicons/icons';


@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, TabComponent],
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
  form: FormGroup;
  contractors: Contractor[] = [];
  capturedPhoto: string | null = null;
  selectedImageFile: File | null = null;
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
      // primaryContractor: [''],
      coporateUuid: [''],
      bodyCorporate: [''],
      image: [null],
    });

    addIcons({ cameraOutline, trashOutline });
  }

  ngOnInit(): void {
    this.trusteeUuid = getCookieValue(document.cookie, 'trusteeId');
    if (!this.trusteeUuid) {
      this.coporateUuid = getCookieValue(document.cookie, 'bodyCoporateID');
      if(!this.coporateUuid) {
        // this.submissionError = 'Authentication error: Please log in again.';
      }
    }
    // this.loadContractors();
    this.loadBodyCorporates();
  }

  loadContractors(): void {
    this.contractorService.getAllContractors().subscribe({
      next: (data: Contractor[]) => this.contractors = data,
      error: () => this.contractors = []
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

  async capturePhoto(): Promise<void>
  {
    try {
      const photo = await this.photoService.takePhoto();
      if (photo.base64String) {
        this.capturedPhoto = `data:image/${photo.format};base64,${photo.base64String}`;
        
        const blob = this.photoService.base64ToBlob(photo.base64String, `image/${photo.format}`);
        this.selectedImageFile = this.photoService.createFile(blob, `property_${Date.now()}.${photo.format}`,photo.format);
        this.form.patchValue({ image: this.selectedImageFile });
      }
    } catch (err) {
      console.error("Error capturing photo", err);
      this.submissionError = 'Failed to capture photo';
    }
  }
  deletePhoto(): void
  {
    this.capturedPhoto = null;
    this.selectedImageFile = null;
    this.form.patchValue({ image: null });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (file) {
      this.selectedImageFile = file;
      this.form.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => this.capturedPhoto = reader.result as string;
      reader.readAsDataURL(file);
    }
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

    const id = await this.storage.get('trusteeId');
    let imageId = '00000000-0000-0000-0000-000000000000';

    //Upload file
    if(this.selectedImageFile)
    {
      const upload = await this.imageService.uploadImage(this.selectedImageFile).toPromise();

      if(upload)
      {
        imageId = upload?.imageId;
      }
    }

    const payload = {
      name: formValue.name,
      address: fullAddress,
      type: formValue.type,
      propertyValue: Number(formValue.propertyValue),
      // primaryContractor: formValue.primaryContractor,
      bodyCorporate: formValue.bodyCorporate,
      area: Number(formValue.area),
      propertyImageId: imageId,
      trusteeUuid: id
    };

    try {
      await this.propertyService.createProperty(payload).toPromise();
      this.isSubmitting = false;

      await this.presentToast('Successfully created property', "success");
      this.router.navigate(['/home']).then(() => {
        window.location.reload();
      });
    } catch (err) {
      this.submissionError = 'Failed to create property.';
      this.isSubmitting = false;
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
}