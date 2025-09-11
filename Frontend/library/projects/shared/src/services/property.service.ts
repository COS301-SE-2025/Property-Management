import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentMobile } from '../environment';

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
  private imageUploadUrl = `${environmentMobile.apiUrl}/images/upload`;

  constructor(private http: HttpClient) {}

  createProperty(data: CreateBuildingPayload): Observable<Building> {
    return this.http.post<Building>(`${this.apiUrl}`, data,
      { withCredentials: true }); 
  }

  uploadImage(file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageUploadResponse>(this.imageUploadUrl, formData,
      { withCredentials: true })
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
}