import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-add-dialog',
  imports: [DialogModule, FloatLabelModule, CommonModule, ReactiveFormsModule, DatePickerModule],
  templateUrl: './inventory-add-dialog.component.html',
  styles: ``
})
export class InventoryAddDialogComponent  implements OnInit{

  form!: FormGroup;
  displayDialog: boolean = false;

  public name = '';
  public price = 0;
  public quantity = 0;
  public boughtOn = new Date();
  public addError = false;


  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
      this.form = this.fb.group({
        name: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        quantity: ['', [Validators.required, Validators.min(1)]],
        boughtOn: ['']
      });
  }
  
  addInventoryItem(): void {
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.form.reset();
  }
  onSubmit(): void{
    //TODO: Implement the logic to add an inventory item
    if(this.form.valid){
      console.log("Inventory item added");
      this.closeDialog();
    }
  }
}
