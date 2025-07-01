import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApiService } from '../../../../services/api/Task api/task-api.service';
import { getCookieValue } from '../../../../../utils/cookie-utils';
import { ImageApiService } from '../../../../services/api/Image api/image-api.service';
import { ContractorApiService } from '../../../../services/api/Contractor api/contractor-api.service';
import { ContractorDetails } from '../../../../models/contractorDetails.model';

@Component({
  selector: 'app-timeline-add-dialog',
  imports: [ReactiveFormsModule, DialogModule, DatePickerModule, CommonModule, MultiSelectModule, FileUploadModule],
  templateUrl: './timeline-add-dialog.component.html',
  styles: ``
})
export class TimelineAddDialogComponent extends DialogComponent implements OnInit{
 form!: FormGroup;
 houseId = '';
 selectedFile: File | null = null;

 public contractors: ContractorDetails[] | undefined = undefined;
 public addError = false;

 constructor(private fb: FormBuilder, private route : ActivatedRoute, private router: Router, private taskApiService: TaskApiService, private imageService: ImageApiService, private contractorService: ContractorApiService){
   super();
   this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }
 
 async ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      contractorName: ['', Validators.required],
    });

    //Get contractors
    this.contractors = await this.contractorService.getAllContractors().toPromise();
 }

 override closeDialog(): void{
  super.closeDialog();
  this.form.reset();
  // this.contractors = [];
 }
 onFileSelect(event: any)
 {
  if(event.files && event.files.length > 0)
  {
    this.selectedFile = event.files[0];
  }
 }
 async onSubmit() {
  if(this.form.valid)
  {
    this.addError = false;
    console.log("Adding task");

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
      }
    }

    const cookie = document.cookie;
    const userId = getCookieValue(cookie, 'trusteeId');

    const name = this.form.value.name;
    const des = this.form.value.description;
    const date = this.form.value.date;
    const contractorId = this.form.value.contractorName[0];

    console.log(contractorId);

    this.taskApiService.createTask(name, des, "pending", date, false, this.houseId, userId, imageId, contractorId).subscribe({
      next: (response) => {
        console.log(response);
        this.form.reset();
        this.closeDialog();
        this.router.navigate(['viewHouse', this.houseId]).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error("Failed to create task", err);
        this.addError = true;
      }
    });
  }
 }
}
