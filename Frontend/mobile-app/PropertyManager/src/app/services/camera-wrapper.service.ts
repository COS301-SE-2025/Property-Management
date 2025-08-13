import { Injectable } from '@angular/core';
import { Camera, CameraOptions, Photo } from '@capacitor/camera';

@Injectable({ providedIn: 'root' })
export class CameraWrapperService {
  getPhoto(options: CameraOptions): Promise<Photo> {
    return Camera.getPhoto(options);
  }
}