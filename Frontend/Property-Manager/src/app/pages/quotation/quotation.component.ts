import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUpload } from 'primeng/fileupload';
import { ApiService } from '../../services/api.service'; 
import { HeaderComponent } from "../../components/header/header.component";

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
    HeaderComponent,
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

export class QuotationComponent {
  IssueDate = '';
  expirationDate = '';
  quoteNo = '';
  totalAmount = '';

  contractorId: string = ''; 
  taskId: string = ''; 
  type: string = 'Started';

  constructor(
  private messageService: MessageService,
  private apiService: ApiService
) {
  const storedId = localStorage.getItem('contractorID');
  if (storedId) {
    this.contractorId = storedId;
  } else {
    console.warn('Contractor ID not found in localStorage.');
  }
}

  ngOnInit(): void {
    this.apiService.getMaintenanceTasks().subscribe({
      next: (tasks) => {
        const task = tasks.find(t => t.c_uuid === this.contractorId);
        if (task) {
          this.taskId = task.uuid;
          console.log('Matching task found:', task);
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'No Task Found',
            detail: 'No maintenance task assigned to this contractor.'
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

    this.apiService.addQuote(
      this.taskId,
      this.contractorId,
      submittedDate,
      this.type,
      Number(this.totalAmount),
      this.quoteNo
    ).subscribe({
      next: (res) => {
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

  onUpload(event: FileUploadEvent) {
    console.log('Uploaded files:', event.files);
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode'
    });
  }
}
