import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import e from 'express';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService{
  private url = '/api';
  constructor(private http: HttpClient) { }

  getImage(id: string): Observable<string> {
    return this.http.get(`${this.url}/images/presigned/${id}`, { responseType: 'text' });
  }

}