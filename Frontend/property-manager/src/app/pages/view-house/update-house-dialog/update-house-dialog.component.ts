import { Component, input, OnInit } from '@angular/core';
import { DialogComponent } from '../../../components/dialog/dialog.component'
import { Toast } from "primeng/toast";
import { CommonModule } from '@angular/common';
import { DialogModule } from "primeng/dialog";
import { MessageService } from 'primeng/api';
import { Select } from "primeng/select";
import { FileSelectEvent, FileUploadModule } from "primeng/fileupload";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BodyCoporate, BuildingApiService, getCookieValue, ImageApiService } from 'shared';

@Component({
  selector: 'app-update-house-dialog',
  templateUrl: './update-house-dialog.component.html',
  styles: ``,
  imports: [Toast, DialogModule, Select, FileUploadModule, CommonModule, ReactiveFormsModule],
  providers: [MessageService]
})
export class UpdateHouseDialogComponent extends DialogComponent implements OnInit {

  houseId = input.required<string>();
  selectedFile: File | null = null;
  form!: FormGroup;

  public bodyCorporates: BodyCoporate[] | undefined = undefined;
  public updateError = false;
  
  constructor(private messageService: MessageService,  private fb: FormBuilder, private imageService: ImageApiService, private buildingService: BuildingApiService) { 
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
        name: ['', Validators.required]
    });

    //Get body corporates trustee is in
  }
  onFileSelect(event: FileSelectEvent)
  {
    if(event.files && event.files.length > 0)
    {
        this.selectedFile = event.files[0];
    }
  }
  async onSubmit() {
    if(this.form.valid)
    {
      this.updateError = false;
  
      let imageId: string | undefined = "00000000-0000-0000-0000-000000000000";
  
      if(this.selectedFile)
      {
        try{
          const upload = await this.imageService.uploadImage(this.selectedFile).toPromise();
          if(upload?.imageId){
            imageId = upload?.imageId;
          }
        }
        catch(err)
        {
          console.error("Image upload failed", err);
  
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to upload image, please try again'
          });
        }
      }
  
      const name = this.form.value.name;
      const bcId = this.form.value.bodyCorporate;
  
      this.buildingService.updateBuilding(this.houseId(), name, imageId,  bcId).subscribe({
        next: (res) => {
          console.log(res);
  
          this.form.reset();
          this.closeDialog();
  
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Task added successfully'
          });
        },
        error: (err) => {
          console.error("Failed to create task", err);
          this.updateError = true;
        }
      });
    }
   }
}
