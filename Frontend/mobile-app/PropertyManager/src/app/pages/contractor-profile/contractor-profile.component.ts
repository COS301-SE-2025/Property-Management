import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonText, IonSpinner } from '@ionic/angular/standalone';
import { ContractorService, ContractorDetails, getCookieValue, ImageApiService } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractor-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent, IonItem, IonInput, IonText, IonSpinner
  ],
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.scss']
})
export class ContractorProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  form: FormGroup;
  imagePreviewUrl: string | null = null;
  imageError = false;
  isSubmitting = false;
  submissionError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contractorService: ContractorService,
    private imageService: ImageApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: [''],
      suburb: [''],
      postalCode: [''],
      status: [true],
      reg_number: ['', Validators.required],
      description: ['', Validators.required],
      services: ['', Validators.required],
      project_history: [''],
      img: [null]
    });
  }

  ngOnInit() {
    const contractorId = getCookieValue(document.cookie, 'contractorId');
    if (contractorId) {
      this.contractorService.getContractorById(contractorId).subscribe({
        next: (contractor: ContractorDetails) => {
          this.form.patchValue(contractor);
          if (contractor.img) {
            this.loadImage(contractor.img);
          }
        },
        error: (err) => {
          console.error('Error fetching contractor data:', err);
        }
      });
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        this.imageError = true;
        alert('File size exceeds 3MB limit. Please select a smaller file.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        this.fileInput.nativeElement.value = '';
        this.imageError = true;
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl = e.target?.result as string;
        this.imageError = false;
      };
      reader.readAsDataURL(file);

      // Upload to server
      this.imageService.uploadImage(file).subscribe({
        next: (response) => {
          this.form.patchValue({ img: response.imageId });
          this.loadImage(response.imageId);
        },
        error: (err) => {
          console.error('Error uploading image:', err);
          this.imageError = true;
          alert('Error uploading image. Please try again.');
          this.imagePreviewUrl = null;
          this.fileInput.nativeElement.value = '';
        }
      });
    }
  }

  loadImage(imageId: string) {
    this.imageService.getImage(imageId).subscribe({
      next: (imageUrl) => {
        this.imagePreviewUrl = imageUrl;
        this.imageError = false;
      },
      error: (err) => {
        console.error('Error loading image:', err);
        this.imageError = true;
        this.imagePreviewUrl = null;
      }
    });
  }

  resetImage() {
    this.imagePreviewUrl = null;
    this.fileInput.nativeElement.value = '';
    this.form.patchValue({ img: '' });
    this.imageError = false;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.submissionError = 'Please fill all required fields.';
      return;
    }
    this.isSubmitting = true;
    this.submissionError = null;

    const contractorId = getCookieValue(document.cookie, 'contractorId');
    const payload = { ...this.form.value };

    try {
      await this.contractorService.updateContractor(contractorId, payload).toPromise();
      localStorage.setItem('contractorProfileComplete', 'true');
      this.router.navigate(['/contractor-dashboard']);
    } catch (err: any) {
      this.submissionError = 'Failed to update contractor profile.';
      console.error(err);
    } finally {
      this.isSubmitting = false;
    }
  }
}