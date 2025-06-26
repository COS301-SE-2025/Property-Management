import { Component, input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SliderModule } from 'primeng/slider';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { BuildingDetails } from '../../../models/buildingDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetApiService } from '../../../services/api/Budget api/budget-api.service';

@Component({
  selector: 'app-edit-budget-dialog',
  imports: [DialogModule, FloatLabelModule, ReactiveFormsModule, CommonModule, SliderModule, FormsModule],
  templateUrl: './edit-budget-dialog.component.html',
  styles: ``
})
export class EditBudgetDialogComponent extends DialogComponent implements OnInit{

  budget = input.required<BuildingDetails>();
  form!: FormGroup;
  updatedBudget = 0;
  houseId = '';

  public budgetType = input.required<string>();
  public oldBudgetAmount = input.required<number>();

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private budgetApiService: BudgetApiService){
     super();
     this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }

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
    if(this.form.valid)
    {
      console.log("Updating budget");
      const updateBudget = this.form.value.updatedBudget;
      let inventoryBudget = 0;
      let maintenanceBudget = 0;

      if(this.budgetType() === 'inventory')
      {
        inventoryBudget = updateBudget;
        maintenanceBudget = this.budget().maintenanceBudget;
      }
      else
      {
        maintenanceBudget = updateBudget;
        inventoryBudget = this.budget().inventoryBudget;
      }

      this.budgetApiService.createBudget((inventoryBudget+maintenanceBudget), maintenanceBudget, inventoryBudget, new Date(), this.houseId).subscribe({
        next: (response) => {
          this.form.reset();
          this.closeDialog();
          this.router.navigate(['manageBudget', this.houseId]).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error("Failed to update budget");
        }
      });
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
