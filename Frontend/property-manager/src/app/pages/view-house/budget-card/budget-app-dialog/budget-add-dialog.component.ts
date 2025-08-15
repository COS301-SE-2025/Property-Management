import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { BudgetApiService } from 'shared';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-budget-add-dialog',
  imports: [CommonModule, DialogModule, ReactiveFormsModule, Toast],
  providers: [MessageService],
  templateUrl: './budget-add-dialog.component.html',
  styles: ``
})
export class BudgetAddDialogComponent extends DialogComponent implements OnInit{
  form!: FormGroup;
  houseId = '';

  public date = new Date();
  public addError = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,  private budgetApiService: BudgetApiService, private messageService: MessageService ){ 
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
        next: () => {
          this.form.reset();
          this.closeDialog();

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Budget successfully created'
          });

          setTimeout(() => {
            this.router.navigate(['viewHouse', this.houseId]).then(() => {
              window.location.reload();
            });
          }, 2000);
        },
        error: (err) => {
          console.error("Failed to create budget", err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create budget',
          })
        }
      });
    }
  }
}
