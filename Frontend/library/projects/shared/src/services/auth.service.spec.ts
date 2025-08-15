import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthTokens, BodyCoporateRegisterResponse, contractorRegisterResponse, trusteeRegisterResponse } from '../models/Auth.model';
import { TokenUtilService } from '../services/token-util.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let tokenUtil: TokenUtilService;
  const apiUrl = '/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        TokenUtilService
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    tokenUtil = TestBed.inject(TokenUtilService);

    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('bodyCoporateLogin', () => {
    it('should login and set cookies', async () => {
      const mockResponse: AuthTokens = {
        idToken: 'test-id-token',
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        userType: 'bodyCorporate',
        userId: 'corp-123'
      };

      const promise = service.bodyCoporateLogin('test@example.com', 'password');
      
      const req = httpMock.expectOne(`${apiUrl}/body-corporates/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email: 'test@example.com',
        password: 'password'
      });
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
      expect(document.cookie).toContain('idToken=test-id-token');
      expect(document.cookie).toContain('bodyCoporateId=corp-123');
    });

    it('should reject on error', async () => {
      const promise = service.bodyCoporateLogin('test@example.com', 'wrongpassword');
      
      const req = httpMock.expectOne(`${apiUrl}/body-corporates/login`);
      req.error(new ErrorEvent('Unauthorized'), { status: 401 });

      await expectAsync(promise).toBeRejected();
    });
  });

  describe('bodyCoporateRegister', () => {
    it('should register with required fields', async () => {
      const mockResponse: BodyCoporateRegisterResponse = {
        corporateUuid: 'corp-123',
        corporateName: 'Test Corp',
        email: 'test@example.com',
        cognitoUserId: 'cognito-123',
        username: 'test@example.com',
        emailVerificationRequired: true
      };

      const promise = service.bodyCoporateRegister(
        'Test Corp',
        10.5,
        'test@example.com',
        'password'
      );
      
      const req = httpMock.expectOne(`${apiUrl}/body-corporates/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        corporateName: 'Test Corp',
        contributionPerSqm: 10.5,
        email: 'test@example.com',
        password: 'password',
        totalBudget: undefined,
        contactNumber: undefined
      });
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
    });

    it('should register with optional fields', async () => {
      const mockResponse: BodyCoporateRegisterResponse = {
        corporateUuid: 'corp-123',
        corporateName: 'Test Corp',
        email: 'test@example.com',
        cognitoUserId: 'cognito-123',
        username: 'test@example.com',
        emailVerificationRequired: true
      };

      const promise = service.bodyCoporateRegister(
        'Test Corp',
        10.5,
        'test@example.com',
        'password',
        10000,
        '1234567890'
      );
      
      const req = httpMock.expectOne(`${apiUrl}/body-corporates/register`);
      expect(req.request.body).toEqual({
        corporateName: 'Test Corp',
        contributionPerSqm: 10.5,
        email: 'test@example.com',
        password: 'password',
        totalBudget: 10000,
        contactNumber: '1234567890'
      });
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
    });
  });

  describe('confirmBodyCoporateRegistration', () => {
    it('should confirm registration', async () => {
      const promise = service.confirmBodyCoporateRegistration('test@example.com', '123456');
      
      const req = httpMock.expectOne(`${apiUrl}/body-corporates/confirm-registration`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        username: 'test@example.com',
        code: '123456'
      });
      req.flush({ message: 'Account confirmed' });

      const result = await promise;
      expect(result).toEqual({ message: 'Account confirmed' });
    });
  });

  describe('trusteeLogin', () => {
    it('should login and set cookies', async () => {
      const mockResponse: AuthTokens = {
        idToken: 'trustee-token',
        accessToken: 'trustee-access',
        refreshToken: 'trustee-refresh',
        userType: 'trustee',
        userId: 'trustee-123'
      };

      const promise = service.trusteeLogin('trustee@example.com', 'password');
      
      const req = httpMock.expectOne(`${apiUrl}/trustee/auth/login`);
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
      expect(document.cookie).toContain('idToken=trustee-token');
      expect(document.cookie).toContain('trusteeId=trustee-123');
    });
  });

  describe('trusteeRegister', () => {
    it('should register trustee', async () => {
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
      
      const req = httpMock.expectOne(`${apiUrl}/trustee/auth/register`);
      expect(req.request.body).toEqual({
        email: 'trustee@example.com',
        password: 'password',
        contactNumber: '1234567890'
      });
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
    });
  });

  describe('confirmTrusteeRegistration', () => {
    it('should confirm trustee registration', async () => {
      const promise = service.confirmTrusteeRegistration('trustee@example.com', '123456');
      
      const req = httpMock.expectOne(`${apiUrl}/trustee/auth/confirm`);
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
      
      const req = httpMock.expectOne(`${apiUrl}/contractor/auth/login`);
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
      expect(document.cookie).toContain('idToken=contractor-token');
      expect(document.cookie).toContain('contractorId=contractor-123');
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
      
      const req = httpMock.expectOne(`${apiUrl}/contractor/auth/register`);
      expect(req.request.body).toEqual({
        email: 'contractor@example.com',
        password: 'password',
        contactNumber: undefined
      });
      req.flush(mockResponse);

      const result = await promise;
      expect(result).toEqual(mockResponse);
    });
  });

  describe('confirmContractorRegistration', () => {
    it('should confirm contractor registration', async () => {
      const promise = service.confirmContractorRegistration('contractor@example.com', '123456');
      
      const req = httpMock.expectOne(`${apiUrl}/contractor/auth/confirm`);
      req.flush({ message: 'Account confirmed.' });

      const result = await promise;
      expect(result).toEqual({ message: 'Account confirmed.' });
    });
  });

  describe('cookie management', () => {
    afterEach(() => {
        document.cookie.split(';').forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
    });

    it('should get cookie value', () => {
      document.cookie = 'testCookie=testValue';
      expect(service['getCookieValue']('testCookie')).toBe('testValue');
    });

    it('should return null for non-existent cookie', () => {
      expect(service['getCookieValue']('nonexistent')).toBeNull();
    });

    it('should get idToken from cookie', () => {
      document.cookie = 'idToken=test-token';
      expect(service.getIdTokenFromCookieOrStorage()).toBe('test-token');
    });

     it('should determine trustee from cookies', () => {
        document.cookie = 'trusteeId=trustee-123';
        expect(service.getUserType()).toBe('trustee');
    });

    it('should determine body corporate from cookies', () => {
        document.cookie = 'bodyCoporateId=corp-123';
        expect(service.getUserType()).toBe('bodyCorporate');
    });

    it('should determine contractor from cookies', () => {
        document.cookie = 'contractorId=contractor-123';
        expect(service.getUserType()).toBe('contractor');
    });
  });

  describe('logout', () => {
    it('should clear all auth cookies', () => {
      document.cookie = 'idToken=test';
      document.cookie = 'bodyCoporateId=test';
      document.cookie = 'trusteeId=test';
      document.cookie = 'contractorId=test';

      service.logout();

      expect(document.cookie).not.toContain('idToken=');
      expect(document.cookie).not.toContain('bodyCoporateId=');
      expect(document.cookie).not.toContain('trusteeId=');
      expect(document.cookie).not.toContain('contractorId=');
    });
  });
});