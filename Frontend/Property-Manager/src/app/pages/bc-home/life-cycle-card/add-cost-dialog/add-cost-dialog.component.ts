import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-cost-dialog',
  imports: [DialogModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-cost-dialog.component.html',
  styles: ``
})
export class AddCostDialogComponent extends DialogComponent {

  form: FormGroup;

  public type = '';
  public description = '';
  public condition = '';
  public timeFrame = '';
  public estimatedBudget = 0;
  public addError = false;

  constructor(private fb: FormBuilder) 
  {  
    super();
    this.form = this.fb.group({
        type: ['', Validators.required],
        description: ['', Validators.required],
        condition: ['', Validators.required],
        timeFrame: ['', Validators.required],
        estimatedBudget: ['', [Validators.min(0), Validators.max(100000)]] 
      });
  }

  override closeDialog(): void {
    super.closeDialog();
    this.form.reset();
  }

  onSubmit(): void {

    //TODO: add logic for backend
    if(this.form.valid)
    {
      console.log("Cost added");
      this.closeDialog();
    }
  }
}
