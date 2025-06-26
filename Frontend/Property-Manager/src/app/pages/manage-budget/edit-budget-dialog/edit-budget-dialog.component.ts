import { Component, input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SliderModule } from 'primeng/slider';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogComponent } from '../../../components/dialog/dialog.component';

@Component({
  selector: 'app-edit-budget-dialog',
  imports: [DialogModule, FloatLabelModule, ReactiveFormsModule, CommonModule, SliderModule, FormsModule],
  templateUrl: './edit-budget-dialog.component.html',
  styles: ``
})
export class EditBudgetDialogComponent extends DialogComponent implements OnInit{

  form!: FormGroup;
  updatedBudget = 0;

  public budgetType = input.required<string>();
  public oldBudgetAmount = input.required<number>();

  constructor(private fb: FormBuilder){ super()}

  ngOnInit(): void {
      this.form = this.fb.group({
        updatedBudget: [this.oldBudgetAmount(), [Validators.required, Validators.min(0)]],
      });
      this.updatedBudget = this.oldBudgetAmount()
  }

  override openDialog(): void{
    this.form.patchValue({
      updatedBudget: this.oldBudgetAmount() 
    });
    this.updatedBudget = this.oldBudgetAmount();
    super.openDialog();
  }

  override closeDialog(): void{
    super.closeDialog();
    this.form.reset();
  }
  onSubmit()
  {
    //TODO: Implment logic to update budget
    if(this.form.valid)
    {
      console.log("Budget updated")
      this.closeDialog();
    }
  }

  onSliderChange(event: { value?:number}) {

    if(event.value !== undefined)
    {
      this.form.get('updatedBudget')?.setValue(event.value);
    }
  }

  onBudgetUpdate(event: Event){
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if(!isNaN(value))
    {
      this.updatedBudget = value;
    }
  }
}
