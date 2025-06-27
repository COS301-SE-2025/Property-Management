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
        <input type="text" formControlName="contact_info" placeholder="Contact Info" />
        <input type="email" formControlName="email" placeholder="Email Address" />
        <input type="text" formControlName="phone" placeholder="Phone Number" />
        <input type="text" formControlName="address" placeholder="Address" />
        <div class="row">
          <input type="text" formControlName="city" placeholder="City" />
          <input type="text" formControlName="suburb" placeholder="Suburb" />
        </div>
        <input type="text" formControlName="postalCode" placeholder="Postal Code" />
        <div class="flex gap-4 items-end">
          <input type="text" formControlName="status" placeholder="Status" class="flex-1" />
          <button
            type="button"
            class="text-sm px-12 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow"
            (click)="emitRelevantData()"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent {
  @Output() next = new EventEmitter<{
    name: string;
    contact_info: string;
    email: string;
    phone: string;
  }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      contact_info: [''],
      email: ['', Validators.required],
      phone: [''],
      address: [''],
      city: [''],
      suburb: [''],
      postalCode: [''],
      status: ['']
    });
  }

  emitRelevantData() {
    this.next.emit({
      name: this.form.value.name,
      contact_info: this.form.value.contact_info,
      email: this.form.value.email,
      phone: this.form.value.phone
    });
  }

  upload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      console.log('Profile image:', file.name);
    }
  }
}