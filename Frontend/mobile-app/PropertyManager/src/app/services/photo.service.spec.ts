import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { getPlatform } from '@angular/core';

const mockCamera = {
  getPhoto: jasmine.createSpy('getPhoto')
};

const mockCapacitor = {
  getPlatform: jasmine.createSpy('getPhoto').and.returnValue('web')
};

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotoService, 
        { provide: Camera, useValue: mockCamera },
        { provide: Capacitor, useValue: mockCapacitor }
      ]
    });
    service = TestBed.inject(PhotoService);
  });

  afterEach(() => {
    mockCamera.getPhoto.calls.reset();
    mockCapacitor.getPlatform.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('takePhoto', () => {
    it('should call Camera.getPhoto with correct parameters on web', async () => {
      const mockPhoto = {
        base64String: 'base64string',
        format: 'jpeg'
      };
      mockCamera.getPhoto.and.resolveTo(mockPhoto);

      const result = await service.takePhoto();

      expect(mockCamera.getPhoto).toHaveBeenCalledWith({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        quality: 100
      });
      expect(result).toEqual(mockPhoto);
    });

    it('should call Camera.getPhoto with Camera source on native platform', async () => {
      mockCapacitor.getPlatform.and.returnValue('ios');
      const mockPhoto = {
        base64String: 'base64string',
        format: 'jpeg'
      };
      mockCamera.getPhoto.and.resolveTo(mockPhoto);

      await service.takePhoto();

      expect(mockCamera.getPhoto).toHaveBeenCalledWith({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100
      });
    });

    it('should throw error when Camera.getPhoto fails', async () => {
      const error = new Error('Camera error');
      mockCamera.getPhoto.and.rejectWith(error);

      await expectAsync(service.takePhoto()).toBeRejectedWith(error);
    });
  });
  describe('base64ToBlob', () => {
    it('should convert base64 string to Blob correctly', () => {
      const base64 = 'dGVzdA==';
      const contentType = 'text/plain';
      
      const blob = service.base64ToBlob(base64, contentType);

      expect(blob instanceof Blob).toBeTrue();
      expect(blob.type).toBe(contentType);
      expect(blob.size).toBe(4);
    });

    it('should handle empty base64 string', () => {
      const blob = service.base64ToBlob('', 'text/plain');
      
      expect(blob.size).toBe(0);
    });
  });

  describe('createFile', () => {
    it('should create a File object from Blob with correct properties', () => {
      const blob = new Blob(['test content'], { type: 'text/plain' });
      const fileName = 'test.txt';
      const format = 'plain';
      
      const file = service.createFile(blob, fileName, format);

      expect(file instanceof File).toBeTrue();
      expect(file.name).toBe(fileName);
      expect(file.type).toBe(`image/${format}`);
      expect(file.size).toBe(blob.size);
    });

    it('should create a File with correct image type', () => {
      const blob = new Blob(['image content'], { type: 'image/jpeg' });
      const file = service.createFile(blob, 'test.jpg', 'jpeg');
      
      expect(file.type).toBe('image/jpeg');
    });
  });
});
