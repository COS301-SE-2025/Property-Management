import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private apiUrl = '/api/buildings';

  constructor(private http: HttpClient) {}

  createProperty(data: any): Observable<any> {
    console.log('POST', this.apiUrl, 'Payload:', data);
    return this.http.post(this.apiUrl, data); 
  }
}