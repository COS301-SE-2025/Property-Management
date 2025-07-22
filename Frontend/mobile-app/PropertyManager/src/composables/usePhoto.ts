import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

export const usePhoto = () => {
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: Capacitor.getPlatform() === 'web' ? CameraSource.Prompt : CameraSource.Camera,
      quality: 100,
    });
    return photo;
  };

  return {
    takePhoto,
  };
};