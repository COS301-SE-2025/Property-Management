import { Component, input, OnInit } from '@angular/core';
import { DialogComponent } from '../../../components/dialog/dialog.component'
import { Toast } from "primeng/toast";
import { CommonModule } from '@angular/common';
import { DialogModule } from "primeng/dialog";
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { FileSelectEvent, FileUploadModule } from "primeng/fileupload";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BodyCoporate, BodyCoporateService, BuildingApiService, getCookieValue, ImageApiService, PropertyService } from 'shared';

@Component({
  selector: 'app-update-house-dialog',
  templateUrl: './update-house-dialog.component.html',
  styles: ``,
  imports: [Toast, DialogModule, SelectModule, FileUploadModule, CommonModule, ReactiveFormsModule],
  providers: [MessageService]
})
export class UpdateHouseDialogComponent extends DialogComponent implements OnInit {

  houseId = input.required<string>();
  selectedFile: File | null = null;
  form!: FormGroup;

  public bodyCorporates: BodyCoporate[] = [];
  public updateError = false;
  
  constructor(private messageService: MessageService, private fb: FormBuilder, private imageService: ImageApiService, private buildingService: BuildingApiService, private propertyService: PropertyService, private bodyCorporateService: BodyCoporateService) { 
    super();
  }

  ngOnInit() {
    this.bodyCorporates = [];

    //TODO Get the invites, filter by user, get bcId and then get name of bc
    const id = getCookieValue(document.cookie, "trusteeId");
    let corporateIds: string[] = [];
    this.propertyService.getInvitations().subscribe({
      next: (invite) => {
        invite.forEach((i) => {
          if(i.trusteeUuid === id && i.status === "ACCEPTED")
          {
            corporateIds.push(i.coporateUuid!);
          }
        });

        if(corporateIds.length > 0 || !corporateIds)
        {
          corporateIds.forEach((id) => {
            this.bodyCorporateService.getBodyCorporate(id).subscribe({
              next: (bc) => {
                this.bodyCorporates.push(bc);

                const curr = this.form.get('corporateUuid')?.value;
                if(curr === bc.corporateUuid)
                {
                  this.form.get('corporateUuid')?.setValue(bc.corporateUuid);
                }
              }
            })
          })
        }
      }
    });

    this.form = this.fb.group({
        name: ['', Validators.required],
        corporateUuid: [null]
    });
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
      const bcId = this.form.value.corporateUuid; 
  
      this.buildingService.updateBuilding(this.houseId(), name, imageId,  bcId).subscribe({
        next: () => {
          this.form.reset();
          this.closeDialog();
  
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Building successfully updated'
          });

          setTimeout(() => {
            window.location.reload();
          }, 150);
        },
        error: (err) => {
          console.error("Failed to update building", err);
          this.updateError = true;
        }
      });
    }
   }
}
