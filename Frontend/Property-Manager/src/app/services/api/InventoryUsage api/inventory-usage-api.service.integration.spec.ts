import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryUsageApiService } from './inventory-usage-api.service';
import { InventoryUsage } from '../../../models/inventoryUsage.model';

describe('InventoryUsageApiService Integration Tests', () => {
  let service: InventoryUsageApiService;
  let httpMock: HttpTestingController;
  const url = '/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryUsageApiService]
    });

    service = TestBed.inject(InventoryUsageApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('createInventoryUsage', () => {
    it('should create a new inventory usage record', () => {
      const mockUsage: InventoryUsage = {
        usageUuid: '1',
        itemUuid: 'item1',
        taskUuid: 'task1',
        contractorUuid: 'contractor1',
        quantityUsed: 5,
        trusteeApproval: false,
        approvedDate: new Date('2025-01-01')
      };

      const expectedBody = {
        itemUuid: 'item1',
        taskUuid: 'task1',
        contractorUuid: 'contractor1',
        quantityUsed: 5
      };

      service.createInventoryUsage('item1', 'task1', 'contractor1', 5).subscribe(usage => {
        expect(usage).toEqual(mockUsage);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(expectedBody);
      req.flush(mockUsage);
    });

    it('should handle validation error when creating usage record', () => {
      service.createInventoryUsage('', 'task1', 'contractor1', -1).subscribe(
        () => fail('should have failed with 400 error'),
        (error) => {
          expect(error.status).toBe(400);
        }
      );

      const req = httpMock.expectOne(`${url}/inventory-usage`);
      req.flush('Validation error', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('getAllInventoryUsage', () => {
    it('should fetch all inventory usage records with pagination', () => {
      const mockUsages: InventoryUsage[] = [
        {
          usageUuid: '1',
          itemUuid: 'item1',
          taskUuid: 'task1',
          contractorUuid: 'contractor1',
          quantityUsed: 5,
          trusteeApproval: false,
          approvedDate: new Date('2025-01-02')
        }
      ];

      service.getAllInventoryUsage(1, 10).subscribe(usages => {
        expect(usages).toEqual(mockUsages);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage?page=1&size=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsages);
    });

    it('should handle empty response when no usage records exist', () => {
      service.getAllInventoryUsage(1, 10).subscribe(usages => {
        expect(usages.length).toBe(0);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage?page=1&size=10`);
      req.flush([]);
    });
  });

  describe('getInventoryUsageById', () => {
    it('should fetch a specific usage record by usageUuid', () => {
      const mockUsage: InventoryUsage = {
        usageUuid: '1',
        itemUuid: 'item1',
        taskUuid: 'task1',
        contractorUuid: 'contractor1',
        quantityUsed: 5,
        trusteeApproval: false,
        approvedDate: new Date('2025-01-02')
      };

      service.getInventoryUsageById('1').subscribe(usage => {
        expect(usage).toEqual(mockUsage);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsage);
    });

    it('should handle 404 when usage record not found', () => {
      service.getInventoryUsageById('unknown').subscribe(
        () => fail('should have failed with 404 error'),
        (error) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne(`${url}/inventory-usage/unknown`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('updateInventoryUsageById', () => {
    it('should update a usage record successfully', () => {
      const mockUsage: InventoryUsage = {
        usageUuid: '1',
        itemUuid: 'item1',
        taskUuid: 'task1',
        contractorUuid: 'contractor1',
        quantityUsed: 10,
        trusteeApproval: true,
        approvedDate: new Date('2025-01-01')
      };

      const expectedBody = {
        quantityUsed: 10,
        trusteeApproved: true,
        approvalDate: new Date('2025-01-01')
      };

      service.updateInventoryUsageById('1', mockUsage).subscribe(usage => {
        expect(usage).toEqual(mockUsage);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(expectedBody);
      req.flush(mockUsage);
    });
  });

  describe('deleteInventoryUsageById', () => {
    it('should delete a usage record successfully', () => {
      const mockUsage: InventoryUsage = {
        usageUuid: '1',
        itemUuid: 'item1',
        taskUuid: 'task1',
        contractorUuid: 'contractor1',
        quantityUsed: 5,
        trusteeApproval: false,
        approvedDate: new Date('2025-01-01')
      };

      service.deleteInventoryUsageById('1').subscribe(usage => {
        expect(usage).toEqual(mockUsage);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockUsage);
    });
  });

  describe('ApproveOrRejectInventoryUsage', () => {
    it('should approve a usage record successfully', () => {
      const mockUsage: InventoryUsage = {
        usageUuid: '1',
        itemUuid: 'item1',
        taskUuid: 'task1',
        contractorUuid: 'contractor1',
        quantityUsed: 5,
        trusteeApproval: true,
        approvedDate: new Date('2025-01-01')
      };

      const expectedBody = {
        trusteeApproved: true,
        approvalDate: new Date('2025-01-01')
      };

      service.ApproveOrRejectInventoryUsage('1', mockUsage).subscribe(usage => {
        expect(usage).toEqual(mockUsage);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/1/approval`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(expectedBody);
      req.flush(mockUsage);
    });
  });

  describe('getUsageRecordsByItemId', () => {
    it('should fetch usage records for a specific item', () => {
      const mockUsages: InventoryUsage[] = [
        {
          usageUuid: '1',
          itemUuid: 'item1',
          taskUuid: 'task1',
          contractorUuid: 'contractor1',
          quantityUsed: 5,
          trusteeApproval: false,
          approvedDate: new Date('2025-01-01')
        }
      ];

      service.getUsageRecordsByItemId('item1').subscribe(usages => {
        expect(usages).toEqual(mockUsages);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/by-itemitem1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsages);
    });
  });

  describe('getUsageRecordsByTaskId', () => {
    it('should fetch usage records for a specific task', () => {
      const mockUsages: InventoryUsage[] = [
        {
          usageUuid: '1',
          itemUuid: 'item1',
          taskUuid: 'task1',
          contractorUuid: 'contractor1',
          quantityUsed: 5,
          trusteeApproval: false,
          approvedDate: new Date('2025-01-01')
        }
      ];

      service.getUsageRecordsByTaskId('task1').subscribe(usages => {
        expect(usages).toEqual(mockUsages);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/task1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsages);
    });
  });

  describe('getUsageRecordsByContractorId', () => {
    it('should fetch usage records for a specific contractor', () => {
      const mockUsages: InventoryUsage[] = [
        {
          usageUuid: '1',
          itemUuid: 'item1',
          taskUuid: 'task1',
          contractorUuid: 'contractor1',
          quantityUsed: 5,
          trusteeApproval: false,
          approvedDate: new Date('2025-01-01')
        }
      ];

      service.getUsageRecordsByContractorId('contractor1').subscribe(usages => {
        expect(usages).toEqual(mockUsages);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/by-contractor/contractor1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsages);
    });
  });

  describe('getApprovedUsageRecords', () => {
    it('should fetch all approved usage records', () => {
      const mockUsages: InventoryUsage[] = [
        {
          usageUuid: '1',
          itemUuid: 'item1',
          taskUuid: 'task1',
          contractorUuid: 'contractor1',
          quantityUsed: 5,
          trusteeApproval: true,
          approvedDate: new Date('2025-01-01')
        }
      ];

      service.getApprovedUsageRecords().subscribe(usages => {
        expect(usages).toEqual(mockUsages);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/approved`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsages);
    });
  });

  describe('getPendingUsageRecords', () => {
    it('should fetch all pending approval usage records', () => {
      const mockUsages: InventoryUsage[] = [
        {
          usageUuid: '1',
          itemUuid: 'item1',
          taskUuid: 'task1',
          contractorUuid: 'contractor1',
          quantityUsed: 5,
          trusteeApproval: false,
          approvedDate: new Date('2025-01-01')
        }
      ];

      service.getPendingUsageRecords().subscribe(usages => {
        expect(usages).toEqual(mockUsages);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/pending-approval`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsages);
    });
  });

  describe('getTotalQuantityUsedByItemId', () => {
    it('should fetch total quantity used for an item', () => {
      const mockTotal = 15;

      service.getTotalQuantityUsedByItemId('item1').subscribe(total => {
        expect(total).toBe(15);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/total-quantity/item/item1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTotal);
    });
  });

  describe('getTotalQuantityUsedByContractorId', () => {
    it('should fetch total quantity used by a contractor', () => {
      const mockTotal = 25;

      service.getTotalQuantityUsedByContractorId('contractor1').subscribe(total => {
        expect(total).toBe(25);
      });

      const req = httpMock.expectOne(`${url}/inventory-usage/total-quantity/contractor/contractor1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTotal);
    });
  });

  describe('error handling', () => {
    it('should handle network errors', () => {
      service.getAllInventoryUsage(1, 10).subscribe(
        () => fail('should have failed with network error'),
        (error) => {
          expect(error.error instanceof ErrorEvent).toBeTrue();
        }
      );

      const req = httpMock.expectOne(`${url}/inventory-usage?page=1&size=10`);
      req.error(new ErrorEvent('Network error'));
    });

    it('should handle malformed response data', () => {
      const malformedResponse = {
        usageUuid: '1',
        itemUuid: 'item1',
        // Missing required fields
      };

      service.getInventoryUsageById('1').subscribe(
        (response) => {
          expect(response).toBeDefined();
        },
        () => fail('should have handled malformed response')
      );

      const req = httpMock.expectOne(`${url}/inventory-usage/1`);
      req.flush(malformedResponse);
    });

    it('should handle timeout scenarios', fakeAsync(() => {
      service.getAllInventoryUsage(1, 10).subscribe(
        () => fail('should have timed out'),
        (error) => {
          expect(error).toBeDefined();
        }
      );

      httpMock.expectOne(`${url}/inventory-usage?page=1&size=10`);
      tick(10000);
    }));
  });
});