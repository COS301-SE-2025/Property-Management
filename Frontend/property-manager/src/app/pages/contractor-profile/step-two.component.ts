import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'shared'; 
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: 'step-two.component.html',
  styles: [`
.form-container {
  border: 2px solid #ccc;
  border-radius: 12px;
  background: #fff;
  padding: 2.5rem 12.5rem 2rem 2.5rem;
  margin: 40px auto;
  box-sizing: border-box;
  margin-top: -2rem;
  margin-bottom: -2rem;
  margin-left: 6rem;
  width: 170%;
}
.input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 150%;
  font-size: 1rem;
  color: #888;
  font-weight: 500;
}
.input::placeholder { color: #888; }
.file-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  color: #888;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  background: #fff;
  width: 150%;
  margin-left: 7rem;
}
.file-label:hover { background-color:rgba(216, 216, 216, 0.63); }
.file-label.uploaded {
  border-color: #10b981;
  background-color: #f0fdf4;
  color: #059669;
}
.file-label.uploading {
  border-color: #3b82f6;
  background-color: #eff6ff;
  color: #2563eb;
}
.file-label.error {
  border-color: #ef4444;
  background-color: #fef2f2;
  color: #dc2626;
}
.btn-yellow {
  padding: 0.5rem 2rem;
  border-radius: 6px;
  background-color: #ffd74b;
  color: black;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: background 0.2s;
}
.btn-yellow:hover { background-color: #facc15; }
.btn-yellow:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

:host-context(.dark-theme) .form-container {
  background: transparent !important;
  border-color: #000 !important;
}
  `]
})
export class StepTwoComponent {
  @Output() next = new EventEmitter<{
    reg_number: string;
    descriptionSkills: string;
    services: string;
  }>();
  @Output() back = new EventEmitter<void>();

  form: FormGroup;
  
  // File upload state
  uploadStates = {
    certifications: { uploading: false, uploaded: false, error: false, fileName: '' },
    licenses: { uploading: false, uploaded: false, error: false, fileName: '' },
    ids: { uploading: false, uploaded: false, error: false, fileName: '' }
  };

  constructor(private fb: FormBuilder, private apiService: ApiService, private messageService: MessageService) {
    this.form = this.fb.group({
      reg_number: ['', Validators.required],
      descriptionSkills: ['', Validators.required],
      services: ['', Validators.required]
    });
  }

  async onFileSelected(event: Event, type: 'certifications' | 'licenses' | 'ids') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a PDF file only'
      })
      input.value = '';
      return;
    }

    // Validate file size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'File size must be less than 10MB'
      })
      input.value = '';
      return;
    }

    // Reset state
    this.uploadStates[type] = { 
      uploading: true, 
      uploaded: false, 
      error: false, 
      fileName: file.name 
    };

    try {
      // Get contractor UUID from cookie or wherever it's stored
      const contractorUuid = this.apiService.getCookieValue('contractorId');
      
      if (!contractorUuid) {
        throw new Error('Contractor UUID not found');
      }

      // Upload the file
      await this.apiService.uploadPDF(file, contractorUuid, type, "");
      
      // Success
      this.uploadStates[type] = { 
        uploading: false, 
        uploaded: true, 
        error: false, 
        fileName: file.name 
      };
      
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      this.uploadStates[type] = { 
        uploading: false, 
        uploaded: false, 
        error: true, 
        fileName: file.name 
      };
    }

    // Clear the input so the same file can be selected again if needed
    input.value = '';
  }

  getFileStatusText(type: 'certifications' | 'licenses' | 'ids'): string {
    const state = this.uploadStates[type];
    
    if (state.uploading) return 'Uploading...';
    if (state.uploaded) return `✓ ${state.fileName}`;
    if (state.error) return `✗ Upload failed: ${state.fileName}`;
    
    switch (type) {
      case 'certifications': return 'Attach Certifications';
      case 'licenses': return 'Attach Licenses'; 
      case 'ids': return 'Attach ID';
      default: return 'Attach Document';
    }
  }

  getFileLabelClass(type: 'certifications' | 'licenses' | 'ids'): string {
    const state = this.uploadStates[type];
    let classes = 'file-label';
    
    if (state.uploading) classes += ' uploading';
    else if (state.uploaded) classes += ' uploaded';
    else if (state.error) classes += ' error';
    
    return classes;
  }

  isUploading(): boolean {
    return Object.values(this.uploadStates).some(state => state.uploading);
  }

  emitRelevantData() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    // Check if any uploads are still in progress
    if (this.isUploading()) {
      this.messageService.add({
        severity: 'warning',
        summary: 'Warning',
        detail: 'Please wait for file uploads to complete'
      })
      return;
    }

    this.next.emit({
      reg_number: this.form.value.reg_number,
      descriptionSkills: this.form.value.descriptionSkills,
      services: this.form.value.services
    });
  }
}