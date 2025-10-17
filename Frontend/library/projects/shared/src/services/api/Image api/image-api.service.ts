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
    console.log('\n=== GET IMAGE ===');
    console.log('Requested image ID:', imageId);
    console.log('Image ID type:', typeof imageId);

    if(this.imageCache.has(imageId))
    {
      console.log('✓ Found in cache:', this.imageCache.get(imageId));
      return of(this.imageCache.get(imageId)!);
    }

    const url = `${this.url}/images/presigned/${imageId}`;
    console.log('Fetching from URL:', url);
    
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

async uploadImages(
  files: File[],
  uuid: string,
  task_uuid?: string
): Promise<string[]> {  // Return array of image IDs
  console.log(`Starting upload of ${files.length} files`);
  const uploadResults: string[] = [];
  
  const uploadPromises = files.map(async (file, index) => {
    try {
      console.log(`[${index + 1}/${files.length}] Processing ${file.name}`);
      
      const presignResponse: any = await firstValueFrom(
        this.http.get(`${this.url}/images/presigned-upload/${encodeURIComponent(file.name)}`, { withCredentials: true })
      );

      console.log(`[${index + 1}] Presigned URL received:`, presignResponse);

      const uploadUrl = presignResponse.uploadUrl;
      const key = presignResponse.fileKey;
      const id = presignResponse.id;
      
      await firstValueFrom(
        this.http.put(uploadUrl, file, {
          headers: new HttpHeaders({ 'Content-Type': file.type }),
          responseType: 'text',
          withCredentials: false
        })
      );

      console.log(`[${index + 1}] File uploaded to S3 successfully`);
      
      let notifyUrl = `${this.url}/images/notify-upload/${id}/${encodeURIComponent(file.name)}/${key}/${uuid}`;
      if (task_uuid) {
        notifyUrl += `?taskUuid=${task_uuid}`;
      }
      
      await firstValueFrom(
        this.http.post(notifyUrl, {}, { responseType: 'text', withCredentials: true })
      );

       console.log(`[${index + 1}] Backend notified, image ID: ${id}`);
      
      uploadResults.push(id); // Store the image ID
    } catch (error) {
      console.error(`Failed to upload file ${file.name}:`, error);
      throw error;
    }
  });

  try {
    await Promise.all(uploadPromises);
    console.log('All uploads completed successfully:', uploadResults);
    return uploadResults;
  } catch (error) {
    console.error('Upload process failed:', error);
    throw error;
  }
}
  getUserImages(uuid: string): Observable<string>{
    return this.http.get(`${this.url}/images/presigned/user/${uuid}`, {
      responseType: 'text',
      withCredentials: true
    });
  }

    getTaskImages(uuid: string): Observable<string>{
    return this.http.get(`${this.url}/images/presigned/task/${uuid}`, {
      responseType: 'text',
      withCredentials: true
    });
  }

}