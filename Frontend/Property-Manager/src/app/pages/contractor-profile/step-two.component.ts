import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <div class="form-container max-w-6xl mx-auto w-full">
    <form [formGroup]="form">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6 pr-16">
        <div class="flex flex-col gap-4">
          <input type="text" formControlName="reg_number" placeholder="Registration Number" class="input" />
          <input type="text" formControlName="contractorId" placeholder="Contractor ID" class="input" />
          <div>
            <label for="descriptionSkills" class="font-semibold block mb-1">Description & Skills</label>
            <textarea id="descriptionSkills" rows="4" placeholder="Enter a brief description of your area of expertise" class="input resize-none" formControlName="descriptionSkills"></textarea>
          </div>
          <div>
            <label for="service" class="font-semibold block mb-1">Services</label>
            <textarea id="service" rows="4" placeholder="Enter primary services and secondary services (if any)" class="input resize-none" formControlName="services"></textarea>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <label for="certs" class="file-label">
            <img src="https://img.icons8.com/ios/50/document--v1.png" alt="document upload" class="w-5 h-5 mr-2 opacity-70" />
            Attach Certifications
          </label>
          <input id="certs" type="file" hidden />
          <label for="licenses" class="file-label">
            <img src="https://img.icons8.com/ios/50/document--v1.png" alt="document upload" class="w-5 h-5 mr-2 opacity-70" />
            Attach Licences
          </label>
          <input id="licenses" type="file" hidden />
          <label for="ids" class="file-label">
            <img src="https://img.icons8.com/ios/50/document--v1.png" alt="document upload" class="w-5 h-5 mr-2 opacity-70" />
            Attach ID
          </label>
          <input id="ids" type="file" hidden />
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <button type="button" class="btn-yellow" (click)="back.emit()">Back</button>
        <button type="button" class="btn-yellow" (click)="emitRelevantData()">Next</button>
      </div>
    </form>
  </div>
  `,
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
    address: string;
    city: string;
    postal_code: string;
    reg_number: string;
  }>();
  @Output() back = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      address: [''],
      city: [''],
      postal_code: [''],
      reg_number: [''],
      contractorId: [''],
      descriptionSkills: [''],
      services: ['']
    });
  }

  emitRelevantData() {
    this.next.emit({
      address: this.form.value.address,
      city: this.form.value.city,
      postal_code: this.form.value.postal_code,
      reg_number: this.form.value.reg_number
    });
  }
}