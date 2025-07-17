import { Component, input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SliderModule } from 'primeng/slider';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { BuildingDetails } from 'shared';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetApiService } from 'shared';

@Component({
  selector: 'app-edit-budget-dialog',
  imports: [DialogModule, FloatLabelModule, ReactiveFormsModule, CommonModule, SliderModule, FormsModule, ToastModule],
  templateUrl: './edit-budget-dialog.component.html',
  styles: ``,
  providers: [MessageService]
})
export class EditBudgetDialogComponent extends DialogComponent implements OnInit{

  budget = input.required<BuildingDetails>();
  form!: FormGroup;
  updatedBudget = 0;
  houseId = '';

  public budgetType = input.required<string>();
  public oldBudgetAmount = input.required<number>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router, 
    private budgetApiService: BudgetApiService,
    private messageService: MessageService
  ){
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
        next: () => {
          this.form.reset();
          this.closeDialog();

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Budget updated successfully'
          });

          setTimeout(() => {
            this.router.navigate(['manageBudget', this.houseId]).then(() => {
              window.location.reload();
            });
          }, 2500);
        },
        error: (err) => {
          console.error("Failed to update budget", err);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update budget',
          })
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
