import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogComponent } from '../../../../components/dialog/dialog.component';

@Component({
  selector: 'app-timeline-add-dialog',
  imports: [ReactiveFormsModule, DialogModule, FloatLabelModule, DatePickerModule, CommonModule, MultiSelectModule],
  templateUrl: './timeline-add-dialog.component.html',
  styles: ``
})
export class TimelineAddDialogComponent extends DialogComponent implements OnInit{
 form!: FormGroup;

 public name = '';
 public description = '';
 public date = new Date();
 public contractorName = '';
 public contractors = [];
 public addError = false;

 constructor(private fb: FormBuilder){ super() }
 
 ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      contractorName: ['', Validators.required],
      date: [''],
    });
 }

 override closeDialog(): void{
  super.closeDialog();
  this.form.reset();
  this.contractors = [];
 }
 onSubmit(): void {
  //TOOO: Implement logic
  if(this.form.valid)
  {
    console.log("Task added");
    this.closeDialog();
  }
 }
}
