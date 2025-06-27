import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryItemApiService } from './inventory-item-api.service';
import { Inventory } from '../../../models/inventory.model';

describe('InventoryItemApiService Integration Tests', () => {
  let service: InventoryItemApiService;
  let httpMock: HttpTestingController;
  const url = '/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryItemApiService]
    });

    service = TestBed.inject(InventoryItemApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAllInventoryItems', () => {
    it('should fetch all inventory items', () => {
      const mockItems: Inventory[] = [
        { 
          itemUuid: '1', 
          name: 'Chair', 
          unit: 'pcs', 
          quantityInStock: 10, 
          buildingUuid: 'bldg1',
          price: 50 
        },
        { 
          itemUuid: '2', 
          name: 'Table', 
          unit: 'pcs', 
          quantityInStock: 5, 
          buildingUuid: 'bldg1',
          price: 50 
        }
      ];

      service.getAllInventoryItems().subscribe(items => {
        expect(items.length).toBe(2);
        expect(items).toEqual(mockItems);
      });

      const req = httpMock.expectOne(`${url}/inventory`);
      expect(req.request.method).toBe('GET');
      req.flush(mockItems);
    });

    it('should handle empty inventory list', () => {
      service.getAllInventoryItems().subscribe(items => {
        expect(items.length).toBe(0);
      });

      const req = httpMock.expectOne(`${url}/inventory`);
      req.flush([]);
    });

    it('should handle server error when fetching items', () => {
      service.getAllInventoryItems().subscribe(
        () => fail('should have failed with server error'),
        (error) => {
          expect(error.status).toBe(500);
        }
      );

      const req = httpMock.expectOne(`${url}/inventory`);
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getInventoryItemsByBuilding', () => {
    it('should fetch inventory items for a specific building', () => {
      const mockItems: Inventory[] = [
        { 
          itemUuid: '1', 
          name: 'Chair', 
          unit: 'pcs', 
          quantityInStock: 10, 
          buildingUuid: 'bldg1',
          price: 50  
        }
      ];

      service.getInventoryItemsByBuilding('bldg1').subscribe(items => {
        expect(items).toEqual(mockItems);
      });

      const req = httpMock.expectOne(`${url}/inventory/building/bldg1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockItems);
    });

    it('should handle building with no inventory items', () => {
      service.getInventoryItemsByBuilding('empty-bldg').subscribe(items => {
        expect(items.length).toBe(0);
      });

      const req = httpMock.expectOne(`${url}/inventory/building/empty-bldg`);
      req.flush([]);
    });
  });

  describe('getInventoryItemsById', () => {
    it('should fetch a specific inventory item by ID', () => {
      const mockItem: Inventory = { 
        itemUuid: '1', 
        name: 'Chair', 
        unit: 'pcs', 
        quantityInStock: 10, 
        buildingUuid: 'bldg1',
        price: 50  
      };

      service.getInventoryItemsById('1').subscribe(item => {
        expect(item).toEqual(mockItem);
      });

      const req = httpMock.expectOne(`${url}/inventory/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockItem);
    });

    it('should handle item not found', () => {
      service.getInventoryItemsById('unknown').subscribe(
        () => fail('should have failed with 404 error'),
        (error) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne(`${url}/inventory/unknown`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addInventoryItem', () => {
    it('should add a new inventory item', () => {
      const newItem = { 
        itemUuid: '1', 
        name: 'Chair', 
        unit: 'pcs', 
        quantityInStock: 10, 
        buildingUuid: 'bldg1',
        price: 50 
      };
      const expectedBody = {
        name: 'Chair',
        unit: 'pcs',
        quantity: 10,
        buildingUuid: 'bldg1',
        price: 50 
      };

      service.addInventoryItem('Chair', 'pcs', 50, 10, 'bldg1').subscribe(item => {
        expect(item).toEqual(newItem);
      });

      const req = httpMock.expectOne(`${url}/inventory`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(expectedBody);
      req.flush(newItem);
    });

    it('should handle validation error when adding item', () => {
      service.addInventoryItem('', 'pcs', -1, 50, 'bldg1').subscribe(
        () => fail('should have failed with 400 error'),
        (error) => {
          expect(error.status).toBe(400);
        }
      );

      const req = httpMock.expectOne(`${url}/inventory`);
      req.flush('Validation error', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateInventoryItem', () => {
    it('should update an existing inventory item', () => {
      const updatedItem: Inventory = { 
        itemUuid: '1', 
        name: 'Chair Updated', 
        unit: 'pcs', 
        quantityInStock: 15, 
        buildingUuid: 'bldg1',
        price: 50  
      };
      const expectedBody = {
        name: 'Chair Updated',
        unit: 'pcs',
        quantity: 15,
        price: 50 
      };

      service.updateInventoryItem(updatedItem).subscribe(item => {
        expect(item).toEqual(updatedItem);
      });

      const req = httpMock.expectOne(`${url}/inventory/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(expectedBody);
      req.flush(updatedItem);
    });

    it('should handle item not found during update', () => {
      const itemToUpdate: Inventory = { 
        itemUuid: 'unknown', 
        name: 'Chair', 
        unit: 'pcs', 
        quantityInStock: 10, 
        buildingUuid: 'bldg1',
        price: 50  
      };

      service.updateInventoryItem(itemToUpdate).subscribe(
        () => fail('should have failed with 404 error'),
        (error) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne(`${url}/inventory/unknown`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('updateInventoryItemQuantity', () => {
    it('should increase item quantityInStock via PATCH', () => {
      const updatedItem: Inventory = { 
        itemUuid: '1', 
        name: 'Chair', 
        unit: 'pcs', 
        quantityInStock: 15, 
        buildingUuid: 'bldg1',
        price: 50  
      };
      const expectedBody = {
        quantity: 5,
        operation: 'add'
      };

      service.updateInventoryItemQuantity(
        { ...updatedItem, quantityInStock: 10 }, 
        5, 
        'add'
      ).subscribe(item => {
        expect(item.quantityInStock).toBe(15);
      });

      const req = httpMock.expectOne(`${url}/inventory/1/quantity`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(expectedBody);
      req.flush(updatedItem);
    });

    it('should decrease item quantityInStock via PATCH', () => {
      const updatedItem: Inventory = { 
        itemUuid: '1', 
        name: 'Chair', 
        unit: 'pcs', 
        quantityInStock: 5, 
        buildingUuid: 'bldg1',
        price: 50  
      };

      service.updateInventoryItemQuantity(
        { ...updatedItem, quantityInStock: 10 }, 
        5, 
        'subtract'
      ).subscribe(item => {
        expect(item.quantityInStock).toBe(5);
      });

      const req = httpMock.expectOne(`${url}/inventory/1/quantity`);
      req.flush(updatedItem);
    });

    it('should handle invalid quantityInStock operation', () => {
      service.updateInventoryItemQuantity(
        { itemUuid: '1', name: 'Chair', unit: 'pcs', quantityInStock: 10, price: 50, buildingUuid: 'bldg1' }, 
        5, 
        'invalid-op'
      ).subscribe(
        () => fail('should have failed with 400 error'),
        (error) => {
          expect(error.status).toBe(400);
        }
      );

      const req = httpMock.expectOne(`${url}/inventory/1/quantity`);
      req.flush('Invalid operation', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('deleteInventoryItem', () => {
    it('should delete an inventory item', () => {
      const deletedItem: Inventory = { 
        itemUuid: '1', 
        name: 'Chair', 
        unit: 'pcs', 
        quantityInStock: 10, 
        buildingUuid: 'bldg1',
        price: 50 
      };

      service.deleteInventoryItem(deletedItem).subscribe(item => {
        expect(item).toEqual(deletedItem);
      });

      const req = httpMock.expectOne(`${url}/inventory/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(deletedItem);
    });

    it('should handle item not found during deletion', () => {
      service.deleteInventoryItem(
        { itemUuid: 'unknown', name: 'Chair', unit: 'pcs', quantityInStock: 10, price: 50, buildingUuid: 'bldg1' }
      ).subscribe(
        () => fail('should have failed with 404 error'),
        (error) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne(`${url}/inventory/unknown`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('error handling', () => {
    it('should handle network errors', () => {
      service.getAllInventoryItems().subscribe(
        () => fail('should have failed with network error'),
        (error) => {
          expect(error.error instanceof ErrorEvent).toBeTrue();
        }
      );

      const req = httpMock.expectOne(`${url}/inventory`);
      req.error(new ErrorEvent('Network error'));
    });

    it('should handle malformed response data', () => {
      const malformedResponse = {
        itemUuid: '1',
        name: 'Chair',
      };

      service.getInventoryItemsById('1').subscribe(
        (response) => {
          expect(response).toBeDefined();
        },
        () => fail('should have handled malformed response')
      );

      const req = httpMock.expectOne(`${url}/inventory/1`);
      req.flush(malformedResponse);
    });

    it('should handle timeout', fakeAsync(() => {
      service.getAllInventoryItems().subscribe(
        () => fail('should have timed out'),
        (error) => {
          expect(error).toBeDefined();
        }
      );

      httpMock.expectOne(`${url}/inventory`);
      tick(10000);
    }));
  });
});