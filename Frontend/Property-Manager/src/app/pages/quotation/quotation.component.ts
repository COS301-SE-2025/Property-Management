import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadEvent } from 'primeng/fileupload';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: `./quotation.component.html`,
  styles: [``],
})
export class QuotationComponent {
  quotation = {
    contractorName: '',
    address: '',
    profession: '',
    email: '',
    phone: '',
    amount: ''
  };
  previewUrl: string | null = null;
  constructor(private messageService: MessageService, private apiservice: ApiService, private router: Router) {}

    onUpload(event: FileUploadEvent) {
  const file = event.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewUrl = e.target && e.target.result ? e.target.result as string : null;
    };
    reader.readAsDataURL(file);
  }

  this.messageService.add({
    severity: 'info',
    summary: 'Success',
    detail: 'File Uploaded with Basic Mode'
  });
}

  submitQuotation() {
    this.apiservice.getAllContractors().subscribe((response) => {
    const nameToFind = this.quotation.contractorName.toLowerCase();
    let found = false;
    const cleaned = this.quotation.amount.replace(/[^0-9.-]+/g, "");

    for (const contractor of response) {
      console.log(contractor?.name);
      if (
        contractor?.name &&
        contractor.name.toLowerCase() === nameToFind
      ) {
        console.log("Matching Contractor ID:", contractor.contractorId);
        found = true;
        this.apiservice.addQuote(101, contractor.contractorId, Number(cleaned) ,new Date("2025-05-27"), "Mainteneance").subscribe((response2) => {
            alert('Your Quote was sucessfuly sent, ID:' + response2.quote_id);
        });
        console.log();
        alert('Your Quote was sucessfuly sent');
        this.router.navigate(['/contractorHome'])
      }
    }

    if (!found) {
      alert("No contractor found with the name:"+ nameToFind);
    }
  });

}

}
