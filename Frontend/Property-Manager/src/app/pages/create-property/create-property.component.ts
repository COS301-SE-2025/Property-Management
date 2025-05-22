import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-property.component.html',
  styleUrl: './create-property.component.scss'
})
export class CreatePropertyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      suburb: [''],
      city: [''],
      province: [''],
      type: [''],
      advancedSettings: [''],
      image: [null]
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
