import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.get(`${this.url}/buildings/${id}/details`);
  }

  addTrustees(name: string, email: string, phone: string, apikey: string): Observable<any>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey
    }
    return this.http.post(`${this.url}/trustees`, item);
  }

  getAllTrustees(): Observable<any>
  {
    return this.http.get(`${this.url}/trustees`);
  }

  getTrusteesById(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/trustees/${id}`);
  }

  updateTrustee(trusteeId: string, name: string, email: string, phone: string, apikey: string): Observable<any>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey
    }
    return this.http.put(`${this.url}/trustees/${trusteeId}`, item);
  }

  // deleteTrustee(trusteeId: string): Observable<any>
  // {
  //   return this.http.delete(`${this.url}/trustees/${trusteeId}`);
  // }

  addContractor(name: string, email: string, phone: string, apikey: string, banned: boolean): Observable<any>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey,
      banned: banned
    }
    return this.http.post(`${this.url}/contractors`, item);
  }

  getAllContractors(): Observable<any>
  {
    return this.http.get(`${this.url}/contractors`);
  }
  getContractorById(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/contractors/${id}`);
  }

  getQuotes(): Observable<any>
  {
    return this.http.get(`${this.url}/quote`);
  }

  addQuote(taskId: string, contractorId: string, amount: number, submittedOn: Date, type:string ): Observable<any>
  {
    const quote = {
      taskId: taskId,
      contractorId: contractorId,
      amount: amount,
      submittedOn: submittedOn,
      type: type
    }
    return this.http.post(`${this.url}/quote`, quote);
  }

  getQuoteById(id: number): Observable<any>
  {
    return this.http.get(`${this.url}/quote/${id}`);
  }
}
