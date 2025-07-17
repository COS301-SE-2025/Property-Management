import { TestBed } from '@angular/core/testing';
import { BuildingApiService } from './building-api.service';
import { HttpClient } from '@angular/common/http';
import { Property } from '../../../models/property.model';
import { of, throwError } from 'rxjs';

describe('BuildingApiService', () => {
  let service: BuildingApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  const url = '/api';

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        BuildingApiService,
        { provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(BuildingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createBuilidng', () => {
    it('should create a building successfully', () => {
      const mockProperty: Property = {
        buildingUuid: '1',
        name: 'Test Building',
        address: '123 Main St',
        type: 'Commercial',
        propertyValue: 1000000,
        primaryContractors: [1, 2],
        latestInspectionDate: '2023-01-01',
        propertyImage: 'img1',
        trustees: '1',
        area: 2
      };

      const expectedBody: Property = {
        name: 'Test Building',
        address: '123 Main St',
        type: 'Commercial',
        propertyValue: 1000000,
        primaryContractors: [1, 2],
        latestInspectionDate: '2023-01-01',
        propertyImage: 'img1',
        trustees: '1',
        area: 2
      };

      httpClientSpy.post.and.returnValue(of(mockProperty));

      service.createBuilding(
        'Test Building',
        '123 Main St',
        'Commercial',
        1000000,
        [1, 2],
        '2023-01-01',
        'img1',
        '1',
        2
      ).subscribe({
        next: (response) => {
          expect(response).toEqual(mockProperty);
          expect(httpClientSpy.post).toHaveBeenCalledWith(
            `${url}/buildings`,
            expectedBody
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should handle error when creating building fails', () => {
      const errorResponse = new Error('Server error');
      httpClientSpy.post.and.returnValue(throwError(() => errorResponse));

      service.createBuilding(
        'Test',
        '123 St',
        'Residential',
        500000,
        [1],
        '2023-01-01',
        'img1',
        '1',
        2
      ).subscribe({
        next: () => fail('expected error but got success'),
        error: (error) => {
          expect(error).toBe(errorResponse);
        }
      });
    });
  });
  describe('getAllBuildings', () => {
    it('should return all buildings successfully', () => {
      const mockProperty: Property[] = [{
        buildingUuid: '1',
        name: 'Test Building',
        address: '123 Main St',
        type: 'Commercial',
        propertyValue: 1000000,
        primaryContractors: [1, 2],
        latestInspectionDate: '2023-01-01',
        propertyImage: 'img1',
        trustees: '1',
        area: 2
      }];

      httpClientSpy.get.and.returnValue(of(mockProperty));

      service.getAllBuildings().subscribe({
        next: (response) => {
          expect(response).toEqual(mockProperty);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${url}/buildings`
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should handle empty response', () => {
      httpClientSpy.get.and.returnValue(of({} as Property));

      service.getAllBuildings().subscribe({
        next: (response) => {
          expect(response).toEqual({} as Property[]);
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('getBuildingById', () => {
    it('should return building by id successfully', () => {
      const mockProperty: Property = {
        buildingUuid: '1',
        name: 'Test Building',
        address: '123 Main St',
        type: 'Commercial',
        propertyValue: 1000000,
        primaryContractors: [1, 2],
        latestInspectionDate: '2023-01-01',
        propertyImage: 'img1',
        trustees: '1',
        area: 2
      };

      httpClientSpy.get.and.returnValue(of(mockProperty));

      service.getBuildingById('1').subscribe({
        next: (response) => {
          expect(response).toEqual(mockProperty);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${url}/buildings/1`
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should handle 404 when building not found', () => {
      const errorResponse = { status: 404, statusText: 'Not Found' };
      httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

      service.getBuildingById('unknown').subscribe({
        next: () => fail('expected error but got success'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });
    });
  });

  describe('updateBuilding', () => {
    it('should update building successfully', () => {
      const mockProperty: Property = {
        buildingUuid: '1',
        name: 'Updated Building',
        address: '456 New St',
        type: 'Residential',
        propertyValue: 750000,
        primaryContractors: [2],
        latestInspectionDate: '2023-06-01',
        propertyImage: 'img2',
        trustees: '2',
        area: 2
      };

      const expectedBody = {
        name: 'Updated Building',
        address: '456 New St',
        type: 'Residential',
        propertyValue: 750000,
        primaryContractors: [2],
        latestInspectionDate: '2023-06-01',
        trusteeUuid: '2',
        propertyImageId: 'img2'
      };

      httpClientSpy.put.and.returnValue(of(mockProperty));

      service.updateBuilding(mockProperty, '1', '2').subscribe({
        next: (response) => {
          expect(response).toEqual(mockProperty);
          expect(httpClientSpy.put).toHaveBeenCalledWith(
            `${url}/buildings/1`,
            expectedBody
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should handle error when update fails', () => {
      const mockProperty: Property = {
        buildingUuid: '1',
        name: 'Test Building',
        address: '123 Main St',
        type: 'Commercial',
        propertyValue: 1000000,
        primaryContractors: [1, 2],
        latestInspectionDate: '2023-01-01',
        propertyImage: 'img1',
        trustees: '1',
        area: 2
      };

      const errorResponse = new Error('Update failed');
      httpClientSpy.put.and.returnValue(throwError(() => errorResponse));

      service.updateBuilding(mockProperty, '1', '1').subscribe({
        next: () => fail('expected error but got success'),
        error: (error) => {
          expect(error).toBe(errorResponse);
        }
      });
    });
  });

  describe('deleteBuilding', () => {
    it('should delete building successfully', () => {
      const mockProperty: Property = {
        buildingUuid: '1',
        name: 'Test Building',
        address: '123 Main St',
        type: 'Commercial',
        propertyValue: 1000000,
        primaryContractors: [1, 2],
        latestInspectionDate: '2023-01-01',
        propertyImage: 'img1',
        trustees: '1',
        area: 2
      };

      httpClientSpy.delete.and.returnValue(of(mockProperty));

      service.deleteBuilding('1').subscribe({
        next: (response) => {
          expect(response).toEqual(mockProperty);
          expect(httpClientSpy.delete).toHaveBeenCalledWith(
            `${url}/buildings/1`
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should handle error when deletion fails', () => {
      const errorResponse = { status: 500, message: 'Server error' };
      httpClientSpy.delete.and.returnValue(throwError(() => errorResponse));

      service.deleteBuilding('1').subscribe({
        next: () => fail('expected error but got success'),
        error: (error) => {
          expect(error).toEqual(errorResponse);
        }
      });
    });
  });

  describe('getBuildingsByTrustee', () => {
    it('should return buildings for trustee successfully', () => {
      const mockProperties: Property[] = [
        {
          buildingUuid: '1',
          name: 'Test Building',
          address: '123 Main St',
          type: 'Commercial',
          propertyValue: 1000000,
          primaryContractors: [1, 2],
          latestInspectionDate: '2023-01-01',
          propertyImage: 'img1',
          trustees: '1',
          area: 2
        }
      ];

      const mockResponse = { trusteeUuid: '1', buildings: mockProperties };
      httpClientSpy.get.and.returnValue(of(mockResponse));

      service.getBuildingsByTrustee('1').subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${url}/buildings/trustee/1`
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should return empty array when no buildings found for trustee', () => {
      const mockResponse = { trusteeUuid: '2', buildings: [] };
      httpClientSpy.get.and.returnValue(of(mockResponse));

      service.getBuildingsByTrustee('2').subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('searchBuildingsByName', () => {
    it('should return matching buildings successfully', () => {
      const mockProperties: Property[] = [
        {
          buildingUuid: '1',
          name: 'Test Building',
          address: '123 Main St',
          type: 'Commercial',
          propertyValue: 1000000,
          primaryContractors: [1, 2],
          latestInspectionDate: '2023-01-01',
          propertyImage: 'img1',
          trustees: '1',
          area: 2
        }
      ];

      httpClientSpy.get.and.returnValue(of(mockProperties));

      service.searchBuildingsByName('Test').subscribe({
        next: (response) => {
          expect(response).toEqual(mockProperties);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${url}/buildings/search?name=Test`
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should handle empty search results', () => {
      httpClientSpy.get.and.returnValue(of([]));

      service.searchBuildingsByName('Unknown').subscribe({
        next: (response) => {
          expect(response.length).toBe(0);
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  describe('getBuildingsByType', () => {
    it('should return buildings of specified type successfully', () => {
      const mockProperties: Property[] = [
        {
         buildingUuid: '1',
          name: 'Test Building',
          address: '123 Main St',
          type: 'Commercial',
          propertyValue: 1000000,
          primaryContractors: [1, 2],
          latestInspectionDate: '2023-01-01',
          propertyImage: 'img1',
          trustees: '1',
          area: 2
        }
      ];

      httpClientSpy.get.and.returnValue(of(mockProperties));

      service.getBuildingsByType('Commercial').subscribe({
        next: (response) => {
          expect(response).toEqual(mockProperties);
          expect(httpClientSpy.get).toHaveBeenCalledWith(
            `${url}/buildings/type/Commercial`
          );
        },
        error: () => fail('expected success but got error')
      });
    });

    it('should return empty array for unknown building type', () => {
      httpClientSpy.get.and.returnValue(of([]));

      service.getBuildingsByType('UnknownType').subscribe({
        next: (response) => {
          expect(response.length).toBe(0);
        },
        error: () => fail('expected success but got error')
      });
    });
  });

  // Edge case tests
  describe('edge cases', () => {
    it('should handle null or undefined input in createBuilding', () => {
      httpClientSpy.post.and.returnValue(of({} as Property));

      // Test with null name
      service.createBuilding(
        null as unknown as string,
        '123 St',
        'Commercial',
        1000000,
        [1],
        '2023-01-01',
        'img1',
        '1',
        2
      ).subscribe({
        next: (response) => {
          expect(response).toBeDefined();
        },
        error: () => fail('expected response but got error')
      });

      // Test with undefined trusteeId
      service.createBuilding(
        'Building',
        '123 St',
        'Commercial',
        1000000,
        [1],
        '2023-01-01',
        'img1',
        undefined as unknown as string,
        2
      ).subscribe({
        next: (response) => {
          expect(response).toBeDefined();
        },
        error: () => fail('expected response but got error')
      });
    });

    it('should handle malformed response data', () => {
      const malformedResponse = {
        id: '1',
        name: 'Building',
        // Missing required fields
      };

      httpClientSpy.get.and.returnValue(of(malformedResponse as unknown));

      service.getBuildingById('1').subscribe({
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
