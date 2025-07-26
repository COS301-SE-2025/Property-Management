import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  async takePhoto(): Promise<{base64String?: string, format: string}>
  {
    try{
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: Capacitor.getPlatform() === 'web' ? CameraSource.Prompt : CameraSource.Camera,
        quality: 100,
      });

      return {
        base64String: photo.base64String,
        format: photo.format
      };
    }
    catch(error){
      console.error('Error taking photo', error);
      throw error;
    }
  }
  base64ToBlob(base64: string, content: string)
  {
    const bytes = atob(base64);
    const byteNum = new Array(bytes.length);

    for(let i = 0; i < bytes.length; i++)
    {
      byteNum[i] = bytes.charCodeAt(i);
    }

    const byteArr = new Uint8Array(byteNum);
    return new Blob([byteArr], { type: content });
  }
  createFile(blob: Blob, fileName: string, format: string): File{
    return new File([blob], fileName, {
      type: `image/${format}`
    });
  }
}
