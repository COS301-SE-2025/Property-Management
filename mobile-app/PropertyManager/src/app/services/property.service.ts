import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateBuildingPayload {
  name: string;
  address: string;
  type: string;
  propertyValue: number;
  primaryContractor: string;
  latestInspectionDate?: string;
  trusteeUuid?: string;
  propertyImageId?: string | null;
  coporateUuid?: string | null;
  area: number;
}

export interface Building {
  name: string;
  address: string;
  type: string;
  propertyValue: number;
  primaryContractor: string;
  latestInspectionDate?: string;
  propertyImage?: string | null;
  area: number;
  buildingUuid?: string;
  trusteeUuid?: string;
  coporateUuid?: string | null;
}

export interface ImageUploadResponse {
  imageKey: string;
}

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/buildings';
  private imageUploadUrl = 'http://localhost:8080/api/images/upload';

  createProperty(data: CreateBuildingPayload): Observable<Building> {
    return this.http.post<Building>(this.apiUrl, data); 
  }

  uploadImage(file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageUploadResponse>(this.imageUploadUrl, formData);
  }
}