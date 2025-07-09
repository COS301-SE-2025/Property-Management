import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent {
  @Output() next = new EventEmitter<{
    name: string;
    // contact_info: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    suburb: string;
    postalCode: string;
    status: boolean;
  }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['',[Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{4,10}$')]],
      address: [''],
      city: [''],
      suburb: [''],
      postalCode: [''],
      status: ['']
    });
  }

  emitRelevantData() {

    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }

    this.next.emit({
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      address: this.form.value.address,
      city: this.form.value.city,
      suburb: this.form.value.suburb,
      postalCode: this.form.value.postalCode,
      status: true
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