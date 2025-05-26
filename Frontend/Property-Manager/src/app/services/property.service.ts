import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private apiUrl = 'http://localhost:8080/api/buildings';

  constructor(private http: HttpClient) {}

  createProperty(data: any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return this.http.post(this.apiUrl, formData);
  }
}