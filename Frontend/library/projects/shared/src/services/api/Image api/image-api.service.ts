import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environmentMobile } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ImageApiService{

  // private url = '/api';
  private url = environmentMobile.apiUrl;
  private imageCache = new Map<string, string>();

  constructor(private http: HttpClient) { }


  getImage(imageId: string): Observable<string>
  {
    if(this.imageCache.has(imageId))
    {
      return of(this.imageCache.get(imageId)!);
    }
    
    return this.http.get(`${this.url}/images/presigned/${imageId}`, {
      responseType: 'text',
    withCredentials: true 
    }).pipe(
      map(url => {
        this.imageCache.set(imageId, url);
        return url
      })
    ); 
  }
  uploadImage(file: File)
  {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ imageKey: string}>(`${this.url}/images/upload`, formData, {
    }).pipe(map(response => ({ imageId:  response.imageKey })));

  }
}