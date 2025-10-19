import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environmentMobile } from '../../../environment';
import { firstValueFrom } from 'rxjs';

export interface ImageWithPresignedUrl {
  id: string;
  filename: string;
  presignedUrl: string;
  taskUuid?: string;
  userUuid?: string;
  progressUuid?: string;
  buildingUuid?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageApiService{

  private url = environmentMobile.apiUrl;
  private imageCache = new Map<string, string>();

  constructor(private http: HttpClient) { }

getImage(imageId?: string, task_uuid?: string, user_uuid?: string, progress_uuid?: string, building_uuid?: string): Observable<string>
  {
    //console.log('\n=== GET IMAGE ===');
    
    // If UUIDs are provided, fetch the image ID first
    if (task_uuid || user_uuid || progress_uuid || building_uuid) {
      //console.log('Fetching image ID by UUIDs:', { task_uuid, user_uuid, progress_uuid, building_uuid });
      
      const params = new URLSearchParams();
      if (user_uuid) params.append('userUuid', user_uuid);
      if (task_uuid) params.append('taskUuid', task_uuid);
      if (progress_uuid) params.append('progressUuid', progress_uuid);
      if (building_uuid) params.append('buildingUuid', building_uuid);
      
      return this.http.get<ImageWithPresignedUrl[]>(
        `${this.url}/images/presigned?${params.toString()}`, 
        { withCredentials: true }
      ).pipe(
        switchMap(images => {
          if (images.length === 0) {
            throw new Error('No images found');
          }
          // Get the first image's ID and fetch its presigned URL
          const fetchedImageId = images[0].id;
          //console.log('✓ Fetched image ID:', fetchedImageId);
          
          // Use the common logic with the fetched imageId
          return this.fetchPresignedUrl(fetchedImageId);
        })
      );
    }
    
    // Original logic when imageId is provided directly
    if (!imageId) {
      throw new Error('Either imageId or UUID parameters must be provided');
    }
    
    //console.log('Requested image ID:', imageId);
    //console.log('Image ID type:', typeof imageId);

    return this.fetchPresignedUrl(imageId);
  }

  // Helper method to handle the common presigned URL fetching logic
  private fetchPresignedUrl(imageId: string): Observable<string> {
    // Check cache first
    if (this.imageCache.has(imageId)) {
      //console.log('✓ Found in cache:', this.imageCache.get(imageId));
      return of(this.imageCache.get(imageId)!);
    }

    const url = `${this.url}/images/presigned/${imageId}`;
    //console.log('Fetching from URL:', url);
    
    return this.http.get(url, {
      responseType: 'text',
      withCredentials: true 
    }).pipe(
      map(presignedUrl => {
        this.imageCache.set(imageId, presignedUrl);
        return presignedUrl;
      })
    );
  }
  async uploadImages(
    files: File[],
    user_uuid?: string,
    task_uuid?: string,
    progress_uuid?: string,
    building_uuid?: string,
  ): Promise<string[]> {
    //console.log(`Starting upload of ${files.length} files`);
    const uploadResults: string[] = [];
    
    const uploadPromises = files.map(async (file, index) => {
      try {
        //console.log(`[${index + 1}/${files.length}] Processing ${file.name}`);
        
        const presignResponse: any = await firstValueFrom(
          this.http.get(`${this.url}/images/presigned-upload/${encodeURIComponent(file.name)}`, { withCredentials: true })
        );

        //console.log(`[${index + 1}] Presigned URL received:`, presignResponse);

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

        //console.log(`[${index + 1}] File uploaded to S3 successfully`);
        
        // Build query parameters properly using URLSearchParams
        const params = new URLSearchParams();
        if (task_uuid) params.append('taskUuid', task_uuid);
        if (progress_uuid) params.append('progressUuid', progress_uuid);
        if (building_uuid) params.append('buildingUuid', building_uuid);
        if (user_uuid) params.append('userUuid', user_uuid);
        
        const queryString = params.toString();
        const notifyUrl = `${this.url}/images/notify-upload/${id}/${encodeURIComponent(file.name)}/${key}${queryString ? '?' + queryString : ''}`;
        
        //console.log(`[${index + 1}] Notify URL:`, notifyUrl);
        
        await firstValueFrom(
          this.http.post(notifyUrl, {}, { responseType: 'text', withCredentials: true })
        );

        //console.log(`[${index + 1}] Backend notified, image ID: ${id}`);
        
        uploadResults.push(id);
      } catch (error) {
        console.error(`Failed to upload file ${file.name}:`, error);
        throw error;
      }
    });

    try {
      await Promise.all(uploadPromises);
      //console.log('All uploads completed successfully:', uploadResults);
      return uploadResults;
    } catch (error) {
      console.error('Upload process failed:', error);
      throw error;
    }
  }

  /**
   * NEW: Update image associations without re-uploading
   * This is more efficient than re-uploading when you just need to associate an image with a task
   */
  async updateImageAssociations(
    imageId: string,
    user_uuid?: string,
    task_uuid?: string,
    progress_uuid?: string,
    building_uuid?: string
  ): Promise<void> {
    //console.log(`Updating associations for image ${imageId}`);
    
    const params = new URLSearchParams();
    if (user_uuid) params.append('userUuid', user_uuid);
    if (task_uuid) params.append('taskUuid', task_uuid);
    if (progress_uuid) params.append('progressUuid', progress_uuid);
    if (building_uuid) params.append('buildingUuid', building_uuid);
    
    const queryString = params.toString();
    const updateUrl = `${this.url}/images/${imageId}/associations${queryString ? '?' + queryString : ''}`;
    
    await firstValueFrom(
      this.http.patch(updateUrl, {}, { withCredentials: true })
    );
    
    //console.log('Image associations updated successfully');
  }

  getImages(user_uuid: string, task_uuid: string, progress_uuid: string, building_uuid: string): Observable<string>{
    let imageTypeUrl = `${this.url}/images/presigned`;
      if (task_uuid) {
        imageTypeUrl += `?taskUuid=${task_uuid}`;
      }
      if (progress_uuid) {
        imageTypeUrl += `?progressUuid=${progress_uuid}`;
      }
      if (building_uuid) {
        imageTypeUrl += `?buildingUuid=${building_uuid}`;
      }
      if (user_uuid) {
        imageTypeUrl += `?userUuid=${user_uuid}`;
      }
    return this.http.get(imageTypeUrl, {
      responseType: 'text',
      withCredentials: true
    });
  }
}