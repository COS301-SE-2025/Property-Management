import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContractorDetails } from '../../../models/contractorDetails.model';
import { Observable } from 'rxjs';
import { AssignedContractor } from '../../../public-api';
import { environmentMobile } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ContractorApiService {

  // private url = '/api';
  private url = environmentMobile.apiUrl;
  constructor(private http: HttpClient) { }

  createContractor(name: string, contact_info: string, status: boolean, apikey: string, email: string, phone: string, address: string, city: string, postal_code: string, reg_number: string, des: string, service: string): Observable<ContractorDetails>
  {
    const req= {
      name: name,
      contact_info: contact_info,
      status: status,
      apikey: apikey, 
      email: email,
      phone: phone,  
      address: address,
      city: city,
      postal_code: postal_code,
      reg_number: reg_number,
      description: des,
      services: service
    };

    return this.http.post<ContractorDetails>(`${this.url}/contractor`, req,
    { withCredentials: true });
  }

  getAllContractors(): Observable<ContractorDetails[]>
  {
    return this.http.get<ContractorDetails[]>(`${this.url}/contractor`,
    { withCredentials: true });
  }

  getContractorById(contractorId: string): Observable<ContractorDetails>
  {
    return this.http.get<ContractorDetails>(`${this.url}/contractor/${contractorId}`,
    { withCredentials: true });
  }

  getAssignedContractor(taskId: string)
  {
    return this.http.get<AssignedContractor[]>(`${this.url}/maintenance/task/${taskId}/contractors`,
    { withCredentials: true });
  }
  getAverageRating(contractorId: string): Observable<number>{
    return this.http.get<number>(`${this.url}/rating/avg/${contractorId}`,
      { withCredentials: true });
  }
}
