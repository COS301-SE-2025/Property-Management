import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PropertyService } from '../../services/property.service'; 
import { TrusteeResponse } from '../../models/trusteeresponse.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, InputTextModule, FloatLabelModule],
  templateUrl: './create-property.component.html',
  styles: [],
})
export class CreatePropertyComponent implements OnInit {
  form: ReturnType<FormBuilder['group']>;
  selectedImageFile: File | null = null;

  trusteeId: number | null = null;
  trusteeUuid: string | null = null;
  coporateUuid: string | null = null;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(0)]],
      address: ['', Validators.required],
      suburb: [''],
      city: [''],
      province: [''],
      type: ['', Validators.required],
      propertyValue: ['', Validators.required],
      primaryContractors: [''],
      bodyCorporate: [''],
      image: [null],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      this.selectedImageFile = file;
      this.form.patchValue({ image: file });
    }
  }

  async ngOnInit() {
    this.isDarkMode = document.documentElement.classList.contains('dark-theme');
    await this.fetchTrusteeAndCorporateInfo();
  }

async fetchTrusteeAndCorporateInfo() {
  const email = localStorage.getItem('userEmail');
  if (!email) {
    console.error('User email not found in localStorage.');
    return;
  }

  try {
    const trustee = await this.http
      .get<TrusteeResponse>(`/api/trustees/by-email/${encodeURIComponent(email)}`)
      .toPromise();
    this.trusteeId = trustee?.id ?? null;
    this.trusteeUuid = trustee?.trusteeUuid ?? null;
    this.coporateUuid = trustee?.coporateUuid ?? null;
  } catch (err) {
    console.error('Failed to fetch trustee info:', err);
  }
}

  async onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      let propertyImage = null;

      if (this.selectedImageFile) {
        try {
          const uploadResult = await this.propertyService.uploadImage(this.selectedImageFile).toPromise();
          propertyImage = uploadResult?.imageId;
        } catch (err) {
          console.error('Image upload failed', err);
        }
      }

      const formValue = this.form.value;
      const payload = {
        name: formValue.name,
        address: formValue.address,
        type: formValue.type,
        propertyValue: Number(formValue.propertyValue),
        area: Number(formValue.area),
        primaryContractors: formValue.primaryContractors
          ? formValue.primaryContractors.split(',').map((id: string) => Number(id.trim()))
          : [],
        latestInspectionDate: new Date().toISOString().split('T')[0],
        propertyImage: propertyImage ?? null,
        trustees: this.trusteeId !== null ? [this.trusteeId] : [],
        trusteeUuid: this.trusteeUuid,
        coporateUuid: this.coporateUuid,
      };

      this.propertyService.createProperty(payload).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error creating property:', err);
        }
      });
    }
  }

  public isDarkMode = false;
}