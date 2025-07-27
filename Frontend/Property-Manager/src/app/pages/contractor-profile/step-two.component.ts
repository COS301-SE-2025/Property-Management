import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: 'step-two.component.html',
  styles: [`
.form-container {
  border: 2px solid #ccc;
  border-radius: 12px;
  background: #fff;
  padding: 2.5rem 12.5rem 2rem 2.5rem;
  margin: 40px auto;
  box-sizing: border-box;
  margin-top: -2rem;
  margin-bottom: -2rem;
  margin-left: 6rem;
  width: 170%;
}
.input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 150%;
  font-size: 1rem;
  color: #888;
  font-weight: 500;
}
.input::placeholder { color: #888; }
.file-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #888;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  background: #fff;
  width: 150%;
  margin-left: 7rem;
}
.file-label:hover { background-color:rgba(216, 216, 216, 0.63); }
.btn-yellow {
  padding: 0.5rem 2rem;
  border-radius: 6px;
  background-color: #ffd74b;
  color: black;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: background 0.2s;
}
.btn-yellow:hover { background-color: #facc15; }
  `]
})
export class StepTwoComponent {
  @Output() next = new EventEmitter<{
    // address: string;
    // city: string;
    // postal_code: string;
    reg_number: string;
    description: string;
    services: string;
  }>();
  @Output() back = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // address: ['', Validators.required],
      // city: ['', Validators.required],
      // postal_code: ['', Validators.required],
      reg_number: ['', Validators.required],
      // contractorId: [''],
      description: ['', Validators.required],
      services: ['', Validators.required]
    });
  }

  emitRelevantData() {
    // if(!this.form.valid){
    //   this.form.markAllAsTouched();
    //   return;
    // }

    this.next.emit({
      // address: this.form.value.address,
      // city: this.form.value.city,
      // postal_code: this.form.value.postal_code,
      reg_number: this.form.value.reg_number,
      description: this.form.value.descriptionSkills,
      services: this.form.value.services
    });
  }
}