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
    contact_info: string;
    email: string;
    phone: string;
  }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required, [Validators.required, Validators.minLength(2)]],
      email: ['', Validators.required, Validators.email],
      phone: ['', [Validators.pattern('^[0-9]{4,10}$')]],
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