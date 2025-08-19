import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';
import { PDFupload } from '../models/PDF.model';
import { Budget } from '../models/budget.model';
import { Contractor } from '../models/contractor.model';
import { Quote } from '../models/quote.model';
import { BuildingDetails } from '../models/buildingDetails.model';
import { MaintenanceTask } from '../models/maintenanceTask.model';
import { environment } from '../environment';
import { firstValueFrom } from 'rxjs';


export interface Trustee {
  trustee_id?: number;
  trusteeUuid: string;
  name: string;
  email: string;
  phone: string;
  apikey: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private url = '/api';
  private url = environment.apiUrl;
  
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

  registerTrustee(name: string, email: string, phone: string, apikey: string, trusteeUuid: string): Observable<Trustee> {
    const item: Trustee = { trusteeUuid, name, email, phone, apikey };
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
  taskUuid: string,
  contractorUuid: string,
  submittedOn: Date,
  status: string,
  amount: number,
  documentUrl: string
): Observable<Quote> {
  const quote = {
    taskUuid: taskUuid,
    contractorUuid: contractorUuid,
    submittedOn: submittedOn.toISOString(), // ensure ISO string format
    status: status,
    amount: amount,
    documentUrl: documentUrl
  };
  return this.http.post<Quote>(`${this.url}/maintenance/quotes`, quote);
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

 getCookieValue(name: string): string {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return "";
}

updateCookie(name: string, value: string, days: number = 1): void {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + days);

  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expireDate.toUTCString()}; path=/`;
} 

getContractorMaintenanceTasks(contractorUuid: string, isBodyCorporate: boolean = true): Observable<MaintenanceTask[]> {
  const headers = {
    'isBodyCorporate': isBodyCorporate.toString()
  };

  return this.http.get<MaintenanceTask[]>(
    `${this.url}/maintenance/contractor/${contractorUuid}`,
    { headers: headers }
  );
}

async uploadPDF(file: File, uuid: string, type: string): Promise<void> {
    try {
      const presignResponse: any = await firstValueFrom(
        this.http.get(`${this.url}/upload/presigned-upload/${file.name}`)
      );

      const uploadUrl = presignResponse.uploadUrl; // S3 URL
      const key = presignResponse.fileKey;
      const id = presignResponse.id;

      console.log('Presigned URL:', uploadUrl);

      await firstValueFrom(
        this.http.put(uploadUrl, file, {
          headers: new HttpHeaders({
            'Content-Type': 'application/pdf'
          }),
          responseType: 'text' // S3 PUT returns empty body
        })
      );

      console.log('PDF uploaded to S3');

      await firstValueFrom(
        this.http.post(
          `${this.url}/upload/notify-upload/${id}/${file.name}/${key}/${uuid}/${type}`,
          {},
          { responseType: 'text' } // <- this is the key
        )
      );


      console.log('Backend notified and metadata saved');

    } catch (error) {
      console.error('PDF upload failed:', error);
      throw error; // Let the component handle errors
    }
  }

  getQuote(contractorUuid: string, type: string): Observable<string>{
    return this.http.get(`${this.url}/upload/presigned/${contractorUuid}/${type}`, {
      responseType: 'text'
    });
  }


}
