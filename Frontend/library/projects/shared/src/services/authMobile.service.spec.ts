import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthMobileService } from './authMobile.service';
import { AuthTokens, contractorRegisterResponse, trusteeRegisterResponse } from '../models/Auth.model';
import { environmentMobile } from '../environment';
import { Storage } from '@ionic/storage-angular';


class MockStorageService {
  private storage: {[key: string]: string} = {};

  async create(): Promise<MockStorageService> {
    return this;
  }

  set(key: string, value: string): Promise<void> {
    this.storage[key] = value;
    return Promise.resolve();
  }

  get(key: string): Promise<string | null> {
    return Promise.resolve(this.storage[key] || null);
  }

  remove(key: string): Promise<void> {
    delete this.storage[key];
    return Promise.resolve();
  }

  clear(): Promise<void> {
    this.storage = {};
    return Promise.resolve();
  }
}

describe('AuthMobileService', () => {
  let service: AuthMobileService;
  let httpMock: HttpTestingController;
  let storageService: MockStorageService;
  const mockApiUrl = 'http://localhost:4200/api';

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthMobileService,
        { provide:  Storage, useClass: MockStorageService},
        { provide: environmentMobile, useValue: { apiUrl: mockApiUrl } }
      ]
    });
    service = TestBed.inject(AuthMobileService);
    httpMock = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(Storage) as unknown as MockStorageService;

    await storageService.create()
    await storageService.clear();
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('trusteeLogin', () => {
    it('should login and store tokens in storage', async () => {
      const mockResponse: AuthTokens = {
        idToken: 'trustee-token',
        accessToken: 'trustee-access',
        refreshToken: 'trustee-refresh',
        userType: 'trustee',
        userId: 'trustee-123'
      };

      const promise = service.trusteeLogin('trustee@example.com', 'password');
      
      const req = httpMock.expectOne(`${mockApiUrl}/trustee/auth/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email: 'trustee@example.com',
        password: 'password'
      });
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
      expect(await storageService.get('idToken')).toBe('trustee-token');
      expect(await storageService.get('trusteeId')).toBe('trustee-123');
      expect(await storageService.get('userType')).toBe('trustee');
    });

    it('should reject on error', async () => {
      const promise = service.trusteeLogin('trustee@example.com', 'wrongpassword');
      
      const req = httpMock.expectOne(`${mockApiUrl}/trustee/auth/login`);
      req.error(new ErrorEvent('Unauthorized'), { status: 401 });

      await expectAsync(promise).toBeRejected();
    });
  });

  describe('trusteeRegister', () => {
    it('should register trustee with required fields', async () => {
      const mockResponse: trusteeRegisterResponse = {
        email: 'trustee@example.com',
        cognitoUserId: 'cognito-123',
        username: 'trustee@example.com'
      };

      const promise = service.trusteeRegister(
        'trustee@example.com',
        'password'
      );
      
      const req = httpMock.expectOne(`${mockApiUrl}/trustee/auth/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email: 'trustee@example.com',
        password: 'password',
        contactNumber: undefined
      });
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
    });

    it('should register trustee with optional contact number', async () => {
      const mockResponse: trusteeRegisterResponse = {
        email: 'trustee@example.com',
        cognitoUserId: 'cognito-123',
        username: 'trustee@example.com'
      };

      const promise = service.trusteeRegister(
        'trustee@example.com',
        'password',
        '1234567890'
      );
      
      const req = httpMock.expectOne(`${mockApiUrl}/trustee/auth/register`);
      expect(req.request.body.contactNumber).toBe('1234567890');
      req.flush(mockResponse);

      await expectAsync(promise).toBeResolved();
    });
  });

  describe('confirmTrusteeRegistration', () => {
    it('should confirm trustee registration', async () => {
      const promise = service.confirmTrusteeRegistration('trustee@example.com', '123456');
      
      const req = httpMock.expectOne(`${mockApiUrl}/trustee/auth/confirm`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        username: 'trustee@example.com',
        code: '123456'
      });
      req.flush({ message: 'Account confirmed.' });

      const result = await promise;
      expect(result).toEqual({ message: 'Account confirmed.' });
    });
  });

  describe('contractorLogin', () => {
    it('should login and set cookies', async () => {
      const mockResponse: AuthTokens = {
        idToken: 'contractor-token',
        accessToken: 'contractor-access',
        refreshToken: 'contractor-refresh',
        userType: 'contractor',
        userId: 'contractor-123'
      };

      const promise = service.contractorLogin('contractor@example.com', 'password');
      
      const req = httpMock.expectOne(`${mockApiUrl}/contractor/auth/login`);
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
      expect(document.cookie).toContain('idToken=contractor-token');
      expect(document.cookie).toContain('contractorId=contractor-123');
      expect(document.cookie).toContain('userType=contractor');
    });
  });

  describe('contractorRegister', () => {
    it('should register contractor', async () => {
      const mockResponse: contractorRegisterResponse = {
        email: 'contractor@example.com',
        username: 'contractor@example.com'
      };

      const promise = service.contractorRegister(
        'contractor@example.com',
        'password'
      );
      
      const req = httpMock.expectOne(`${mockApiUrl}/contractor/auth/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email: 'contractor@example.com',
        password: 'password',
        contactNumber: undefined
      });
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
    });

    it('should register contractor with contact number', async () => {
      const mockResponse: contractorRegisterResponse = {
        email: 'contractor@example.com',
        username: 'contractor@example.com'
      };

      const promise = service.contractorRegister(
        'contractor@example.com',
        'password',
        '1234567890'
      );
      
      const req = httpMock.expectOne(`${mockApiUrl}/contractor/auth/register`);
      expect(req.request.body.contactNumber).toBe('1234567890');
      req.flush(mockResponse);

      await expectAsync(promise).toBeResolved();
    });
  });

  describe('confirmContractorRegistration', () => {
    it('should confirm contractor registration', async () => {
      const promise = service.confirmContractorRegistration('contractor@example.com', '123456');
      
      const req = httpMock.expectOne(`${mockApiUrl}/contractor/auth/confirm`);
      req.flush({ message: 'Account confirmed.' });

      const result = await promise;
      expect(result).toEqual({ message: 'Account confirmed.' });
    });
  });

    describe('logout', () => {
        it('should clear auth storage', async () => {
            await storageService.set('userType', 'trustee');
            await storageService.set('trusteeID', 'trustee-123');  
            await storageService.set('contractorID', 'contractor-123');
            await storageService.set('theme', 'dark');

            await service.logout();

            expect(await storageService.get('userType')).toBeNull();
            expect(await storageService.get('trusteeID')).toBeNull();
            expect(await storageService.get('contractorID')).toBeNull();
            expect(await storageService.get('theme')).toBeNull();
        });
    });
});