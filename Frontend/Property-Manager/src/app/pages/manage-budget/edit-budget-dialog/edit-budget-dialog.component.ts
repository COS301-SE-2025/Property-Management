import { Component, input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SliderModule } from 'primeng/slider';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-budget-dialog',
  imports: [DialogModule, FloatLabelModule, ReactiveFormsModule, CommonModule, SliderModule, FormsModule],
  templateUrl: './edit-budget-dialog.component.html',
  styles: ``
})
export class EditBudgetDialogComponent implements OnInit{

  form!: FormGroup;
  displayDialog = false;
  updatedBudget = 0;

  public budgetType = input.required<string>();
  public oldBudgetAmount = input.required<number>();

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
      this.form = this.fb.group({
        updatedBudget: [this.oldBudgetAmount(), [Validators.required, Validators.min(0)]],
      });
      this.updatedBudget = this.oldBudgetAmount()
  }

  editBudget(): void{
    this.form.patchValue({
      updatedBudget: this.oldBudgetAmount() 
    });
    this.updatedBudget = this.oldBudgetAmount();
    this.displayDialog = true;
  }

  closeDialog(): void{
    this.displayDialog = false;
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

  onSliderChange(event: any) {
    this.form.patchValue({
      updatedBudget: event.value
    });
  }

  onBudgetUpdate(event: any){
    const value = parseFloat(event.target.value);
    if(!isNaN(value))
    {
      this.updatedBudget = value;
    }
  }
}
