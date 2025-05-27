import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadEvent } from 'primeng/fileupload';
import { ApiService } from '../../services/api.service';

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
  template: `
    <div class="min-h-screen bg-white relative p-4">
      <!-- Top Right Icons -->
      <div class="absolute top-4 right-4 flex space-x-4">
        <img src="assets/icons/tools.svg" alt="Settings" class="w-8 h-8" />
        <img src="assets/icons/user.svg" alt="User" class="w-8 h-8" />
      </div>

      <!-- Logo + Title -->
      <div class="text-center mb-6">
        <img src="assets/images/logo.png" alt="Logo" class="mx-auto w-16" />
        <h1 class="text-2xl font-bold text-black">Create Quotation</h1>
        <div class="h-1 w-32 bg-yellow-400 mx-auto mt-1 mb-4"></div>
      </div>

      <!-- Quotation Form -->
      <div class="border rounded-lg p-6 flex flex-col md:flex-row justify-between gap-4 shadow-sm">
        <!-- Left Side Inputs -->
        <div class="flex flex-col space-y-4 flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input pInputText placeholder="Contractor name" [(ngModel)]="quotation.contractorName" class="p-inputtext-sm w-full bg-white text-black" />
            <input pInputText placeholder="Address" [(ngModel)]="quotation.address" class="p-inputtext-sm w-full bg-white text-black" />
            <input pInputText placeholder="Profession" [(ngModel)]="quotation.profession" class="p-inputtext-sm w-full bg-white text-black" />
            <input pInputText placeholder="Email" [(ngModel)]="quotation.email" class="p-inputtext-sm w-full bg-white text-black" />
            <input pInputText placeholder="Phone Number" [(ngModel)]="quotation.phone" class="p-inputtext-sm w-full bg-white text-black" />
            <input pInputText placeholder="Quotation Amount" [(ngModel)]="quotation.amount" class="p-inputtext-sm w-full bg-white text-black" />
          </div>
        </div>

        <!-- Right Side Image Upload -->
        <div class="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-full md:w-72">
          <div class="border w-full h-40 bg-gray-50 flex items-center justify-center rounded">
            <img src="assets/icons/image.svg" alt="Placeholder" class="w-10 h-10" *ngIf="!previewUrl" />
            <img [src]="previewUrl" *ngIf="previewUrl" class="w-full h-full object-contain rounded" alt="Uploaded image" />
          </div>
          <button 
            pButton 
            type="button" 
            class="p-button mt-4 bg-yellow-400 text-black font-semibold shadow-md"
            (click)="submitQuotation()"
          > 
            Create Quotation
          </button>
        </div>
      </div>
    </div>
  `,
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
  constructor(private messageService: MessageService, private apiservice: ApiService) {}

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

    for (const contractor of response) {
      console.log(contractor?.name);
      if (
        contractor?.name &&
        contractor.name.toLowerCase() === nameToFind
      ) {
        console.log("Matching Contractor ID:", contractor.contractorId);
        found = true;
        this.apiservice.addQuote(101, contractor.contractorId, 10 ,new Date("2025-05-27"), "Mainteneance").subscribe((response2) => {
          console.log(response2);
        });
        console.log();
        alert('Quotation submitted:' + this.quotation);
      }
    }

    if (!found) {
      alert("No contractor found with the name:"+ nameToFind);
    }
  });

}

}
