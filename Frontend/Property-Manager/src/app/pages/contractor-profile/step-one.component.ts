import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="card">
      <form [formGroup]="form">
        <h3>Enter Details Below:</h3>
        <input type="text" formControlName="name" placeholder="Full Name / Company Name" />
        <input type="email" formControlName="email" placeholder="Email Address" />
        <input type="text" formControlName="phone" placeholder="Phone Number" />
        <input type="text" formControlName="address" placeholder="Address" />
        <div class="row">
          <input type="text" formControlName="city" placeholder="City" />
          <input type="text" formControlName="suburb" placeholder="Suburb" />
        </div>
        <input type="text" formControlName="postalCode" placeholder="Postal Code" />
        <input type="text" formControlName="status" placeholder="Status" />

        <div class="upload-section">
          <label for="profileImg">
            <img src="assets/image-placeholder.png" alt="Profile image placeholder" />
          </label>
          <input id="profileImg" type="file" (change)="upload($event)" hidden />
          <small>Upload Image</small>
        </div>

        <button class="next" (click)="next.emit()">Next</button>
      </form>
    </div>
  `
})
export class StepOneComponent {
  @Output() next = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      address: [''],
      city: [''],
      suburb: [''],
      postalCode: [''],
      status: ['']
    });
  }

  upload(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Profile image:', file.name);
    }
  }
}
