import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Property } from '../models/property.model';


export interface CreateBuildingPayload {
  name: string;
  address: string;
  type: string;
  propertyValue: number;
  primaryContractor: string;
  latestInspectionDate: string;
  trusteeUuid: string;
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
  latestInspectionDate: string;
  propertyImage: string | null;
  area: number;
  buildingUuid?: string;
  trusteeUuid: string;
  coporateUuid?: string | null;
}

export interface ImageUploadResponse {
  imageKey: string;
}

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private apiUrl = 'http://localhost:8080/api/buildings';
  private imageUploadUrl = 'http://localhost:8080/api/images/upload';

  constructor(private http: HttpClient) {}

  createProperty(data: CreateBuildingPayload): Observable<Building> {
    console.log('POST', this.apiUrl, 'Payload:', data);
    return this.http.post<Building>(this.apiUrl, data); 
  }

  uploadImage(file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageUploadResponse>(this.imageUploadUrl, formData);
  }
}