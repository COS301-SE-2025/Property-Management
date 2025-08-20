import { Component, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { IonHeader, IonModal, IonInput, IonItem, IonToolbar, IonButtons, IonButton, IonContent } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular/standalone';
import { BudgetApiService, BuildingDetails, HousesService, InventoryItemApiService } from 'shared';

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [IonHeader, IonModal, IonInput, IonItem, IonToolbar, IonButtons, IonButton, IonContent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-inventory.component.html',
  styles: `
    .dark ion-input::part(native) {
      background-color: #374151;
      color: #f9fafb;
    }

    .dark ion-input::part(native):focus {
      border-bottom: 1px solid #facc15;
    }
  `,
})
export class AddInventoryComponent extends ModalComponent implements OnInit {

  form!: FormGroup;
  houseId = '';
  loading = false;
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute, 
    private inventoryItemApiService: InventoryItemApiService, 
    private budgetApiService: BudgetApiService, 
    private housesService: HousesService,
    private toastController: ToastController
  ) {
    super();
   }

  ngOnInit() {
    this.loading = false;
    this.route.params.subscribe(params => {
      this.houseId = params['houseId'] || null;
    });

    this.form = this.fb.group({
        inventoryName: ['', Validators.required],
        itemPrice: ['', [Validators.required, Validators.min(0)]],
        quantity: ['', [Validators.required, Validators.min(1)]],
        datePurchased: ['']
    });
  }

  override closeModal(): void {
    this.form.reset();
    super.closeModal();
  }

  override async confirm()
  {
    if(this.form.valid){
      this.loading = true;
      const name = this.form.value.inventoryName;
      const price = this.form.value.itemPrice;
      const quantity = this.form.value.quantity;

      this.inventoryItemApiService.addInventoryItem(name, "unit 1", price, quantity, this.houseId).subscribe({
        next: async () => {

          await this.getAndUpdateBudget((price*quantity));
          await this.housesService.loadInventory(this.houseId);
          await this.housesService.loadBudget(this.houseId);

          this.loading = false;

          await this.presentToast('Inventory item added succesfully', "success");
          
          this.form.reset();
          this.closeModal();
          
          setTimeout(() => {
            this.router.navigate(['view-house', this.houseId]).then(() => {
              window.location.reload();
            });
          }, 2000);
        },
        error: async (err) => {
          this.loading = false;
          console.error("Failed to create inventory item", err);

          await this.presentToast('Failed to add inventory item', "danger")
        }
      });
    }
  }
  private async getAndUpdateBudget(overallPrice: number)
  {
    this.budgetApiService.getBudgetsByBuildingId(this.houseId).subscribe(
       (bulidingDetails: BuildingDetails[]) => {

        if(bulidingDetails.length ===  0)
        {
          return;
        }

        const element = bulidingDetails[bulidingDetails.length-1];
        const elementID = element.budgetUuid;

        const newBudget: BuildingDetails = {
          budgetUuid: elementID,
          buildingUuid: this.houseId,
          approvalDate: new Date(),
          inventoryBudget: (element.inventoryBudget-overallPrice),
          inventorySpent: overallPrice,
          maintenanceBudget: element.maintenanceBudget,
          maintenanceSpent: element.maintenanceSpent
        };
        this.budgetApiService.updateBudget(elementID, newBudget).subscribe({
          error: async (err) => {
            console.error("Couldnt update budget", err);

            await this.presentToast('Failed to add inventory item', "danger")
          }
        });
      }
    )
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
