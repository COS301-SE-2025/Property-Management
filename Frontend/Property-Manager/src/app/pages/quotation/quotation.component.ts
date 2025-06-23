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
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

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
    FileUpload
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

  onUpload(event: any) {
    console.log('Uploaded files:', event.files);
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Success', 
      detail: 'File Uploaded with Basic Mode' 
    });
  }
}
