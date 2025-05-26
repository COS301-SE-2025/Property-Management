import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Define interfaces for type safety
export interface InventoryItem {
  name: string;
  buildingId: number;
  quantity: number;
  price: number;
}

export interface Building {
  id: number;
  name: string;
}

// export interface Budget {
//   // Define budget fields
// }

// export interface BuildingDetails {
//   // Define building details fields
// }

export interface Trustee {
  trustee_id?: number;
  name: string;
  email: string;
  phone: string;
  apikey: string;
}

export interface Contractor {
  contractor_id?: number;
  name: string;
  email: string;
  phone: string;
  apikey: string;
  banned: boolean;
}

export interface Quote {
  // Define quote fields
  taskId: string;
  contractorId: string;
  amount: number;
  submittedOn: Date;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = '/api';
  constructor(private http: HttpClient) { }

  getInventory(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.url}/inventory`);
  }

  addInventoryItem(name: string, buildingId: number, quantity: number, price: number): Observable<InventoryItem> {
    const item: InventoryItem = {
      name: name,
      buildingId: buildingId,
      quantity: quantity,
      price: price
    };
    return this.http.post<InventoryItem>(`${this.url}/inventory`, item);
  }

  getBuildings(): Observable<Building[]> {
    return this.http.get<Building[]>(`${this.url}/buildings`);
  }

  // getBudgets(id: number): Observable<Budget[]> {
  //   return this.http.get<Budget[]>(`${this.url}/budgets/${id}`);
  // }

  // getBuildingDetails(id: number): Observable<BuildingDetails> {
  //   return this.http.get<BuildingDetails>(`${this.url}/buildings/${id}/details`);
  // }

  registerTrustee(name: string, email: string, phone: string, apikey: string): Observable<Trustee> {
    const item: Trustee = { name, email, phone, apikey };
    return this.http.post<Trustee>(`${this.url}/trustee`, item);
  }

  getAllTrustees(): Observable<Trustee[]> {
    return this.http.get<Trustee[]>(`${this.url}/trustee`);
  }

  getTrusteesById(id: number): Observable<Trustee> {
    return this.http.get<Trustee>(`${this.url}/trustee/${id}`);
  }

  updateTrustee(trusteeId: string, name: string, email: string, phone: string, apikey: string): Observable<Trustee> {
    const item: Trustee = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey
    };
    return this.http.put<Trustee>(`${this.url}/trustee`, { trustee_id: trusteeId, ...item });
  }

  // deleteTrustee(trusteeId: string): Observable<void> {
  //   return this.http.delete<void>(`${this.url}/trustee`, { body: { trustee_id: trusteeId } });
  // }

  addContractor(name: string, email: string, phone: string, apikey: string, banned: boolean): Observable<Contractor> {
    const item: Contractor = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey,
      banned: banned
    };
    return this.http.post<Contractor>(`${this.url}/contractor`, item);
  }

  getAllContractors(): Observable<Contractor[]> {
    return this.http.get<Contractor[]>(`${this.url}/contractors`);
  }

  getContractorById(id: number): Observable<Contractor> {
    return this.http.get<Contractor>(`${this.url}/contractors/${id}`);
  }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.url}/quote`);
  }

  addQuote(taskId: string, contractorId: string, amount: number, submittedOn: Date, type: string): Observable<Quote> {
    const quote: Quote = {
      taskId: taskId,
      contractorId: contractorId,
      amount: amount,
      submittedOn: submittedOn,
      type: type
    };
    return this.http.post<Quote>(`${this.url}/quote`, quote);
  }

  getQuoteById(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${this.url}/quote/${id}`);
  }
}