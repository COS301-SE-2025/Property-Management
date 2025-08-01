import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'shared';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from "src/app/components/tab/tab.component";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { addIcons } from 'ionicons';
import { calendarOutline,newspaperOutline,walletOutline,cloudUploadOutline } from 'ionicons/icons';



@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule,HeaderComponent, TabComponent],
  providers: [MessageService],
  templateUrl: './quotation.component.html',
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
export class QuotationComponent  {
  private api = inject(ApiService);
  IssueDate: Date = new Date();
  expirationDate: string="";
  quoteNo: string="";
  totalAmount: number=0;
  file: File | null = null;
  filePreviewUrl: string | null = null;
  isImage: boolean = false;
showIssueDate = false;
showExpirationDate = false;
  // UI states
  toastOpen = false;
  toastMsg = '';
  toastColor: 'success' | 'danger' = 'success';
  loading = false;
  previewOpen = false;
   contractorId: string = "";
  

  ngOnInit() {
  addIcons({
    'calendar-outline': calendarOutline,
    'newspaper-outline': newspaperOutline,
    'wallet-outline': walletOutline,
    'cloud-upload-outline': cloudUploadOutline
   
  });
   this.contractorId = this.api.getCookieValue('contractorId');
  console.log('Contractor ID:', this.contractorId);
}
  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreviewUrl = reader.result as string;
      this.isImage = file.type.startsWith('image');
    };
    reader.readAsDataURL(file);
  }
}



  openPreviewModal() {
    this.previewOpen = true;
  }

  closePreviewModal() {
    this.previewOpen = false;
  }

  async submitQuote() {
    if (!this.file || !this.IssueDate || !this.expirationDate || !this.quoteNo || !this.totalAmount) {
      this.showToast('Please fill in all fields and upload a file.', 'danger');
      return;
    }

    try {
      this.loading = true;

      // Simulate upload
      this.api.addQuote(
        'some-t_uuid', // Replace with actual t_uuid 
        this.contractorId, 
        this.IssueDate,
        this.expirationDate,
        this.totalAmount,
        this.quoteNo)
       
      
      this.showToast('Quotation submitted successfully!', 'success');
    } catch (err) {
      this.showToast('Error submitting quotation.', 'danger');
    } finally {
      this.loading = false;
    }
  }

  showToast(message: string, color: 'success' | 'danger') {
    this.toastMsg = message;
    this.toastColor = color;
    this.toastOpen = true;
  }
}
