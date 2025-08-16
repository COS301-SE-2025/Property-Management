import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LifecycleCostService, CreateLifecycleCostRequest, UpdateLifecycleCostRequest, LifecycleCostResponse } from './life-cycleCost-api.service';

describe('LifecycleCostService', () => {
  let service: LifecycleCostService;
  let httpMock: HttpTestingController;
  const baseUrl = '/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LifecycleCostService]
    });
    service = TestBed.inject(LifecycleCostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should send a POST request to create a lifecycle cost', () => {
      const mockRequest: CreateLifecycleCostRequest = {
        coporateUuid: 'corp-123',
        type: 'Maintenance',
        description: 'Annual maintenance',
        estimatedCost: 5000
      };

      const mockResponse: LifecycleCostResponse = {
        costUuid: 'cost-123',
        coporateUuid: 'corp-123',
        type: 'Maintenance',
        description: 'Annual maintenance',
        estimatedCost: 5000
      };

      service.create(mockRequest).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/lifecycle-cost`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });
  });

  describe('getById', () => {
    it('should send a GET request to fetch a lifecycle cost by ID', () => {
      const uuid = 'cost-123';
      const mockResponse: LifecycleCostResponse = {
        costUuid: uuid,
        coporateUuid: 'corp-123',
        type: 'Maintenance',
        timeframe: 'Annual'
      };

      service.getById(uuid).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/lifecycle-cost/${uuid}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getByCorporate', () => {
    it('should send a GET request to fetch lifecycle costs by corporate UUID', () => {
      const corporateUuid = 'corp-123';
      const mockResponse: LifecycleCostResponse[] = [
        {
          costUuid: 'cost-123',
          coporateUuid: corporateUuid,
          type: 'Maintenance'
        },
        {
          costUuid: 'cost-456',
          coporateUuid: corporateUuid,
          type: 'Upgrade'
        }
      ];

      service.getByCorporate(corporateUuid).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/lifecycle-cost/coporate/${corporateUuid}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle empty response', () => {
      const corporateUuid = 'corp-123';

      service.getByCorporate(corporateUuid).subscribe(response => {
        expect(response).toEqual([]);
      });

      const req = httpMock.expectOne(`${baseUrl}/lifecycle-cost/coporate/${corporateUuid}`);
      req.flush(null);
    });
  });

  describe('update', () => {
    it('should send a PUT request to update a lifecycle cost', () => {
      const uuid = 'cost-123';
      const mockRequest: UpdateLifecycleCostRequest = {
        type: 'Updated Maintenance',
        estimatedCost: 6000
      };

      const mockResponse: LifecycleCostResponse = {
        costUuid: uuid,
        coporateUuid: 'corp-123',
        type: 'Updated Maintenance',
        estimatedCost: 6000
      };

      service.update(uuid, mockRequest).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}/lifecycle-cost/${uuid}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });
  });

  describe('delete', () => {
    it('should send a DELETE request to remove a lifecycle cost', () => {
      const uuid = 'cost-123';

      service.delete(uuid).subscribe({
        next: response => {
            expect(response).toBeNull();
        },
        error: fail
      });

      const req = httpMock.expectOne(`${baseUrl}/lifecycle-cost/${uuid}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null, { status: 204, statusText: 'No Content' });
    });
  });

  describe('error handling', () => {
    it('should handle errors for create', (done) => {
      const mockRequest: CreateLifecycleCostRequest = {
        coporateUuid: 'corp-123',
        type: 'Maintenance'
      };

      service.create(mockRequest).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error).toBeTruthy();
          done();
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/lifecycle-cost`);
      req.error(new ErrorEvent('Network error'));
    });

  });
});