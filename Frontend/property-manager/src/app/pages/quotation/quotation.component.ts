import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUpload } from 'primeng/fileupload';
import { ApiService, getCookieValue } from 'shared'; 
import { ActivatedRoute } from '@angular/router';
import { DatePicker } from 'primeng/datepicker';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';


interface FileUploadEvent {
  files: File[];
}

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    ToastModule,
    FileUpload,
    DatePicker
  ],
  providers: [MessageService],
  templateUrl: `./quotation.component.html`,
  styles: ``,
   animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [ 
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})

export class QuotationComponent implements OnInit{
  IssueDate = '';
  expirationDate = '';
  quoteNo = '';
  totalAmount = '';

  contractorId = ''; 
  taskId = ''; 
  type = 'pending';

  constructor(
  private messageService: MessageService,
  private apiService: ApiService,
  private route: ActivatedRoute
) {
  const storedId = getCookieValue(document.cookie, 'contractorId');
  if (storedId) {
    this.contractorId = storedId;
  } else {
    console.warn('Contractor ID not found in cookie.');
  }
}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
    const id = params.get('taskId');
    if (id) {
      this.taskId = id;
    }
  });
  if (!this.taskId) {
    this.messageService.add({
      severity: 'warn',
      summary: 'No Task Provided',
      detail: 'Task UUID was not provided in the URL.'
    });
    return;
  }

  
  this.apiService.getMaintenanceTasks().subscribe({
    next: (tasks) => {
      const task = tasks.find(t => t.uuid === this.taskId && t['c_uuid'] === this.contractorId);
      if (!task) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Invalid Task',
          detail: 'Task not assigned to this contractor.'
        });
      }
    },
    error: (err) => {
      console.error('Error loading tasks:', err);
    }
  });
  }

  submitQuote() {
    if (!this.taskId || !this.IssueDate || !this.expirationDate || !this.quoteNo || !this.totalAmount) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields and ensure task is assigned.'
      });
      return;
    }
    const submittedDate = new Date();
    console.log(this.taskId);
    console.log(this.contractorId);

    this.apiService.addQuote(this.taskId,this.contractorId,submittedDate,this.type,Number(this.totalAmount),this.quoteNo).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Quote Created',
          detail: `Quote #${this.quoteNo} has been submitted.`
        });
        this.quoteNo = '';
        this.totalAmount = '';
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create quote.'
        });
      }
    });
  }
async onUpload(event: FileUploadEvent) {
  const file = event.files[0]; // Assuming single file upload
  if (!file) return;

  try {
    await this.apiService.uploadPDF(file, this.contractorId);

    this.messageService.add({
      severity: 'success',
      summary: 'Upload Complete',
      detail: `${file.name} uploaded successfully`
    });

  } catch (err) {
    console.error('PDF upload failed:', err);
    this.messageService.add({
      severity: 'error',
      summary: 'Upload Failed',
      detail: `Failed to upload ${file.name}`
    });
  }
}
}