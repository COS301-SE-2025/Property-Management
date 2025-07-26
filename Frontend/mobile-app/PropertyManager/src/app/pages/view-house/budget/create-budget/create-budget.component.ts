import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetApiService } from 'shared';

@Component({
  selector: 'app-create-budget',
  standalone: true,
  templateUrl: './create-budget.component.html',
  styles: ``,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class CreateBudgetComponent extends ModalComponent implements OnInit{

  houseId: string | null = null;
  form!: FormGroup;

  public date = new Date();

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,  private budgetApiService: BudgetApiService) {
    super();
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.houseId = params['houseId'] || null;
    });

    this.form = this.fb.group({
      inventory: ['', [Validators.required, Validators.min(0)]],
      maintenance: ['', Validators.min(0)]
    })
  }

  override closeModal(): void {
    this.form.reset();
    super.closeModal();
  }

  override async confirm() {
    if(this.form.valid)
    {
      const inventoryBudget = this.form.value.inventory;
      const maintenanceBudget = this.form.value.maintenance;
      const totalBudget = inventoryBudget + maintenanceBudget;
  
      this.budgetApiService.createBudget(totalBudget, maintenanceBudget, inventoryBudget, this.date, this.houseId!).subscribe({
        next: (response) => {
          console.log(response);
          this.form.reset();
          this.closeModal();
          this.router.navigate(['view-house', this.houseId]).then(() => {
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
