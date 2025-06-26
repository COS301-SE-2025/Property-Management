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
        <div class="flex gap-4 items-end">
  <input type="text" formControlName="status" placeholder="Status" class="flex-1" />
  <button
    type="button"
    class="text-sm px-12 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow"
    (click)="next.emit()"
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

  upload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      console.log('Profile image:', file.name);
    }
  }
}
