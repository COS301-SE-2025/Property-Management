import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetApiService } from 'shared';
import { ToastController } from '@ionic/angular/standalone';

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
  loading = false;

  public date = new Date();

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,  private budgetApiService: BudgetApiService, private toastController: ToastController) {
    super();
   }

  ngOnInit() {
    this.loading = false;
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
      this.loading = true;
      const inventoryBudget = this.form.value.inventory;
      const maintenanceBudget = this.form.value.maintenance;
      const totalBudget = inventoryBudget + maintenanceBudget;
  
      this.budgetApiService.createBudget(totalBudget, maintenanceBudget, inventoryBudget, this.date, this.houseId!).subscribe({
        next: async () => {
          this.loading = false;
          this.form.reset();
          this.closeModal();

          await this.presentToast('Budget successfully created', "success");

          this.router.navigate(['view-house', this.houseId]).then(() => {
            window.location.reload();
          });
        },
        error: async (err) => {
          this.loading = false;
          console.error("Failed to create budget", err);
          await this.presentToast('Failed to create budget', "danger");
        }
      });
    }   
  }
  private async presentToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,      
      position: 'top'
    });
    await toast.present();
  }
}
