import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { InventoryUsage } from '../../../models/inventoryUsage.model';
import { InventoryUsageApiService } from './inventory-usage-api.service';

describe('InventoryUsageApiService', () => {
  let service: InventoryUsageApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const baseUrl = '/api';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete', 'patch']);
    
    TestBed.configureTestingModule({
      providers: [
        InventoryUsageApiService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    
    service = TestBed.inject(InventoryUsageApiService);
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

      httpClientSpy.post.and.returnValue(of(mockUsage));

      service.createInventoryUsage('item1', 'task1', 'contractor1', 5).subscribe({
        next: (usage) => {
          expect(usage).toEqual(mockUsage);
          expect(httpClientSpy.post).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage`,
            expectedBody
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should handle error when creating usage record fails', () => {
      const errorResponse = new Error('Server error');
      httpClientSpy.post.and.returnValue(throwError(() => errorResponse));

      service.createInventoryUsage('item1', 'task1', 'contractor1', 5).subscribe({
        next: () => fail('expected error but got success'),
        error: (error) => {
          expect(error).toBe(errorResponse);
        }
      });
    });
  });

  describe('getAllInventoryUsage', () => {
    it('should retrieve all inventory usage records with pagination', () => {
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

      httpClientSpy.get.and.returnValue(of(mockUsages));

      service.getAllInventoryUsage(1, 10).subscribe({
        next: (usages) => {
          expect(usages).toEqual(mockUsages);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage?page=1&size=10`
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should handle empty response when no usage records exist', () => {
      httpClientSpy.get.and.returnValue(of([]));

      service.getAllInventoryUsage(1, 10).subscribe({
        next: (usages) => {
          expect(usages.length).toBe(0);
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('getInventoryUsageById', () => {
    it('should retrieve a specific usage record by usageUuid', () => {
      const mockUsage: InventoryUsage = {
        usageUuid: '1',
        itemUuid: 'item1',
        taskUuid: 'task1',
        contractorUuid: 'contractor1',
        quantityUsed: 5,
        trusteeApproval: false,
        approvedDate: new Date('2025-01-01')
      };

      httpClientSpy.get.and.returnValue(of(mockUsage));

      service.getInventoryUsageById('1').subscribe({
        next: (usage) => {
          expect(usage).toEqual(mockUsage);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/1`
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should handle 404 when usage record not found', () => {
      const errorResponse = { status: 404, statusText: 'Not Found' };
      httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

      service.getInventoryUsageById('unknown').subscribe({
        next: () => fail('expected error but got success'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });
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

      httpClientSpy.put.and.returnValue(of(mockUsage));

      service.updateInventoryUsageById('1', mockUsage).subscribe({
        next: (usage) => {
          expect(usage).toEqual(mockUsage);
          expect(httpClientSpy.put).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/1`,
            expectedBody
          );
        },
        error: () => fail('expected success but got error')
      });
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

      httpClientSpy.delete.and.returnValue(of(mockUsage));

      service.deleteInventoryUsageById('1').subscribe({
        next: (usage) => {
          expect(usage).toEqual(mockUsage);
          expect(httpClientSpy.delete).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/1`
          );
        },
        error: () => fail('expected success but got error')
      });
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

      httpClientSpy.patch.and.returnValue(of(mockUsage));

      service.ApproveOrRejectInventoryUsage('1', mockUsage).subscribe({
        next: (usage) => {
          expect(usage).toEqual(mockUsage);
          expect(httpClientSpy.patch).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/1/approval`,
            expectedBody
          );
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('getUsageRecordsByItemId', () => {
    it('should retrieve usage records for a specific item', () => {
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

      httpClientSpy.get.and.returnValue(of(mockUsages));

      service.getUsageRecordsByItemId('item1').subscribe({
        next: (usages) => {
          expect(usages).toEqual(mockUsages);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/by-itemitem1`
          );
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('getUsageRecordsByTaskId', () => {
    it('should retrieve usage records for a specific task', () => {
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

      httpClientSpy.get.and.returnValue(of(mockUsages));

      service.getUsageRecordsByTaskId('task1').subscribe({
        next: (usages) => {
          expect(usages).toEqual(mockUsages);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/task1`
          );
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('getUsageRecordsByContractorId', () => {
    it('should retrieve usage records for a specific contractor', () => {
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

      httpClientSpy.get.and.returnValue(of(mockUsages));

      service.getUsageRecordsByContractorId('contractor1').subscribe({
        next: (usages) => {
          expect(usages).toEqual(mockUsages);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/by-contractor/contractor1`
          );
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('getApprovedUsageRecords', () => {
    it('should retrieve all approved usage records', () => {
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

      httpClientSpy.get.and.returnValue(of(mockUsages));

      service.getApprovedUsageRecords().subscribe({
        next: (usages) => {
          expect(usages).toEqual(mockUsages);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/approved`
          );
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('getPendingUsageRecords', () => {
    it('should retrieve all pending approval usage records', () => {
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

      httpClientSpy.get.and.returnValue(of(mockUsages));

      service.getPendingUsageRecords().subscribe({
        next: (usages) => {
          expect(usages).toEqual(mockUsages);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/pending-approval`
          );
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('getTotalQuantityUsedByItemId', () => {
    it('should retrieve total quantity used for an item', () => {
      const mockTotal = 15;

      httpClientSpy.get.and.returnValue(of(mockTotal));

      service.getTotalQuantityUsedByItemId('item1').subscribe({
        next: (total) => {
          expect(total).toBe(15);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/total-quantity/item/item1`
          );
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('getTotalQuantityUsedByContractorId', () => {
    it('should retrieve total quantity used by a contractor', () => {
      const mockTotal = 25;

      httpClientSpy.get.and.returnValue(of(mockTotal));

      service.getTotalQuantityUsedByContractorId('contractor1').subscribe({
        next: (total) => {
          expect(total).toBe(25);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${baseUrl}/inventory-usage/total-quantity/contractor/contractor1`
          );
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  // Edge case tests
  describe('edge cases', () => {
    it('should handle null or undefined inputs in createInventoryUsage', () => {
      httpClientSpy.post.and.returnValue(of({} as InventoryUsage));

      // Test with null itemUuid
      service.createInventoryUsage(null as unknown as string, 'task1', 'contractor1', 5).subscribe({
        next: (response) => {
          expect(response).toBeDefined();
        },
        error: () => fail('expected response but got error')
      });

      // Test with undefined quantity
      service.createInventoryUsage('item1', 'task1', 'contractor1', undefined as unknown as number).subscribe({
        next: (response) => {
          expect(response).toBeDefined();
        },
        error: () => fail('expected response but got error')
      });
    });

    it('should handle malformed response data', () => {
      const malformedResponse = {
        usageUuid: '1',
        itemUuid: 'item1',
      };

      httpClientSpy.get.and.returnValue(of(malformedResponse as unknown));

      service.getInventoryUsageById('1').subscribe({
        next: (response) => {
          expect(response).toBeDefined();
        },
        error: (err) => {
          expect(err).toBeDefined();
        }
      });
    });
  });
});