import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PropertyService } from '../../services/property.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent, InputTextModule, FloatLabelModule],
  templateUrl: './create-property.component.html',
  styles: [],
})

export class CreatePropertyComponent {
  form: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder, private propertyService: PropertyService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      suburb: [''],
      city: [''],
      province: [''],
      type: [''],
      bodyCorporate: [''],
      image: [null],
    });
  }

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files && input.files[0];
  if (file) {
    this.form.patchValue({ image: file });
  }
}

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const payload = {
        name: formValue.name,
        address: formValue.address,
        type: formValue.type,
        trustees: null,
        propertyValue: null,
        primaryContractors: null,
        latestInspectionDate: new Date().toISOString().split('T')[0], 
        propertyImage: null
      };

      this.propertyService.createProperty(payload).subscribe({
        next: (response) => {
          console.log('Property created successfully:', response);

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error creating property:', err);
        }
      });
    }
  }
}