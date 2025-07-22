import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal, IonToolbar, IonHeader, IonButtons, IonButton, IonContent, IonInput, IonItem } from "@ionic/angular/standalone";
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { BudgetApiService, BuildingDetails } from 'shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-budget',
  imports: [IonInput,  IonModal, IonToolbar, IonHeader, IonButtons, IonButton, IonContent, IonItem, CommonModule, ReactiveFormsModule ],
  templateUrl: './edit-budget.component.html',
  styles: ``,
})
export class EditBudgetComponent extends ModalComponent implements OnInit {

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
    private toastController: ToastController
  ) { 
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.houseId = params['houseId'] || null;
    });

    this.form = this.fb.group({
      updatedBudget: [this.oldBudgetAmount(), [Validators.required, Validators.min(0)]],
    });
    this.updatedBudget = this.oldBudgetAmount()
  }

  override openModal(): void{
    this.form.patchValue({
      updatedBudget: this.oldBudgetAmount() 
    });
    this.updatedBudget = this.oldBudgetAmount();
    super.openModal();
  }

  override closeModal(): void{
    this.form.reset();
    super.closeModal();
  }

  override confirm(): void {
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
        next: async () => {
          this.form.reset();
          this.closeModal();

          const toast = await this.toastController.create({
            message: "Budget successfully updated",
            duration: 1500,
            position: 'top',
            color: 'success'
          });

          await toast.present();

          setTimeout(() => {
            this.router.navigate(['manage-budget', this.houseId]).then(() => {
              window.location.reload();
            });
          }, 2500);
        },
        error: async(err) => {
          console.error("Failed to update budget", err);

           const toast = await this.toastController.create({
            message: "Failed to update budget",
            duration: 1500,
            position: 'top',
            color: 'danger'
          });

          await toast.present();
        }
      });
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
