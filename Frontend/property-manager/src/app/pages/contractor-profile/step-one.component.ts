import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AddressMapComponent } from "../../components/address-map/address-map.component";
import { DropdownModule } from 'primeng/dropdown'; 
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [ReactiveFormsModule, AddressMapComponent, DropdownModule, SelectModule],
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent {
  @Output() next = new EventEmitter<{
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    suburb: string;
    postalCode: string;
    profession: string;
    status: boolean;
  }>();

  form: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    phone: FormControl<string | null>;
    address: FormControl<string | null>;
    city: FormControl<string | null>;
    suburb: FormControl<string | null>;
    postalCode: FormControl<string | null>;
    profession: FormControl<string | null>;
    status: FormControl<boolean | null>;
  }>;

  professions = [
    { label: 'Plumber', value: 'plumber' },
    { label: 'Electrician', value: 'electrician' },
    { label: 'Painter', value: 'painter' },
    { label: 'Carpenter', value: 'carpenter' },
    { label: 'Builder', value: 'builder' },
    { label: 'Landscaper', value: 'landscaper' },
    { label: 'Tiling and Flooring', value: 'Tiling and flooring' },
    { label: 'masonry', value: 'masonry' },
    { label: 'roofing', value: 'roofing' },
    { label: 'drywall and plastering', value: 'drywall and plastering' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: this.fb.control('', { validators: [Validators.required, Validators.minLength(2)] }),
      email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
      phone: this.fb.control('', { validators: [Validators.pattern('^[0-9]{4,10}$')] }),
      address: this.fb.control(''),
      city: this.fb.control(''),
      suburb: this.fb.control(''),
      postalCode: this.fb.control(''),
      profession: this.fb.control(''),
      status: this.fb.control(false)
    });
  }

  emitRelevantData() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.next.emit({
      name: this.form.value.name ?? '',
      email: this.form.value.email ?? '',
      phone: this.form.value.phone ?? '',
      address: this.form.value.address ?? '',
      city: this.form.value.city ?? '',
      suburb: this.form.value.suburb ?? '',
      postalCode: this.form.value.postalCode ?? '',
      profession: this.form.value.profession ?? '',
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
