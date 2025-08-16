import { Component, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LifecycleCostService, CreateLifeCycleCostRequest } from 'shared';
import { AuthService } from 'shared';

@Component({
  selector: 'app-add-cost-dialog',
  imports: [DialogModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-cost-dialog.component.html',
  styles: ``
})
export class AddCostDialogComponent extends DialogComponent {

  costAdded = output<void>();

  form: FormGroup;
  addError = false;
  isSubmitting = false;

  constructor(
    private lifecycleCostService: LifecycleCostService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {  
    super();
    this.form = this.fb.group({
      type: ['', Validators.required],
      description: [''],
      condition: [''],
      timeFrame: [''],
      estimatedBudget: [null, [Validators.min(0), Validators.max(100000000)]] 
    });
  }

  override closeDialog(): void {
    super.closeDialog();
    this.form.reset();
    this.addError = false;
    this.isSubmitting = false;
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.isSubmitting = true;
    this.addError = false;

    const getCookieValue = (name: string): string | null => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : null;
    };

    const corporateUuid = getCookieValue('bodyCoporateId');
    
    if (!corporateUuid) {
      this.addError = true;
      this.isSubmitting = false;
      console.error('No corporate UUID available in cookies');
      return;
    }

    const formValue = this.form.value;
    const request: CreateLifeCycleCostRequest = {
      coporateUuid: corporateUuid,
      type: formValue.type,
      description: formValue.description || undefined,
      condition: formValue.condition || undefined,
      timeframe: formValue.timeFrame || undefined,
      estimatedCost: formValue.estimatedBudget || undefined
    };

    this.lifecycleCostService.create(request).subscribe({
      next: (response) => {
        console.log('Cost added successfully:', response);
        this.costAdded.emit(); 
        this.closeDialog();
      },
      error: (error) => {
        console.error('Error adding cost:', error);
        this.addError = true;
        this.isSubmitting = false;
      }
    });
  }
}