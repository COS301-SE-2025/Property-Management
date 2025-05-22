import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-owner.component.html',
  styleUrl: './register-owner.component.scss'
})
export class RegisterOwnerComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {

      console.log(this.form.value);
    }
  }
}