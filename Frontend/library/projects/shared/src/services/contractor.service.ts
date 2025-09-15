import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contractor } from '../models/contractor.model';
import { environmentMobile } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  // private apiUrl = 'http://localhost:8080/api/contractor';
  private apiUrl = `${environmentMobile.apiUrl}/contractor`;

  constructor(private http: HttpClient) {}

  addContractor(contractor: Omit<Contractor, 'contractorId'>): Observable<Contractor> {
    return this.http.post<Contractor>(this.apiUrl, contractor,
    { withCredentials: true });
  }

  getAllContractors(): Observable<Contractor[]> {
    console.log('GET', this.apiUrl);
    return this.http.get<Contractor[]>(this.apiUrl,
    { withCredentials: true });
  }

  getContractorById(id: number | string): Observable<Contractor> {
    return this.http.get<Contractor>(`${this.apiUrl}/${id}`,
    { withCredentials: true });;
  }

  updateContractor(uuid: string, contractor: Partial<Contractor>): Observable<Contractor> {
    return this.http.put<Contractor>(`${this.apiUrl}/${uuid}`, contractor,
    { withCredentials: true });
  }

  deleteContractor(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`,
    { withCredentials: true });
  }
}