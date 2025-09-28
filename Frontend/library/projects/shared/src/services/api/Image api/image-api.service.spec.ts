import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImageApiService } from './image-api.service';
import { environmentMobile } from '../../../environment';

describe('ImageApiService', () => {
  let service: ImageApiService;
  let httpMock: HttpTestingController;
  const mockApiUrl = environmentMobile.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ImageApiService,
        { provide: environmentMobile, useValue: { apiUrl: mockApiUrl } }
      ]
    });
    service = TestBed.inject(ImageApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service['imageCache'].clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getImage', () => {
    const testImageId = 'test123';
    const mockPresignedUrl = 'https://example.com/image.jpg';

    it('should return cached image if available', () => {
      service['imageCache'].set(testImageId, mockPresignedUrl);
      
      service.getImage(testImageId).subscribe(url => {
        expect(url).toBe(mockPresignedUrl);
      });

      httpMock.expectNone(`${mockApiUrl}/images/presigned/${testImageId}`);
    });

    it('should make HTTP request if image not in cache', (done) => {
      service.getImage(testImageId).subscribe({
        next: url => {
            expect(url).toBe(mockPresignedUrl);
            expect(service['imageCache'].get(testImageId)).toBe(mockPresignedUrl);
            done();
        },
        error: done.fail
      });

      const req = httpMock.expectOne(`${mockApiUrl}/images/presigned/${testImageId}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toBe('text');
      
      req.flush(mockPresignedUrl);
    });

    it('should handle HTTP errors', () => {
      const errorResponse = new ErrorEvent('Network error');
      
      service.getImage(testImageId).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpMock.expectOne(`${mockApiUrl}/images/presigned/${testImageId}`);
      req.error(errorResponse);
    });
  });

  describe('uploadImage', () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockResponse = { imageKey: 'uploaded123' };

    it('should upload file and return image key', () => {
      service.uploadImage(mockFile).subscribe(response => {
        expect(response).toEqual({ imageId: mockResponse.imageKey });
      });

      const req = httpMock.expectOne(`${mockApiUrl}/images/upload`);
      expect(req.request.method).toBe('POST');
      
      const formData = req.request.body as FormData;
      expect(formData.get('file')).toEqual(mockFile);
      
      req.flush(mockResponse);
    });

    it('should handle upload errors', () => {
      const errorResponse = new ErrorEvent('Upload failed');
      
      service.uploadImage(mockFile).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpMock.expectOne(`${mockApiUrl}/images/upload`);
      req.error(errorResponse);
    });
  });
});