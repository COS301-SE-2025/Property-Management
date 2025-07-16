import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contractor } from '../../models/contractor.model';

@Injectable({ providedIn: 'root' })
export class ContractorService {
  private apiUrl = 'http://localhost:8080/api/contractor';

  constructor(private http: HttpClient) {}

  addContractor(contractor: Omit<Contractor, 'contractorId'>): Observable<Contractor> {
    return this.http.post<Contractor>(this.apiUrl, contractor);
  }

  getAllContractors(): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(this.apiUrl);
  }

  getContractorById(id: number | string): Observable<Contractor> {
    return this.http.get<Contractor>(`${this.apiUrl}/${id}`);
  }

  updateContractor(uuid: string, contractor: Partial<Contractor>): Observable<Contractor> {
    return this.http.put<Contractor>(`${this.apiUrl}/${uuid}`, contractor);
  }

  deleteContractor(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${uuid}`);
  }
}