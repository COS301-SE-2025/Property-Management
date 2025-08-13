import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CameraResultType, CameraSource, Camera } from '@capacitor/camera';
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
      if(Capacitor.isNativePlatform())
      {
        const permissionStatus = await Camera.checkPermissions();
        if(permissionStatus.camera !== 'granted')
        {
          const permissionRequest = await Camera.requestPermissions({permissions: ['camera']});

          if(permissionRequest.camera !== 'granted')
          {
            throw new Error("Camera permission denied");
          }
        }
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
      else
      {
        return new Promise((resolve, reject) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.capture = 'environment';

          input.onchange = () => {
            const file = input.files?.[0];
            if(!file)
            {
              reject(new Error('No file selected'));
              return;
            }

            const reader = new FileReader();
            reader.onload = () => {
              const base64String = (reader.result as string).split(',')[1];
              resolve({
                base64String,
                format: file.type.split('/')[1] || 'jpeg'
              });
            };
            reader.readAsDataURL(file);
          };
          input.click();
        })
      }

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
