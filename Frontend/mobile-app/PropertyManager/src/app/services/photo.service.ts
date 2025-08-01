import { Injectable } from '@angular/core';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraWrapperService } from './camera-wrapper.service';
import { CapacitorWrapperService } from './capacitor-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private cameraWrapper: CameraWrapperService, private capacitorWrapper: CapacitorWrapperService) { }

  async takePhoto(): Promise<{base64String?: string, format: string}>
  {
    try{
      const source = this.capacitorWrapper.getPlatform() === 'web'
        ? CameraSource.Prompt
        : CameraSource.Camera;

       const photo = await this.cameraWrapper.getPhoto({
        resultType: CameraResultType.Base64,
        source,
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
