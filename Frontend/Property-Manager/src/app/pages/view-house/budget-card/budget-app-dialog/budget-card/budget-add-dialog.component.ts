import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DialogComponent } from '../../../../../components/dialog/dialog.component';
import { BudgetApiService } from 'shared';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-add-dialog',
  imports: [CommonModule, DialogModule, ReactiveFormsModule],
  templateUrl: './budget-add-dialog.component.html',
  styles: ``
})
export class BudgetAddDialogComponent extends DialogComponent implements OnInit{
  form!: FormGroup;
  houseId = '';

  public date = new Date();
  public addError = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,  private budgetApiService: BudgetApiService){ 
    super();
    this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }


  ngOnInit(): void {
      this.form = this.fb.group({
        inventoryBudget: ['', [Validators.required, Validators.min(0)]],
        maintenanceBudget: ['', [Validators.required, Validators.min(0)]]
      })
  }

  override closeDialog(): void {
    super.closeDialog();
    this.form.reset();
  }

  async onSubmit(){

    if(this.form.valid)
    {
      const inventoryBudget = this.form.value.inventoryBudget;
      const maintenanceBudget = this.form.value.maintenanceBudget;
      const totalBudget = inventoryBudget + maintenanceBudget;
  
      this.budgetApiService.createBudget(totalBudget, maintenanceBudget, inventoryBudget, this.date, this.houseId).subscribe({
        next: (response) => {
          console.log(response);
          this.form.reset();
          this.closeDialog();
          this.router.navigate(['viewHouse', this.houseId]).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error("Failed to create budget", err);
        }
      });
    }
  }
}
