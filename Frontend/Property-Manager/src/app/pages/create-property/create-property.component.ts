import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  template: `
    <app-header />

    <div class="px-10 py-8">
      <h2 class="text-2xl font-bold mb-2">Create New Property</h2>
      <div class="h-1 w-64 bg-yellow-400 mb-6"></div>

      <div class="border rounded-lg p-6 shadow-sm bg-white max-w-6xl mx-auto">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="grid grid-cols-2 gap-4">
          <!-- Left Side: Inputs -->
          <div class="flex flex-col space-y-3">
            <input class="border rounded p-2" type="text" placeholder="Property Name" formControlName="name" />

            <div class="flex gap-3">
              <input class="border rounded p-2 w-full" type="text" placeholder="Street Address" formControlName="address" />
              <input class="border rounded p-2 w-full" type="text" placeholder="Suburb" formControlName="suburb" />
            </div>

            <div class="flex gap-3">
              <input class="border rounded p-2 w-full" type="text" placeholder="City" formControlName="city" />
              <input class="border rounded p-2 w-full" type="text" placeholder="Province" formControlName="province" />
            </div>

            <div class="flex gap-3">
              <input class="border rounded p-2 w-full" type="text" placeholder="Type" formControlName="type" />
              <input class="border rounded p-2 w-full" type="text" placeholder="Advanced Settings" formControlName="advancedSettings" />
            </div>
          </div>

<!-- Right Side: Image Upload -->
<div class="flex flex-col items-center justify-center border rounded bg-gray-50 relative">
  <div class="w-full h-full flex items-center justify-center">
    <img src="https://img.icons8.com/ios/50/image.png" alt="upload icon" class="w-10 h-10 opacity-50" />
  </div>
  <input #fileInput id="image-upload" type="file" hidden (change)="onFileSelected($event)" />
  <!-- Move the button lower by using absolute positioning or margin -->
  <button
    type="button"
    class="text-xs mt-8 px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow"
    style="margin-bottom: 0.5rem;"
    (click)="fileInput.click()"
  >
    Upload Image
  </button>
</div>

          <!-- Submit Button (spans full width) -->
          <div class="col-span-2 flex justify-end mt-4">
            <button type="submit" [disabled]="form.invalid" class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded font-semibold">
              Create Property
            </button>
          </div>
        </form>
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