import { Component, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { IonHeader, IonModal, IonInput, IonItem, IonToolbar, IonButtons, IonButton, IonContent } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BudgetApiService, BuildingDetails, HousesService, InventoryItemApiService } from 'shared';

@Component({
  selector: 'app-add-inventory',
  standalone: true,
  imports: [IonHeader, IonModal, IonInput, IonItem, IonToolbar, IonButtons, IonButton, IonContent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-inventory.component.html',
  styles: ``,
})
export class AddInventoryComponent extends ModalComponent implements OnInit {

  form!: FormGroup;
  houseId = '';
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute, 
    private inventoryItemApiService: InventoryItemApiService, 
    private budgetApiService: BudgetApiService, 
    private housesService: HousesService
  ) {
    super();
   }

  ngOnInit() {
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
      const name = this.form.value.inventoryName;
      const price = this.form.value.itemPrice;
      const quantity = this.form.value.quantity;

      this.inventoryItemApiService.addInventoryItem(name, "unit 1", price, quantity, this.houseId).subscribe({
        next: async () => {

          await this.getAndUpdateBudget((price*quantity));
          await this.housesService.loadInventory(this.houseId);
          await this.housesService.loadBudget(this.houseId);
          
          this.form.reset();
          this.closeModal();
          
          setTimeout(() => {
            this.router.navigate(['viewHouse', this.houseId]).then(() => {
              window.location.reload();
            });
          }, 5000);
        },
        error: (err) => {
          console.error("Failed to create inventory item", err);
        }
      });
    }
  }
  private async getAndUpdateBudget(overallPrice: number)
  {
    this.budgetApiService.getBudgetsByBuildingId(this.houseId).subscribe(
       (bulidingDetails: BuildingDetails[]) => {
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
          error: (err) => {
            console.error("Couldnt update budget", err);
          }
        });
      }
    )
  }
}
