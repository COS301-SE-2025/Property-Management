import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';
import { CameraWrapperService } from './camera-wrapper.service';
import { CapacitorWrapperService } from './capacitor-wrapper.service';
import { CameraResultType, CameraSource } from '@capacitor/camera';

describe('PhotoService', () => {
  let service: PhotoService;
  let mockCameraWrapper: jasmine.SpyObj<CameraWrapperService>;
  let mockCapacitorWrapper: jasmine.SpyObj<CapacitorWrapperService>;

  beforeEach(() => {
    mockCameraWrapper = jasmine.createSpyObj('CameraWrapperService', ['getPhoto']);
    mockCapacitorWrapper = jasmine.createSpyObj('CapacitorWrapperService', ['getPlatform']);

    TestBed.configureTestingModule({
      providers: [
        PhotoService,
        { provide: CameraWrapperService, useValue: mockCameraWrapper },
        { provide: CapacitorWrapperService, useValue: mockCapacitorWrapper }
      ]
    });

    service = TestBed.inject(PhotoService);

    mockCameraWrapper.getPhoto.and.returnValue(Promise.resolve({
      base64String: 'base64string',
      format: 'jpeg',
      saved: false
    }));

    mockCapacitorWrapper.getPlatform.and.returnValue('web');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('takePhoto', () => {
    it('should call getPhoto with correct parameters on web', async () => {
      const result = await service.takePhoto();

      expect(mockCameraWrapper.getPhoto).toHaveBeenCalledWith({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        quality: 100
      });
      expect(result).toEqual({
        base64String: 'base64string',
        format: 'jpeg',
      });
    });

    it('should call getPhoto with Camera source on native platform', async () => {
      mockCapacitorWrapper.getPlatform.and.returnValue('ios');

      await service.takePhoto();

      expect(mockCameraWrapper.getPhoto).toHaveBeenCalledWith({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100
      });
    });

    it('should throw error when getPhoto fails', async () => {
      mockCameraWrapper.getPhoto.and.returnValue(Promise.reject(new Error('Camera error')));

      await expectAsync(service.takePhoto()).toBeRejectedWith(new Error('Camera error'));
    });
  });
});
