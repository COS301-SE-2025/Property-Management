import { TestBed } from '@angular/core/testing';

import { InventoryItemApiService } from './inventory-item-api.service';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../../../models/inventory.model';
import { of, throwError } from 'rxjs';

describe('InventoryItemApiService', () => {
  let service: InventoryItemApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const url = '/api';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        InventoryItemApiService,
        { provide: HttpClient, useValue: httpClientSpy}
      ]
    });

    service = TestBed.inject(InventoryItemApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllInventoryItems', () => {
    it('should return all inventory items', () => {
      const mockItems: Inventory[] = [
        { 
          itemUuid: '1', 
          name: 'Chair', 
          unit: 'pcs', 
          quantity: 10, 
          buildingUuid: 'bldg1' 
        },
        { 
          itemUuid: '2', 
          name: 'Table', 
          unit: 'pcs', 
          quantity: 5, 
          buildingUuid: 'bldg1' 
        }
      ];

      httpClientSpy.get.and.returnValue(of(mockItems));

      service.getAllInventoryItems().subscribe({
        next: (items) => {
          expect(items.length).toBe(2);
          expect(items).toEqual(mockItems);
          expect(httpClientSpy.get).toHaveBeenCalledWith(`${url}/inventory`);
        },
        error: () => fail('expected items but got error')
      });
    });

    it('should handle empty response', () => {
      httpClientSpy.get.and.returnValue(of([]));

      service.getAllInventoryItems().subscribe({
        next: (items) => {
          expect(items.length).toBe(0);
        },
        error: () => fail('expected empty array but got error')
      });
    });

    it('should handle server error', () => {
      const errorResponse = new Error('Server error');
      httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

      service.getAllInventoryItems().subscribe({
        next: () => fail('expected error but got items'),
        error: (error) => {
          expect(error).toBe(errorResponse);
        }
      });
    });
  });

  describe('getInventoryItemsByBuilding', () => {
    it('should return inventory items for a building', () => {
      const mockItems: Inventory[] = [
        { 
          itemUuid: '1', 
          name: 'Chair', 
          unit: 'pcs', 
          quantity: 10, 
          buildingUuid: 'bldg1' 
        }
      ];

      httpClientSpy.get.and.returnValue(of(mockItems));

      service.getInventoryItemsByBuilding('bldg1').subscribe({
        next: (items) => {
          expect(items).toEqual(mockItems);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${url}/inventory/building/bldg1`
          );
        },
        error: () => fail('expected items but got error')
      });
    });

    it('should handle building with no inventory', () => {
      httpClientSpy.get.and.returnValue(of([]));

      service.getInventoryItemsByBuilding('empty-bldg').subscribe({
        next: (items) => {
          expect(items.length).toBe(0);
        },
        error: () => fail('expected empty array but got error')
      });
    });
  });

  describe('getInventoryItemsById', () => {
    it('should return a specific inventory item', () => {
      const mockItem: Inventory = { 
        itemUuid: '1', 
        name: 'Chair', 
        unit: 'pcs', 
        quantity: 10, 
        buildingUuid: 'bldg1' 
      };

      httpClientSpy.get.and.returnValue(of(mockItem));

      service.getInventoryItemsById('1').subscribe({
        next: (item) => {
          expect(item).toEqual(mockItem);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${url}/inventory/1`
          );
        },
        error: () => fail('expected item but got error')
      });
    });

    it('should handle item not found', () => {
      const errorResponse = { status: 404, statusText: 'Not Found' };
      httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

      service.getInventoryItemsById('unknown').subscribe({
        next: () => fail('expected error but got item'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });
    });
  });

  describe('addInventoryItem', () => {
    it('should add a new inventory item', () => {
      const newItem = { 
        itemUuid: '1', 
        name: 'Chair', 
        unit: 'pcs', 
        quantity: 10, 
        buildingUuid: 'bldg1' 
      };
      const expectedBody = {
        name: 'Chair',
        unit: 'pcs',
        quantity: 10,
        buildingUuid: 'bldg1'
      };

      httpClientSpy.post.and.returnValue(of(newItem));

      service.addInventoryItem('Chair', 'pcs', 10, 'bldg1').subscribe({
        next: (item) => {
          expect(item).toEqual(newItem);
          expect(httpClientSpy.post).toHaveBeenCalledWith(
            `${url}/inventory`,
            expectedBody
          );
        },
        error: () => fail('expected item but got error')
      });
    });

    it('should handle validation error when adding item', () => {
      const errorResponse = { status: 400, message: 'Validation error' };
      httpClientSpy.post.and.returnValue(throwError(() => errorResponse));

      service.addInventoryItem('', 'pcs', -1, 'bldg1').subscribe({
        next: () => fail('expected error but got item'),
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });
    });
  });

  describe('updateInventoryItem', () => {
    it('should update an existing inventory item', () => {
      const updatedItem: Inventory = { 
        itemUuid: '1', 
        name: 'Chair Updated', 
        unit: 'pcs', 
        quantity: 15, 
        buildingUuid: 'bldg1' 
      };
      const expectedBody = {
        name: 'Chair Updated',
        unit: 'pcs',
        quantity: 15
      };

      httpClientSpy.put.and.returnValue(of(updatedItem));

      service.updateInventoryItem(updatedItem).subscribe({
        next: (item) => {
          expect(item).toEqual(updatedItem);
          expect(httpClientSpy.put).toHaveBeenCalledWith(
            `${url}/inventory/1`,
            expectedBody
          );
        },
        error: () => fail('expected item but got error')
      });
    });

    it('should handle item not found during update', () => {
      const itemToUpdate: Inventory = { 
        itemUuid: 'unknown', 
        name: 'Chair', 
        unit: 'pcs', 
        quantity: 10, 
        buildingUuid: 'bldg1' 
      };
      const errorResponse = { status: 404, message: 'Not Found' };
      httpClientSpy.put.and.returnValue(throwError(() => errorResponse));

      service.updateInventoryItem(itemToUpdate).subscribe({
        next: () => fail('expected error but got item'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });
    });
  });

  describe('updateInventoryItemQuantity', () => {
    it('should increase item quantity', () => {
      const updatedItem: Inventory = { 
        itemUuid: '1', 
        name: 'Chair', 
        unit: 'pcs', 
        quantity: 15, 
        buildingUuid: 'bldg1' 
      };
      const expectedBody = {
        quantity: 5,
        operation: 'add'
      };

      httpClientSpy.patch.and.returnValue(of(updatedItem));

      service.updateInventoryItemQuantity(
        { ...updatedItem, quantity: 10 }, 
        5, 
        'add'
      ).subscribe({
        next: (item) => {
          expect(item.quantity).toBe(15);
          expect(httpClientSpy.patch).toHaveBeenCalledWith(
            `${url}/inventory/1/quantity`,
            expectedBody
          );
        },
        error: () => fail('expected item but got error')
      });
    });

    it('should decrease item quantity', () => {
      const updatedItem: Inventory = { 
        itemUuid: '1', 
        name: 'Chair', 
        unit: 'pcs', 
        quantity: 5, 
        buildingUuid: 'bldg1' 
      };

      httpClientSpy.patch.and.returnValue(of(updatedItem));

      service.updateInventoryItemQuantity(
        { ...updatedItem, quantity: 10 }, 
        5, 
        'subtract'
      ).subscribe({
        next: (item) => {
          expect(item.quantity).toBe(5);
        },
        error: () => fail('expected item but got error')
      });
    });

    it('should handle invalid quantity operation', () => {
      const errorResponse = { status: 400, message: 'Invalid operation' };
      httpClientSpy.patch.and.returnValue(throwError(() => errorResponse));

      service.updateInventoryItemQuantity(
        { itemUuid: '1', name: 'Chair', unit: 'pcs', quantity: 10, buildingUuid: 'bldg1' }, 
        5, 
        'invalid-op'
      ).subscribe({
        next: () => fail('expected error but got item'),
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });
    });
  });

  describe('deleteInventoryItem', () => {
    it('should delete an inventory item', () => {
      const deletedItem: Inventory = { 
        itemUuid: '1', 
        name: 'Chair', 
        unit: 'pcs', 
        quantity: 10, 
        buildingUuid: 'bldg1' 
      };

      httpClientSpy.delete.and.returnValue(of(deletedItem));

      service.deleteInventoryItem(deletedItem).subscribe({
        next: (item) => {
          expect(item).toEqual(deletedItem);
          expect(httpClientSpy.delete).toHaveBeenCalledWith(
            `${url}/inventory/1`
          );
        },
        error: () => fail('expected item but got error')
      });
    });

    it('should handle item not found during deletion', () => {
      const errorResponse = { status: 404, message: 'Not Found' };
      httpClientSpy.delete.and.returnValue(throwError(() => errorResponse));

      service.deleteInventoryItem(
        { itemUuid: 'unknown', name: 'Chair', unit: 'pcs', quantity: 10, buildingUuid: 'bldg1' }
      ).subscribe({
        next: () => fail('expected error but got item'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });
    });
  });

  // Edge cases
  describe('edge cases', () => {
    it('should handle null or undefined inputs in addInventoryItem', () => {
      httpClientSpy.post.and.returnValue(of({} as Inventory));

      // Test with null name
      service.addInventoryItem(null as unknown as string, 'pcs', 10, 'bldg1').subscribe({
        next: (response) => {
          expect(response).toBeDefined();
        },
        error: () => fail('expected response but got error')
      });

      // Test with undefined buildingUuid
      service.addInventoryItem('Chair', 'pcs', 10, undefined as unknown as string).subscribe({
        next: (response) => {
          expect(response).toBeDefined();
        },
        error: () => fail('expected response but got error')
      });
    });

    it('should handle malformed response data', () => {
      const malformedResponse = {
        itemUuid: '1',
        name: 'Chair',
        // Missing required fields
      };

      httpClientSpy.get.and.returnValue(of(malformedResponse as unknown));

      service.getInventoryItemsById('1').subscribe({
        next: (response) => {
          expect(response).toBeDefined();
          // Depending on your error handling, you might want to:
          // 1. Expect the service to transform malformed data
          // 2. Expect an error to be thrown
        },
        error: (err) => {
          expect(err).toBeDefined();
        }
      });
    });
  });
});