import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environmentMobile } from '../../../environment';
import { firstValueFrom } from 'rxjs';

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
    
    return this.http.get(`${this.url}/presigned/${imageId}`, {
      responseType: 'text',
    withCredentials: true 
    }).pipe(
      map(url => {
        this.imageCache.set(imageId, url);
        return url
      })
    ); 
  }
async uploadImages(
  files: File[], 
  uuid: string, 
  task_uuid?: string
){

  const uploadPromises = files.map(async (file) => { 
    try {
      const presignResponse: any = await firstValueFrom(
        this.http.get(`${this.url}/images/presigned-upload/${file.name}`, { withCredentials: true })
      );

      const uploadUrl = presignResponse.uploadUrl;
      const key = presignResponse.fileKey;
      const id = presignResponse.id;

      await firstValueFrom(
        this.http.put(uploadUrl, file, {
          headers: new HttpHeaders({ 'Content-Type': file.type }),
          responseType: 'text'
        })
      );

      let notifyUrl = `${this.url}/images/notify-upload/${id}/${file.name}/${key}/${uuid}`;
      if (task_uuid) {
        notifyUrl += `?taskUuid=${task_uuid}`;
      }

      await firstValueFrom(
        this.http.post(notifyUrl, {}, { responseType: 'text', withCredentials: true })
      );

    } catch (error) {
      console.error(`Failed to upload file ${file.name}:`, error);
      throw error; // propagate error for this specific file
    }
  });

  // Wait for all uploads to finish
  await Promise.all(uploadPromises);
}
  getUserImages(uuid: string, type: string): Observable<string>{
    return this.http.get(`${this.url}/images/presigned/user/${uuid}`, {
      responseType: 'text',
      withCredentials: true
    });
  }

    getTaskImages(uuid: string, type: string): Observable<string>{
    return this.http.get(`${this.url}/images/presigned/task/${uuid}`, {
      responseType: 'text',
      withCredentials: true
    });
  }

}