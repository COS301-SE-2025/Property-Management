import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from 'shared'; // Adjust import path as needed
import { ImageApiService } from 'shared'; // Adjust import path as needed

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: 'step-three.component.html',
  styles: [`
.profile-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 60vh;
  margin-top: -2rem;
  margin-bottom: -2rem;
  margin-left: 8rem;
  width: 150%;
}
.profile-card {
  background: #fff;
  border: 1.5px solid #bbb;
  border-radius: 12px;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  max-width: 600px;
  width: 100%;
  margin-top: 0rem;
  box-sizing: border-box;
}
.profile-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
.profile-textarea {
  width: 100%;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  padding: 1.25rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #444;
  background: #fafafa;
  resize: none;
  min-height: 120px;
}
.profile-upload-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.profile-upload-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1.5px solid #bbb;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  color: #888;
  background: #fff;
  width: 100%;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
.profile-upload-label:hover {
  background-color: rgba(216, 216, 216, 0.63);
}
.profile-upload-label.uploaded {
  border-color: #10b981;
  background-color: #f0fdf4;
  color: #059669;
}
.profile-upload-label.uploading {
  border-color: #3b82f6;
  background-color: #eff6ff;
  color: #2563eb;
}
.profile-upload-label.error {
  border-color: #ef4444;
  background-color: #fef2f2;
  color: #dc2626;
}
.profile-upload-icon {
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0.7;
}
.profile-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
}
.profile-btn-yellow {
  padding: 0.5rem 2rem;
  border-radius: 6px;
  background-color: #ffd74b;
  color: black;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  border: none;
  font-size: 1.1rem;
  transition: background 0.2s;
}
.profile-btn-yellow:hover {
  background-color: #facc15;
}
.profile-btn-yellow:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}
.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 0.5rem;
  background: #f9fafb;
}
.image-preview {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #d1d5db;
}
.image-count {
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.dark-theme .profile-card {
  background: transparent !important;
  border-color: #000 !important;
}
  
:host-context(.dark-theme) .profile-card {
  background: transparent !important;
  border-color: #000 !important;
}
  `]
})
export class StepThreeComponent implements OnDestroy {
  @Output() back = new EventEmitter<void>();
  @Output() done = new EventEmitter<{ description: string }>();

  description = '';

  // Upload states
  uploadStates = {
    projectRecords: { uploading: false, uploaded: false, error: false, fileName: '' },
    projectImages: { uploading: false, uploaded: false, error: false, fileCount: 0 }
  };

  // For image preview
  selectedImages: File[] = [];
  imagePreviewUrls: string[] = [];

  constructor(
    private apiService: ApiService,
    private imageApiService: ImageApiService
  ) {}

  async onProjectRecordsSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) return;

    // Validate file type (PDFs for project records)
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file only');
      input.value = '';
      return;
    }

    // Validate file size (max 20MB for project records)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      alert('File size must be less than 20MB');
      input.value = '';
      return;
    }

    // Reset state
    this.uploadStates.projectRecords = { 
      uploading: true, 
      uploaded: false, 
      error: false, 
      fileName: file.name 
    };

    try {
      // Get contractor UUID
      const contractorUuid = this.apiService.getCookieValue('contractorId');
      
      if (!contractorUuid) {
        throw new Error('Contractor UUID not found');
      }

      // Upload the file
      await this.apiService.uploadPDF(file, contractorUuid, 'projectRecords');
      
      // Success
      this.uploadStates.projectRecords = { 
        uploading: false, 
        uploaded: true, 
        error: false, 
        fileName: file.name 
      };
      
    } catch (error) {
      console.error('Error uploading project records:', error);
      this.uploadStates.projectRecords = { 
        uploading: false, 
        uploaded: false, 
        error: true, 
        fileName: file.name 
      };
    }

    // Clear the input
    input.value = '';
  }

  async onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
    if (!files || files.length === 0) return;

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = Array.from(files).filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      alert('Please select only image files (JPEG, PNG, GIF, WebP)');
      input.value = '';
      return;
    }

    // Validate file sizes (max 5MB per image)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = Array.from(files).filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      alert('Each image must be less than 5MB');
      input.value = '';
      return;
    }

    // Limit number of images (e.g., max 10)
    if (files.length > 10) {
      alert('You can upload a maximum of 10 images');
      input.value = '';
      return;
    }

    // Store selected images and create previews
    this.selectedImages = Array.from(files);
    this.createImagePreviews();

    // Set upload state
    this.uploadStates.projectImages = {
      uploading: true,
      uploaded: false,
      error: false,
      fileCount: files.length
    };

    try {
      // Upload each image using ImageApiService
      const uploadPromises = Array.from(files).map(file => this.uploadImage(file));
      await Promise.all(uploadPromises);
      
      // Success
      this.uploadStates.projectImages = {
        uploading: false,
        uploaded: true,
        error: false,
        fileCount: files.length
      };
      
    } catch (error) {
      console.error('Error uploading project images:', error);
      this.uploadStates.projectImages = {
        uploading: false,
        uploaded: false,
        error: true,
        fileCount: files.length
      };
    }

    // Clear the input
    input.value = '';
  }

  private async uploadImage(file: File): Promise<void> {
    try {
      // Using your existing ImageApiService
      const result = await this.imageApiService.uploadImage(file).toPromise();
      if (result && result.imageId) {
        console.log('Image uploaded successfully:', result.imageId);
      } else {
        console.log('Image uploaded, but no imageId returned:', result);
      }
    } catch (error) {
      console.error('Failed to upload image:', file.name, error);
      throw error;
    }
  }

  private createImagePreviews() {
    // Clear existing previews
    this.imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    this.imagePreviewUrls = [];

    // Create new previews
    this.selectedImages.forEach(file => {
      const url = URL.createObjectURL(file);
      this.imagePreviewUrls.push(url);
    });
  }

  getProjectRecordsStatusText(): string {
    const state = this.uploadStates.projectRecords;
    
    if (state.uploading) return 'Uploading...';
    if (state.uploaded) return `✓ ${state.fileName}`;
    if (state.error) return `✗ Upload failed: ${state.fileName}`;
    
    return 'Attach Project Records';
  }

  getProjectImagesStatusText(): string {
    const state = this.uploadStates.projectImages;
    
    if (state.uploading) return `Uploading ${state.fileCount} images...`;
    if (state.uploaded) return `✓ ${state.fileCount} images uploaded`;
    if (state.error) return `✗ Upload failed (${state.fileCount} images)`;
    
    return 'Attach Project Images';
  }

  getUploadLabelClass(type: 'projectRecords' | 'projectImages'): string {
    const state = this.uploadStates[type];
    let classes = 'profile-upload-label';
    
    if (state.uploading) classes += ' uploading';
    else if (state.uploaded) classes += ' uploaded';
    else if (state.error) classes += ' error';
    
    return classes;
  }

  isUploading(): boolean {
    return Object.values(this.uploadStates).some(state => state.uploading);
  }

  emitRelevantData() {
    if (this.description.trim().length === 0) {
      alert('Please provide a description of your project history');
      return;
    }

    // Check if any uploads are still in progress
    if (this.isUploading()) {
      alert('Please wait for file uploads to complete');
      return;
    }

    this.done.emit({ description: this.description });
  }

  ngOnDestroy() {
    // Clean up image preview URLs to prevent memory leaks
    this.imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
  }
}