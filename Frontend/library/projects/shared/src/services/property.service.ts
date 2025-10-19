import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environmentMobile } from '../environment';
import { ImageApiService } from './api/Image api/image-api.service'; // Import your image service

export interface CreateBuildingPayload {
  name: string;
  address: string;
  type: string;
  propertyValue: number;
  latestInspectionDate?: string;
  trusteeUuid?: string;
  propertyImageId?: string | null;
  coporateUuid?: string | null; 
  bodyCorporate?: string | null; 
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

export interface InviteWithTrustee {
  inviteUuid: string;
  status: string;
  invitedOn: string;
  trusteeUuid: string;
  name: string;
  email: string;
  role: string;
  coporateUuid?: string;
}

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private inviteApiUrl = environmentMobile.apiUrl;
  private apiUrl = `${environmentMobile.apiUrl}/buildings`;

  constructor(
    private http: HttpClient,
    private imageService: ImageApiService // Inject image service
  ) {}

  createProperty(data: CreateBuildingPayload): Observable<Building> {
    return this.http.post<Building>(`${this.apiUrl}`, data,
      { withCredentials: true }); 
  }

  uploadImage(
    file: File, 
    user_uuid?: string, 
    task_uuid?: string, 
    progress_uuid?: string, 
    building_uuid?: string
  ): Observable<string> {
    // Call the new uploadImages method and return the first image ID
    return from(
      this.imageService.uploadImages([file], user_uuid, task_uuid, progress_uuid, building_uuid)
    ).pipe(
      map(imageIds => imageIds[0])
    );
  }

  // Optional: Add method for multiple images
  uploadMultipleImages(
    files: File[], 
    user_uuid?: string, 
    task_uuid?: string, 
    progress_uuid?: string, 
    building_uuid?: string
  ): Observable<string[]> {
    return from(
      this.imageService.uploadImages(files, user_uuid, task_uuid, progress_uuid, building_uuid)
    );
  }

  getInvitesForBodyCorporate(coporateUuid: string): Observable<InviteWithTrustee[]> {
    return this.http.get<InviteWithTrustee[]>(`${this.inviteApiUrl}/invites/body-corporate/${coporateUuid}`,
      { withCredentials: true });
  }

  
  getInvitations(): Observable<InviteWithTrustee[]> {
    return this.http.get<InviteWithTrustee[]>(`${this.inviteApiUrl}/invites`,
      { withCredentials: true })
  }

  cancelInvite(inviteUuid: string): Observable<any> {
    return this.http.delete(`${this.inviteApiUrl}/invites/${inviteUuid}`,
      { withCredentials: true })
  }

  revokeInvite(inviteUuid: string): Observable<any> {
    return this.http.put(`${this.inviteApiUrl}/invites/${inviteUuid}/status?status=Revoked`, {},
      { withCredentials: true })
  }

  updateInviteStatus(inviteUuid: string, status: string): Observable<any> {
    return this.http.put(`${this.inviteApiUrl}/invites/${inviteUuid}/status?status=${status}`, {},
      { withCredentials: true })
  }

  getBodyCorporatesForTrustee(trusteeUuid: string) {
    return this.http.get<any[]>(`${this.inviteApiUrl}/invites/trustee/${trusteeUuid}`,
      { withCredentials: true })
  }

  getBodyCorporateByUuid(coporateUuid: string) {
    return this.http.get<any>(`${this.inviteApiUrl}/body-corporates/${coporateUuid}`,
      { withCredentials: true })
  }

  sendInvite(payload: { trusteeUuid: string; coporateUuid: string }) {
    return this.http.post(`${this.inviteApiUrl}/invites`, payload,
      { withCredentials: true })
  }

  getTrusteesInBodyCorporate(bcId: string)
  {
    return this.http.get<InviteWithTrustee[]>(`${this.inviteApiUrl}/invites/body-corporate/${bcId}/accepted-trustees`, { withCredentials: true });
  }
}