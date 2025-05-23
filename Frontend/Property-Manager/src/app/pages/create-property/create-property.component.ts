import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="p-8">
      <h2 class="text-2xl font-semibold mb-2">Create New Property</h2>
      <div class="h-1 w-32 bg-yellow-400 mb-8"></div>

      <div class="border rounded shadow-md p-6 flex flex-wrap gap-4 bg-white max-w-5xl">
        <!-- Left: Form Fields -->
        <div class="flex flex-col flex-1 gap-4 min-w-[300px]">
          <input class="border p-3 rounded" type="text" placeholder="Property Name" formControlName="name" />
          <div class="flex gap-4">
            <input class="flex-1 border p-3 rounded" type="text" placeholder="Street Address" formControlName="address" />
            <input class="flex-1 border p-3 rounded" type="text" placeholder="Suburb" formControlName="suburb" />
          </div>
          <div class="flex gap-4">
            <input class="flex-1 border p-3 rounded" type="text" placeholder="City" formControlName="city" />
            <input class="flex-1 border p-3 rounded" type="text" placeholder="Province" formControlName="province" />
          </div>
          <div class="flex gap-4">
            <input class="flex-1 border p-3 rounded" type="text" placeholder="Type" formControlName="type" />
            <input class="flex-1 border p-3 rounded" type="text" placeholder="Advanced Settings" formControlName="advancedSettings" />
          </div>
        </div>

        <div class="flex flex-col items-center w-[300px]">
          <div class="border rounded w-full h-48 flex items-center justify-center bg-gray-50">
            <img src="https://img.icons8.com/ios/50/image.png" alt="upload" />
          </div>
          <input #fileInput id="image-upload" type="file" hidden (change)="onFileSelected($event)" />
          <button type="button" class="mt-2 px-4 py-1 bg-gray-200 rounded text-sm" (click)="fileInput.click()">Upload Image</button>
        </div>

        <!-- Submit Button -->
        <div class="w-full flex justify-end mt-4">
          <button class="bg-yellow-400 hover:bg-yellow-300 px-6 py-2 rounded font-medium" type="submit" [disabled]="form.invalid">
            Create Property
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CreatePropertyComponent {
  form: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      suburb: [''],
      city: [''],
      province: [''],
      type: [''],
      advancedSettings: [''],
      image: [null],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}