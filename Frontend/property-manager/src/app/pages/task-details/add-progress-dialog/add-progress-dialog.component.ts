import { Component } from "@angular/core";
import { DialogComponent } from "property-manager/src/app/components/dialog/dialog.component";
import { Toast } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-add-progress-dialog',
  templateUrl: './add-progress-dialog.component.html',
  styles: ``,
  imports: [Toast, DialogModule, ReactiveFormsModule],
})
export class AddProgressDialog extends DialogComponent{
    
     form!: FormGroup;
     selectedFile: File | null = null;
    
    constructor(private fb: FormBuilder){
      super();
      this.form = this.fb.group({
      
      });
    }

    onSubmit()
    {

    }
}