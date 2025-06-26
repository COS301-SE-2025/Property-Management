import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { HousesService } from '../../../../services/houses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItemApiService } from '../../../../services/api/InventoryItem api/inventory-item-api.service';
import { response } from 'express';

@Component({
  selector: 'app-inventory-add-dialog',
  imports: [DialogModule, CommonModule, ReactiveFormsModule, DatePickerModule],
  templateUrl: './inventory-add-dialog.component.html',
  styles: ``
})
export class InventoryAddDialogComponent extends DialogComponent implements OnInit{

  form!: FormGroup;
  houseId = '';

  public boughtOn = new Date();
  public addError = false;


  constructor(private fb: FormBuilder, private inventoryItemApiService: InventoryItemApiService, private route: ActivatedRoute, private router: Router){ 
    super() ;
    this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }

  ngOnInit(): void {
      this.form = this.fb.group({
        name: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        quantity: ['', [Validators.required, Validators.min(1)]],
        boughtOn: ['']
      });
  }
  
  override closeDialog(): void {
    super.closeDialog();
    this.form.reset();
  }
 async onSubmit(){

    if(this.form.valid){
      console.log("Inventory item being added...");
      const name = this.form.value.name;
      // const price = this.form.value.price;
      const quantity = this.form.value.quantity;

      this.inventoryItemApiService.addInventoryItem(name, "unit 1", quantity, this.houseId).subscribe({
        next: (response) => {
          console.log(response);
          this.form.reset();
          this.closeDialog();
          this.router.navigate(['viewHouse', this.houseId]).then(() => {
            window.location.reload();
          });
        },
        error: (err) => {
          console.error("Failed to create inventory item", err);
        }
      });
    }
  }
}
