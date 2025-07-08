import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private apiUrl = '/api/buildings';

  constructor(private http: HttpClient) {}

  createProperty(data: Property): Observable<Property> {
    console.log('POST', this.apiUrl, 'Payload:', data);
    return this.http.post<Property>(this.apiUrl, data); 
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('/api/images/upload', formData, {
      responseType: 'text'
    }).pipe( map(imageId => ({ imageId })));
  }
}