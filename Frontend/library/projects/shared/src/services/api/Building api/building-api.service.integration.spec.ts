import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { BuildingApiService } from "./building-api.service";
import { Property } from "../../../models/property.model";

describe('BuildingApiService Integration Tests', () => {
    let service: BuildingApiService;
    let httpMock: HttpTestingController;
    const url = '/api';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BuildingApiService]
        });

        service = TestBed.inject(BuildingApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('createBuilding', () => {
    it('should create a building and return the created property', () => {
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

      const expectedBody = {
        name: 'Test Building',
        address: '123 Main St',
        type: 'Commercial',
        propertyValue: 1000000,
        primaryContractors: [1, 2],
        latestInspectionDate: '2023-01-01',
        trustees: '1',
        propertyImage: 'img1',
        area: 2
      };

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
      ).subscribe(response => {
        expect(response).toEqual(mockProperty);
      });

      const req = httpMock.expectOne(`${url}/buildings`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(expectedBody);
      req.flush(mockProperty);
    });

    it('should handle server error when creating building fails', () => {
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
      ).subscribe(
        () => fail('should have failed with server error'),
        (error) => {
          expect(error.status).toBe(500);
        }
      );

      const req = httpMock.expectOne(`${url}/buildings`);
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getAllBuildings', () => {
    it('should retrieve all buildings from the API', () => {
      const mockProperties: Property[] = [
        {
          buildingUuid: '1',
          name: 'Building A',
          address: '123 St',
          type: 'Commercial',
          propertyValue: 1000000,
          primaryContractors: [1],
          latestInspectionDate: '2023-01-01',
          propertyImage: 'img1',
          trustees: '1',
          area: 2
        },
        {
          buildingUuid: '2',
          name: 'Building B',
          address: '456 St',
          type: 'Residential',
          propertyValue: 500000,
          primaryContractors: [2],
          latestInspectionDate: '2023-02-01',
          propertyImage: 'img2',
          trustees: '2',
          area: 2
        }
      ];

      service.getAllBuildings().subscribe(response => {
        expect(response).toEqual(mockProperties);
      });

      const req = httpMock.expectOne(`${url}/buildings`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProperties);
    });

    it('should handle empty response when no buildings exist', () => {
      service.getAllBuildings().subscribe(response => {
        expect(response).toEqual([]);
      });

      const req = httpMock.expectOne(`${url}/buildings`);
      req.flush([]);
    });
  });

  describe('getBuildingById', () => {
    it('should retrieve a specific building by buildingUuid', () => {
      const mockProperty: Property = {
        buildingUuid: '1',
        name: 'Building A',
        address: '123 St',
        type: 'Commercial',
        propertyValue: 1000000,
        primaryContractors: [1],
        latestInspectionDate: '2023-01-01',
        propertyImage: 'img1',
        trustees: '1',
        area: 2
      };

      service.getBuildingById('1').subscribe(response => {
        expect(response).toEqual(mockProperty);
      });

      const req = httpMock.expectOne(`${url}/buildings/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProperty);
    });

    it('should handle 404 when building is not found', () => {
      service.getBuildingById('unknown').subscribe(
        () => fail('should have failed with 404 error'),
        (error) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne(`${url}/buildings/unknown`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('updateBuilding', () => {
    it('should update a building successfully', () => {
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

      service.updateBuilding(mockProperty, '1', '2').subscribe(response => {
        expect(response).toEqual(mockProperty);
      });

      const req = httpMock.expectOne(`${url}/buildings/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(expectedBody);
      req.flush(mockProperty);
    });

    it('should handle validation error when updating building', () => {
      const mockProperty: Property = {
        buildingUuid: '1',
        name: 'Building',
        address: '123 St',
        type: 'Commercial',
        propertyValue: 1000000,
        primaryContractors: [1],
        latestInspectionDate: '2023-01-01',
        propertyImage: 'img1',
        trustees: '1',
        area: 2
      };

      service.updateBuilding(mockProperty, '1', '1').subscribe(
        () => fail('should have failed with 400 error'),
        (error) => {
          expect(error.status).toBe(400);
        }
      );

      const req = httpMock.expectOne(`${url}/buildings/1`);
      req.flush('Validation error', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('deleteBuilding', () => {
    it('should delete a building successfully', () => {
      const mockProperty: Property = {
        buildingUuid: '1',
        name: 'Building A',
        address: '123 St',
        type: 'Commercial',
        propertyValue: 1000000,
        primaryContractors: [1],
        latestInspectionDate: '2023-01-01',
        propertyImage: 'img1',
        trustees: '1',
        area: 2
      };

      service.deleteBuilding('1').subscribe(response => {
        expect(response).toEqual(mockProperty);
      });

      const req = httpMock.expectOne(`${url}/buildings/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockProperty);
    });

    it('should handle error when deletion fails', () => {
      service.deleteBuilding('1').subscribe(
        () => fail('should have failed with 500 error'),
        (error) => {
          expect(error.status).toBe(500);
        }
      );

      const req = httpMock.expectOne(`${url}/buildings/1`);
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getBuildingsByTrustee', () => {
    it('should retrieve buildings for a specific trustee', () => {
      const mockProperties: Property[] = [
        {
          buildingUuid: '1',
          name: 'Trustee Building',
          address: '123 St',
          type: 'Commercial',
          propertyValue: 1000000,
          primaryContractors: [1],
          latestInspectionDate: '2023-01-01',
          propertyImage: 'img1',
          trustees: '1',
          area: 2
        }
      ];

      const mockResponse = { trusteeUuid: '1', buildings: mockProperties };

      service.getBuildingsByTrustee('1').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${url}/buildings/trustee/1`);
      expect(req.request.method).toBe('GET');
      req.flush({trusteeUuid: '1', buildings: mockProperties });
    });

    it('should return empty array when trustee has no buildings', () => {
      const mockResponse = { trusteeUuid: '2', buildings: [] };

      service.getBuildingsByTrustee('2').subscribe(response => {
        expect(response).toEqual(mockResponse)
      });

      const req = httpMock.expectOne(`${url}/buildings/trustee/2`);
      req.flush({trusteeUuid: '2', buildings: []});
    });
  });

  describe('searchBuildingsByName', () => {
    it('should return buildings matching the search term', () => {
      const mockProperties: Property[] = [
        {
          buildingUuid: '1',
          name: 'Test Building',
          address: '123 St',
          type: 'Commercial',
          propertyValue: 1000000,
          primaryContractors: [1],
          latestInspectionDate: '2023-01-01',
          propertyImage: 'img1',
          trustees: '1',
          area: 2
        }
      ];

      service.searchBuildingsByName('Test').subscribe(response => {
        expect(response).toEqual(mockProperties);
      });

      const req = httpMock.expectOne(`${url}/buildings/search?name=Test`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProperties);
    });

    it('should handle URL encoding for search terms', () => {
      const searchTerm = 'Test Building 123';
      const encodedTerm = encodeURIComponent(searchTerm);

      service.searchBuildingsByName(searchTerm).subscribe();

      const req = httpMock.expectOne(`${url}/buildings/search?name=${encodedTerm}`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });

  describe('getBuildingsByType', () => {
    it('should return buildings of the specified type', () => {
      const mockProperties: Property[] = [
        {
          buildingUuid: '1',
          name: 'Commercial Building',
          address: '123 St',
          type: 'Commercial',
          propertyValue: 1000000,
          primaryContractors: [1],
          latestInspectionDate: '2023-01-01',
          propertyImage: 'img1',
          trustees: '1',
          area: 2
        }
      ];

      service.getBuildingsByType('Commercial').subscribe(response => {
        expect(response).toEqual(mockProperties);
      });

      const req = httpMock.expectOne(`${url}/buildings/type/Commercial`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProperties);
    });

    it('should handle building types with special characters', () => {
      const buildingType = 'Mixed-Use';
      const encodedType = encodeURIComponent(buildingType);

      service.getBuildingsByType(buildingType).subscribe();

      const req = httpMock.expectOne(`${url}/buildings/type/${encodedType}`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });

  describe('error handling', () => {
    it('should handle network errors', () => {
      service.getAllBuildings().subscribe(
        () => fail('should have failed with network error'),
        (error) => {
          expect(error.error instanceof ErrorEvent).toBeTrue();
        }
      );

      const req = httpMock.expectOne(`${url}/buildings`);
      req.error(new ErrorEvent('Network error'));
    });

    it('should handle malformed response data', () => {
      const malformedResponse = {
        buildingUuid: '1',
        name: 'Building',
        // Missing required fields
      };

      service.getBuildingById('1').subscribe(
        (response) => {
          // Depending on your error handling, you might want to:
          // 1. Expect the service to transform malformed data
          // 2. Expect an error to be thrown
          expect(response).toBeDefined();
        },
        () => fail('should have handled malformed response')
      );

      const req = httpMock.expectOne(`${url}/buildings/1`);
      req.flush(malformedResponse);
    });
  });
});