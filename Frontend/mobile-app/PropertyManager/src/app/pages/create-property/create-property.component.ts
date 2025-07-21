import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabComponent } from 'src/app/components/tab/tab.component';
import { IonicModule } from '@ionic/angular';
import { PropertyService } from 'shared';
import { ContractorService } from 'shared';
import { Contractor } from 'shared';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, TabComponent ],
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
  form: FormGroup;
  contractors: Contractor[] = [];
  selectedImageFile: File | null = null;
  imagePreview: string | null = null;
  isSubmitting = false;
  submissionError: string | null = null;

  private fb = inject(FormBuilder);
  private propertyService = inject(PropertyService);
  private contractorService = inject(ContractorService);
  private router = inject(Router);

  constructor() {
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

  async ngOnInit() {
    this.loadContractors();
  }

  loadContractors(): void {
    this.contractorService.getAllContractors().subscribe({
      next: (data: Contractor[]) => this.contractors = data,
      error: () => this.contractors = []
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (file) {
      this.selectedImageFile = file;
      this.form.patchValue({ image: file });
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

    this.isSubmitting = true;
    this.submissionError = null;

    const formValue = this.form.value;
    const fullAddress = [
      formValue.address,
      formValue.suburb,
      formValue.city,
      formValue.province
    ].filter(part => part && part.trim()).join(', ');

    const payload = {
      name: formValue.name,
      address: fullAddress,
      type: formValue.type,
      propertyValue: Number(formValue.propertyValue),
      primaryContractor: formValue.primaryContractor,
      bodyCorporate: formValue.bodyCorporate,
      area: Number(formValue.area),
      image: this.selectedImageFile
    };

    try {
      await this.propertyService.createProperty(payload).toPromise();
      this.isSubmitting = false;
      this.router.navigate(['/home']);
    } catch (err) {
      this.submissionError = 'Failed to create property.';
      this.isSubmitting = false;
    }
  }
}