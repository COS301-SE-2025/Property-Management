import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BodyCoporateApiService } from './body-coporate-api.service';
import { Property, MaintenanceTask, BodyCoporate, ContractorDetails } from '../../../public-api';
import { environment } from '../../../environment';

describe('BodyCoporateApiService', () => {
  let service: BodyCoporateApiService;
  let httpMock: HttpTestingController;
  const mockApiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BodyCoporateApiService]
    });
    service = TestBed.inject(BodyCoporateApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getBuildingsLinkedtoBC', () => {
    it('should return buildings linked to a body corporate', () => {
      const mockBcId = 'bc123';
      const mockResponse = {
        buildings: [
          { buildingUuid: 'b1', name: 'Building 1', address: '123 Main St', type: 'Residential', area: 1000 },
          { buildingUuid: 'b2', name: 'Building 2', address: '456 Oak St', type: 'Commercial', area: 2000 }
        ] as Property[]
      };

      service.getBuildingsLinkedtoBC(mockBcId).subscribe(buildings => {
        expect(buildings.length).toBe(2);
        expect(buildings[0].name).toBe('Building 1');
        expect(buildings[1].name).toBe('Building 2');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/buildings/corporate/${mockBcId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getPendingTasks', () => {
    it('should filter and return pending tasks for a building', () => {
      const mockBuildingId = 'b1';
      const mockTasks = [
        { uuid: 't1', buuid: 'b1', status: 'pending', title: 'Task 1' },
        { uuid: 't2', buuid: 'b1', status: 'OPEN', title: 'Task 2' },
        { uuid: 't3', buuid: 'b2', status: 'pending', title: 'Task 3' },
        { uuid: 't4', buuid: 'b1', status: 'completed', title: 'Task 4' }
      ] as MaintenanceTask[];

      service.getPendingTasks(mockBuildingId).subscribe(tasks => {
        expect(tasks.length).toBe(3);
        expect(tasks[0].title).toBe('Task 1');
        expect(tasks[1].title).toBe('Task 2');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/maintenance`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });
  });

  describe('getBodyCoporate', () => {
    it('should return body corporate details', () => {
      const mockBcId = 'bc123';
      const mockBodyCorporate = {
        corporateUuid: 'bc123',
        corporateName: 'Test Corp',
        contributionPerSqm: 10,
        totalBudget: 100000
      } as BodyCoporate;

      service.getBodyCoporate(mockBcId).subscribe(bc => {
        expect(bc.corporateUuid).toBe('bc123');
        expect(bc.corporateName).toBe('Test Corp');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/body-corporates/${mockBcId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBodyCorporate);
    });
  });

  describe('getAndCalculateReserveFund', () => {
    it('should calculate reserve fund details correctly', () => {
      const mockBc = {
        corporateUuid: 'bc123',
        contributionPerSqm: 10
      } as BodyCoporate;
      const mockFloorArea = 100;
      const mockUnitName = 'Unit 101';

      const result = service.getAndCalculateReserveFund(mockBc, mockFloorArea, mockUnitName);

      expect(result.unitName).toBe('Unit 101');
      expect(result.floorArea).toBe(100);
      expect(result.contributionPerSqm).toBe(10);
      expect(result.annualContribution).toBe(1000);
      expect(result.partipationQuota).toBe(1);
    });
  });

  describe('getAllPublicContractors', () => {
    it('should return contractors not linked to the given corporate', () => {
      const mockCorporateId = 'bc123';
      const mockContractors = [
        { uuid: 'c1', corporate_uuid: 'bc456', name: 'Contractor 1' },
        { uuid: 'c2', corporate_uuid: 'bc123', name: 'Contractor 2' },
        { uuid: 'c3', corporate_uuid: null, name: 'Contractor 3' }
      ] as ContractorDetails[];

      const mockTrustedContractors = ['c2'];

      service.getAllPublicContractors(mockCorporateId).subscribe(contractors => {
        expect(contractors.length).toBe(2);
        expect(contractors[0].name).toBe('Contractor 1');
        expect(contractors[1].name).toBe('Contractor 3');
      });

      const req1 = httpMock.expectOne(`${mockApiUrl}/contractor`);
      expect(req1.request.method).toBe('GET');
      req1.flush(mockContractors);

      const req2 = httpMock.expectOne(`${mockApiUrl}/contractorCorporate/contractors/${mockCorporateId}`);
      expect(req2.request.method).toBe('GET');
      req2.flush(mockTrustedContractors);
    });
  });

  describe('getTrustedContractors', () => {
    it('should return contractors linked to the given corporate', () => {
      const mockCorporateId = 'bc123';
      const mockContractors = [
        'c1', 'c2'
      ];

      service.getTrustedContractors(mockCorporateId).subscribe(contractors => {
        expect(contractors.length).toBe(2);
        expect(contractors[0]).toBe('c1');
        expect(contractors[1]).toBe('c2');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/contractorCorporate/contractors/${mockCorporateId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockContractors);
    });
  });

  describe('updateContractorDetails', () => {
    it('should process image ID and update contractor details', () => {
      const mockContractor = {
        uuid: 'c1',
        name: 'Updated Contractor',
        img: 'https://example.com/uploads/12345-67890-abcde-fghij-klmno?timestamp=123'
      } as ContractorDetails;

      const expectedPayload = {
        ...mockContractor,
        img: '12345-67890-abcde-fghij-klmno'
      };

      service.updateContractorDetails(mockContractor).subscribe(contractor => {
        expect(contractor).toBeTruthy();
      });

      const req = httpMock.expectOne(`${mockApiUrl}/contractor/${mockContractor.uuid}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(expectedPayload);
      req.flush(mockContractor);
    });

    it('should handle contractor without image', () => {
      const mockContractor = {
        uuid: 'c1',
        name: 'Updated Contractor',
        img: undefined
      } as ContractorDetails;

      service.updateContractorDetails(mockContractor).subscribe(contractor => {
        expect(contractor).toBeTruthy();
      });

      const req = httpMock.expectOne(`${mockApiUrl}/contractor/${mockContractor.uuid}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body.img).toBeUndefined();
      req.flush(mockContractor);
    });
  });

  describe('updateContribution', () => {
    it('should send contribution update request', () => {
      const mockBcId = 'bc123';
      const mockContribution = 15;

      service.updateContribution(mockBcId, mockContribution).subscribe();

      const req = httpMock.expectOne(`${mockApiUrl}/body-corporates/${mockBcId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ contributionPerSqm: mockContribution });
      req.flush({});
    });
  });
});