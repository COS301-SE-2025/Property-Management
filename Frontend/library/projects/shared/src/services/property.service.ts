import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentMobile } from '../environment';

export interface CreateBuildingPayload {
  name: string;
  address: string;
  type: string;
  propertyValue: number;
  // primaryContractor: string;
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
  // private apiUrl = 'http://localhost:8080/api/buildings';
  private apiUrl = `${environmentMobile.apiUrl}/buildings`;
  // private imageUploadUrl = 'http://localhost:8080/api/images/upload';
  private imageUploadUrl = `${this.apiUrl}/images/upload`;

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

  getInvitations(): Observable<InviteWithTrustee[]> {
    return this.http.get<InviteWithTrustee[]>('/api/invites');
  }

  cancelInvite(inviteUuid: string): Observable<any> {
    return this.http.delete(`/api/invites/${inviteUuid}`);
  }

  revokeInvite(inviteUuid: string): Observable<any> {
    return this.http.put(`/api/invites/${inviteUuid}/status?status=Revoked`, {});
  }

  updateInviteStatus(inviteUuid: string, status: string): Observable<any> {
    return this.http.put(`/api/invites/${inviteUuid}/status?status=${status}`, {});
  }

  getBodyCorporatesForTrustee(trusteeUuid: string) {
    return this.http.get<any[]>(`/api/invites/trustee/${trusteeUuid}`);
  }

  getBodyCorporateByUuid(coporateUuid: string) {
    return this.http.get<any>(`/api/body-corporates/${coporateUuid}`);
  }

  sendInvite(payload: { trusteeUuid: string; coporateUuid: string }) {
    return this.http.post('/api/invites', payload);
  }
}