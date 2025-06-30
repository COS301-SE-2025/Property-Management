import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApiService } from '../../../../services/api/Task api/task-api.service';
import { getCookieValue } from '../../../../../utils/cookie-utils';

@Component({
  selector: 'app-timeline-add-dialog',
  imports: [ReactiveFormsModule, DialogModule, DatePickerModule, CommonModule, MultiSelectModule],
  templateUrl: './timeline-add-dialog.component.html',
  styles: ``
})
export class TimelineAddDialogComponent extends DialogComponent implements OnInit{
 form!: FormGroup;
 houseId = '';

//  public contractors = [];
 public addError = false;

 constructor(private fb: FormBuilder, private route : ActivatedRoute, private router: Router, private taskApiService: TaskApiService){
   super();
   this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }
 
 ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
 }

 override closeDialog(): void{
  super.closeDialog();
  this.form.reset();
  // this.contractors = [];
 }
 async onSubmit() {
  if(this.form.valid)
  {
    this.addError = false;
    console.log("Adding task");
    const cookie = document.cookie;
    const userId = getCookieValue(cookie, 'trusteeId');
    console.log(userId);

    const name = this.form.value.name;
    const des = this.form.value.description;
    const date = this.form.value.date;

    this.taskApiService.createTask(name, des, "pending", date, false, this.houseId, userId).subscribe({
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
