import { Component, input, OnInit } from "@angular/core";
import { DialogComponent } from "property-manager/src/app/components/dialog/dialog.component";
import { Toast } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MultiSelectChangeEvent, MultiSelectModule } from "primeng/multiselect";
import { InventoryCardComponent } from "../../view-house/inventory-card/inventory-card.component";
import { Inventory, InventoryUsageApiService } from "shared";

@Component({
  selector: 'app-add-progress-dialog',
  templateUrl: './add-progress-dialog.component.html',
  styles: ``,
  imports: [Toast, DialogModule, ReactiveFormsModule, MultiSelectModule, InventoryCardComponent],
})
export class AddProgressDialog extends DialogComponent implements OnInit{
    
    form!: FormGroup;
    selectedFile: File | null = null;
    public taskId = input.required<string>();
    public inventoryItemsAvailable = input.required<Inventory[]>();
    public addError = false;
    
    constructor(private fb: FormBuilder, private inventoryService: InventoryUsageApiService){
      super();
      this.form = this.fb.group({
      
      });
    }

    ngOnInit()
    {
     
    }

    onSubmit()
    {

    }
}