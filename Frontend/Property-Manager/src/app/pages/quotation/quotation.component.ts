import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUpload } from 'primeng/fileupload';

import { HeaderComponent } from "../../components/header/header.component";

import { DatePicker } from 'primeng/datepicker';

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
  styles: [``],
})
export class QuotationComponent {
  IssueDate = '';
  expirationDate = '';
  quoteNo = '';
  totalAmount = '';

  constructor(private messageService: MessageService) {}

  onUpload(event: FileUploadEvent) {
    console.log('Uploaded files:', event.files);
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Success', 
      detail: 'File Uploaded with Basic Mode' 
    });
  }
}
