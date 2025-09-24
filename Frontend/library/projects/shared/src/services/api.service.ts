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
import { environmentMobile } from '../environment';
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
  private url = environmentMobile.apiUrl;
  
  constructor(private http: HttpClient) { }

  getInventory(): Observable<Inventory[]> 
  {
    return this.http.get<Inventory[]>(`${this.url}/inventory`,
      { withCredentials: true }
    );
  }

  addInventoryItem(name: string, buildingId: number, quantity: number, price: number): Observable<Inventory>
  {
    const item = {
      name: name,
      buildingId: buildingId,
      quantity: quantity,
      price: price
    }
    return this.http.post<Inventory>(`${this.url}/inventory`, item,
      { withCredentials: true });
  }

  // getBuildings(): Observable<Building[]>
  // {
  //   return this.http.get<Building[]>(`${this.url}/buildings`);
  // }

  getBudgets(id: number): Observable<Budget[]>
  {
    return this.http.get<Budget[]>(`${this.url}/budgets/${id}`,
      { withCredentials: true });
  }

  getBuildingDetails(id: number): Observable<BuildingDetails>
  {
    return this.http.get<BuildingDetails>(`${this.url}/building/${id}/details`,
      { withCredentials: true });
  }

  addTrustees(name: string, email: string, phone: string, apikey: string): Observable<Trustee>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey
    }
    return this.http.post<Trustee>(`${this.url}/trustee`, item,
      { withCredentials: true });
  }

  getAllTrustees(): Observable<Trustee[]>
  {
    return this.http.get<Trustee[]>(`${this.url}/trustee`,
      { withCredentials: true });
  }

  getTrusteesById(id: number): Observable<Trustee>
  {
    return this.http.get<Trustee>(`${this.url}/trustee/${id}` ,
      { withCredentials: true });
  }

  updateTrustee(trusteeId: string, name: string, email: string, phone: string, apikey: string): Observable<Trustee>
  {
    const item = {
      name: name,
      email: email,
      phone: phone,
      apikey: apikey
    }
    return this.http.put<Trustee>(`${this.url}/trustee/${trusteeId}`, item,
      { withCredentials: true });
  }

  // deleteTrustee(trusteeId: string): Observable<any>
  // {
  //   return this.http.delete(`${this.url}/trustee/${trusteeId}`);
  // }

  registerTrustee(name: string, email: string, phone: string, apikey: string, trusteeUuid: string): Observable<Trustee> {
    const item: Trustee = { trusteeUuid, name, email, phone, apikey };
    return this.http.post<Trustee>(`${this.url}/trustee`, item,
      { withCredentials: true });
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
    return this.http.post<Contractor>(`${this.url}/contractor`, item,
      { withCredentials: true });
  }

  getAllContractors(): Observable<Contractor[]>
  {
    return this.http.get<Contractor[]>(`${this.url}/contractor`,
      { withCredentials: true });
  }
  getContractorById(id: number): Observable<Contractor>
  {
    return this.http.get<Contractor>(`${this.url}/contractor/${id}`,
      { withCredentials: true });
  }

  getQuotes(): Observable<Quote[]>
  {
    return this.http.get<Quote[]>(`${this.url}/quote`,
      { withCredentials: true });
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
  return this.http.post<Quote>(`${this.url}/maintenance/quotes`, quote,
      { withCredentials: true });
}


  getQuoteById(id: number): Observable<Quote>
  {
    return this.http.get<Quote>(`${this.url}/quote/${id}`,
      { withCredentials: true });
  }  

  getMaintenanceTasks(): Observable<MaintenanceTask[]> {
    return this.http.get<MaintenanceTask[]>(`${this.url}/maintenance`,
      { withCredentials: true });
  }

  getPresignedImageUrl(uuid: string): Observable<string> {
    return this.http.get(`${this.url}/images/presigned/${uuid}`, {
      responseType: 'text',
      withCredentials: true
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
    { headers: headers,
      withCredentials: true
     }
  );
}

async uploadPDF(file: File, uuid: string, type: string): Promise<void> {
    try {
      const presignResponse: any = await firstValueFrom(
        this.http.get(`${this.url}/upload/presigned-upload/${file.name}`,
        { withCredentials: true })
      );

      const uploadUrl = presignResponse.uploadUrl; // S3 URL
      const key = presignResponse.fileKey;
      const id = presignResponse.id;

      await firstValueFrom(
        this.http.put(uploadUrl, file, {
          headers: new HttpHeaders({
            'Content-Type': 'application/pdf'
          }),
          responseType: 'text' // S3 PUT returns empty body
        })
      );


      await firstValueFrom(
        this.http.post(
          `${this.url}/upload/notify-upload/${id}/${file.name}/${key}/${uuid}/${type}`,
          {},
          { responseType: 'text',
            withCredentials: true
           }
        )
      );

    } catch (error) {
      console.error('PDF upload failed:', error);
      throw error; // Let the component handle errors
    }
  }

  getContractorPDF(contractorUuid: string, type: string): Observable<string>{
    return this.http.get(`${this.url}/upload/presigned/${contractorUuid}/${type}`, {
      responseType: 'text',
      withCredentials: true
    });
  }

  getInventoryByBuilding(buildingUuid: string) {
    return this.http.get<any[]>(`/api/inventory/building/${buildingUuid}`);
  }

  createInventoryUsage(data: any) {
    return this.http.post(`${this.url}/inventory-usage`, data, { withCredentials: true });
  }

  getPendingInventoryUsage() {
    return this.http.get<any[]>(`/api/inventory-usage/pending-approval`);
  }

  approveInventoryUsage(usageUuid: string, approved: boolean) {
    return this.http.patch(`/api/inventory-usage/${usageUuid}/approval`, {
      trusteeApproved: approved,
      approvalDate: new Date().toISOString().slice(0, 10)
    });
  }
}
