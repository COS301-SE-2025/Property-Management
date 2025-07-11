import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';
// import { Building } from '../models/building.model';
import { Budget } from '../models/budget.model';
import { Contractor } from '../models/contractor.model';
import { Quote } from '../models/quote.model';
import { BuildingDetails } from '../models/buildingDetails.model';
import { MaintenanceTask } from '../models/maintenanceTask.model';

export interface Trustee {
  trustee_id?: number;
  name: string;
  email: string;
  phone: string;
  apikey: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = '/api';
  constructor(private http: HttpClient) { }

  getInventory(): Observable<Inventory[]> 
  {
    return this.http.get<Inventory[]>(`${this.url}/inventory`);
  }

  addInventoryItem(name: string, buildingId: number, quantity: number, price: number): Observable<Inventory>
  {
    const item = {
      name: name,
      buildingId: buildingId,
      quantity: quantity,
      price: price
    }
    return this.http.post<Inventory>(`${this.url}/inventory`, item);
  }

  // getBuildings(): Observable<Building[]>
  // {
  //   return this.http.get<Building[]>(`${this.url}/buildings`);
  // }

  getBudgets(id: number): Observable<Budget[]>
  {
    return this.http.get<Budget[]>(`${this.url}/budgets/${id}`);
  }

  getBuildingDetails(id: number): Observable<BuildingDetails>
  {
    return this.http.get<BuildingDetails>(`${this.url}/building/${id}/details`);
  }

  addTrustees(name: string, email: string, phone: string, apikey: string): Observable<Trustee>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey
    }
    return this.http.post<Trustee>(`${this.url}/trustee`, item);
  }

  getAllTrustees(): Observable<Trustee[]>
  {
    return this.http.get<Trustee[]>(`${this.url}/trustee`);
  }

  getTrusteesById(id: number): Observable<Trustee>
  {
    return this.http.get<Trustee>(`${this.url}/trustee/${id}`);
  }

  updateTrustee(trusteeId: string, name: string, email: string, phone: string, apikey: string): Observable<Trustee>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey
    }
    return this.http.put<Trustee>(`${this.url}/trustee/${trusteeId}`, item);
  }

  // deleteTrustee(trusteeId: string): Observable<any>
  // {
  //   return this.http.delete(`${this.url}/trustee/${trusteeId}`);
  // }

  registerTrustee(name: string, email: string, phone: string, apikey: string): Observable<Trustee> {
    const item: Trustee = { name, email, phone, apikey };
    return this.http.post<Trustee>(`${this.url}/trustee`, item);
  }

  addContractor(name: string, email: string, phone: string, apikey: string, banned: boolean): Observable<Contractor>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey,
      banned: banned
    }
    return this.http.post<Contractor>(`${this.url}/contractor`, item);
  }

  getAllContractors(): Observable<Contractor[]>
  {
    return this.http.get<Contractor[]>(`${this.url}/contractor`);
  }
  getContractorById(id: number): Observable<Contractor>
  {
    return this.http.get<Contractor>(`${this.url}/contractor/${id}`);
  }

  getQuotes(): Observable<Quote[]>
  {
    return this.http.get<Quote[]>(`${this.url}/quote`);
  }

  addQuote(
  t_uuid: string,
  c_uuid: string,
  submitted_on: Date,
  status: string,
  amount: number,
  doc: string
): Observable<Quote> {
  const quote = {
    t_uuid,
    c_uuid,
    submitted_on: submitted_on.toISOString(), // ensure ISO string format
    status,
    amount,
    doc
  };
  return this.http.post<Quote>(`${this.url}/quote`, quote);
}


  getQuoteById(id: number): Observable<Quote>
  {
    return this.http.get<Quote>(`${this.url}/quote/${id}`);
  }  

  getMaintenanceTasks(): Observable<MaintenanceTask[]> {
    return this.http.get<MaintenanceTask[]>(`${this.url}/maintenance`);
  }

  getPresignedImageUrl(uuid: string): Observable<string> {
    return this.http.get(`${this.url}/images/presigned/${uuid}`, {
      responseType: 'text'
    });
  }
}