import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getInventory(): Observable<any> 
  {
    return this.http.get(`${this.url}/inventory`);
  }

  addInventoryItem(name: string, buildingId: number, quantity: number, price: number): Observable<any>
  {
    const item = {
      name: name,
      buildingId: buildingId,
      quantity: quantity,
      price: price
    }
    return this.http.post(`${this.url}/inventory`, item);
  }

  getBuildings(): Observable<any>
  {
    return this.http.get(`${this.url}/buildings`);
  }

  getBudgets(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/budgets/${id}`);
  }

  getBuildingDetails(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/building/${id}/details`);
  }

  addTrustees(name: string, email: string, phone: string, apikey: string): Observable<any>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey
    }
    return this.http.post(`${this.url}/trustee`, item);
  }

  getAllTrustees(): Observable<any>
  {
    return this.http.get(`${this.url}/trustee`);
  }

  getTrusteesById(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/trustee/${id}`);
  }

  updateTrustee(trusteeId: string, name: string, email: string, phone: string, apikey: string): Observable<any>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey
    }
    return this.http.put(`${this.url}/trustee/${trusteeId}`, item);
  }

  // deleteTrustee(trusteeId: string): Observable<any>
  // {
  //   return this.http.delete(`${this.url}/trustee/${trusteeId}`);
  // }

  registerTrustee(name: string, email: string, phone: string, apikey: string): Observable<Trustee> {
    const item: Trustee = { name, email, phone, apikey };
    return this.http.post<Trustee>(`${this.url}/trustee`, item);
  }

  addContractor(name: string, email: string, phone: string, apikey: string, banned: boolean): Observable<any>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey,
      banned: banned
    }
    return this.http.post(`${this.url}/contractor`, item);
  }

  getAllContractors(): Observable<any>
  {
    return this.http.get(`${this.url}/contractor`);
  }
  getContractorById(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/contractor/${id}`);
  }

  getQuotes(): Observable<any>
  {
    return this.http.get(`${this.url}/quote`);
  }

  addQuote(task_id: number, contractor_id: number, amount: number, submitted_on: Date, type:string ): Observable<any>
  {
    const quote = {
      task_id: task_id,
      contractor_id: contractor_id,
      amount: amount,
      submitted_on: submitted_on,
      type: type
    }
    return this.http.post(`${this.url}/quote`, quote);
  }

  getQuoteById(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/quote/${id}`);
  }

  
}
