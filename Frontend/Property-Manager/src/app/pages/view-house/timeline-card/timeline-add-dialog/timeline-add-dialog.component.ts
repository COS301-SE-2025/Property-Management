import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadModule, FileSelectEvent } from 'primeng/fileupload';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApiService } from 'shared';
import { getCookieValue } from 'shared';
import { ImageApiService } from 'shared';
import { ContractorApiService } from 'shared';
import { ContractorDetails } from 'shared';

@Component({
  selector: 'app-timeline-add-dialog',
  imports: [ReactiveFormsModule, DialogModule, DatePickerModule, CommonModule, MultiSelectModule, FileUploadModule, ToastModule],
  templateUrl: './timeline-add-dialog.component.html',
  styles: ``,
  providers: [MessageService]
})
export class TimelineAddDialogComponent extends DialogComponent implements OnInit{
 form!: FormGroup;
 houseId = '';
 selectedFile: File | null = null;

 public contractors: ContractorDetails[] | undefined = undefined;
 public addError = false;

 constructor(
  private fb: FormBuilder, 
  private route : ActivatedRoute, 
  private router: Router, 
  private taskApiService: TaskApiService, 
  private imageService: ImageApiService, 
  private contractorService: ContractorApiService,
  private messageService: MessageService
){
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
    this.addError = false;

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

    const cookie = document.cookie;
    const userId = getCookieValue(cookie, 'trusteeId');

    const name = this.form.value.name;
    const des = this.form.value.description;
    const date = this.form.value.date;
    const contractorId = this.form.value.contractorName[0];

    console.log(imageId);

    this.taskApiService.createTask(name, des, "pending", date, false, this.houseId, userId, imageId, contractorId).subscribe({
      next: () => {
        this.form.reset();
        this.closeDialog();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task added successfully'
        });

        setTimeout(() => {
          this.router.navigate(['viewHouse', this.houseId]).then(() => {
            window.location.reload();
          });
        }, 3000);
      },
      error: (err) => {
        console.error("Failed to create task", err);
        this.addError = true;
      }
    });
  }
 }
}
