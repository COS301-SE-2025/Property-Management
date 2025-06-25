import { TestBed } from '@angular/core/testing';
import { BudgetApiService } from './budget-api.service';
import { HttpClient } from '@angular/common/http';
import { BuildingDetails } from '../../../models/buildingDetails.model';
import { of, throwError } from 'rxjs';

describe('BudgetApiService', () => {
  let service: BudgetApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const url = '/api';

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'post', 'get', 'put', 'delete'
    ]);

    TestBed.configureTestingModule({
      providers: [
        BudgetApiService,
        { provide: HttpClient, useValue : httpClientSpy }
      ]
    });

    service = TestBed.inject(BudgetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and return a budget', () => {
    const mockDate = new Date('2025-06-20');
    const mockResponse: BuildingDetails = {
      budgetUuid: '1',
      buildingUuid: 'bldg1',
      totalBudget: 100000,
      maintenanceBudget: 40000,
      inventoryBudget: 60000,
      approvalDate: mockDate
    };

    const expectedRequest = {
      year: 2025,
      totalBudget: 100000,
      maintenanceBudget: 40000,
      inventoryBudget: 60000,
      approvalDate: mockDate,
      buildingUuid: 'bldg1'
    };

    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.createBudget(100000, 40000, 60000, mockDate, 'bldg1').subscribe({
      next: (response: BuildingDetails) => {
        expect(response).toEqual(mockResponse);
        expect(httpClientSpy.post).toHaveBeenCalledWith(`${url}/budgets`, expectedRequest);
      },
      error: () => fail('expected success but got error')
    });
  });
  it('should return expected budget by id', () => {
    const mockResponse: BuildingDetails = {
      budgetUuid: '1',
      totalBudget: 100000,
      maintenanceBudget: 40000,
      inventoryBudget: 60000,
      approvalDate: new Date('2025-01-01'),
      buildingUuid: 'bldg1'
    };

    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getBudgetById('1').subscribe({
      next: (response) => {
        expect(response).toEqual(mockResponse);
        expect(httpClientSpy.get).toHaveBeenCalledWith(
          `${url}/budgets/1`
        );
      },
      error: () => fail('expected success but got error')
    });
  });

  it('should handle 404 when budget not found', () => {
    const errorResponse = { status: 404, statusText: 'Not Found' };
    
    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

    service.getBudgetById('unknown').subscribe({
      next: () => fail('expected error but got success'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });
  });
  it('should return all budgets', () => {
    const mockResponse: BuildingDetails[] = [
      {
        budgetUuid: '1',
        totalBudget: 100000,
        maintenanceBudget: 40000,
        inventoryBudget: 60000,
        approvalDate: new Date('2025-01-01'),
        buildingUuid: 'bldg1'
      },
      {
        budgetUuid: '2',
        totalBudget: 150000,
        maintenanceBudget: 50000,
        inventoryBudget: 100000,
        approvalDate: new Date('2025-01-01'),
        buildingUuid: 'bldg2'
      }
    ];

    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getAllBudgets().subscribe({
      next: (response) => {
        expect(response.length).toBe(2);
        expect(response).toEqual(mockResponse);
        expect(httpClientSpy.get).toHaveBeenCalledWith(
          `${url}/budgets`
        );
      },
      error: () => fail('expected success but got error')
    });
  });

  it('should return empty array when no budgets exist', () => {
    httpClientSpy.get.and.returnValue(of([]));

    service.getAllBudgets().subscribe({
      next: (response) => {
        expect(response.length).toBe(0);
      },
      error: () => fail('expected success but got error')
    });
  });
  it('should return budgets for a building', () => {
    const mockResponse: BuildingDetails = {
      budgetUuid: '1',
      totalBudget: 100000,
      maintenanceBudget: 40000,
      inventoryBudget: 60000,
      approvalDate: new Date('2025-01-01'),
      buildingUuid: 'bldg1'
    };

    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getBudgetsByBuildingId('bldg1').subscribe({
      next: (response) => {
        expect(response).toEqual(mockResponse);
        expect(httpClientSpy.get).toHaveBeenCalledWith(
          `${url}/budgets/building/bldg1`
        );
      },
      error: () => fail('expected success but got error')
    });
  });
  it('should return budgets for a specific year', () => {
    const mockResponse: BuildingDetails[] = [
      {
        budgetUuid: '1',
        totalBudget: 100000,
        maintenanceBudget: 40000,
        inventoryBudget: 60000,
        approvalDate: new Date('2025-01-01'),
        buildingUuid: 'bldg1'
      }
    ];

    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getBudgetsByYear('2025').subscribe({
      next: (response) => {
        expect(response.length).toBe(1);
        expect(response).toEqual(mockResponse);
        expect(httpClientSpy.get).toHaveBeenCalledWith(
          `${url}/budgets/year/2025`
        );
      },
      error: () => fail('expected success but got error')
    });
  });
  it('should return budgets for building and year', () => {
    const mockResponse: BuildingDetails[] = [
      {
        budgetUuid: '1',
        totalBudget: 100000,
        maintenanceBudget: 40000,
        inventoryBudget: 60000,
        approvalDate: new Date('2025-01-01'),
        buildingUuid: 'bldg1'
      }
    ];

    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getBudgetsByBuildingIdAndYear('bldg1', '2025').subscribe({
      next: (response) => {
        expect(response.length).toBe(1);
        expect(response).toEqual(mockResponse);
        expect(httpClientSpy.get).toHaveBeenCalledWith(
          `${url}/budgets/building/bldg1/year/2025`
        );
      },
      error: () => fail('expected success but got error')
    });
  });
  it('should update a budget', () => {
    const mockDate = new Date('2023-01-01');
    const mockBudget: BuildingDetails = {
      budgetUuid: '1',
      totalBudget: 120000,
      maintenanceBudget: 50000,
      inventoryBudget: 70000,
      approvalDate: mockDate,
      buildingUuid: 'bldg1'
    };

    const expectedBody = {
      year: 2023,
      totalBudget: 120000,
      maintenanceBudget: 50000,
      inventoryBudget: 70000,
      approvalDate: mockDate,
      buildingUuid: 'bldg1'
    };

    httpClientSpy.put.and.returnValue(of(mockBudget));

    service.updateBudget('bldg1', mockBudget).subscribe({
      next: (response) => {
        expect(response).toEqual(mockBudget);
        expect(httpClientSpy.put).toHaveBeenCalledWith(
          `${url}/budgets/bldg1`, 
          expectedBody
        );
      },
      error: () => fail('expected success but got error')
    });
  });
  it('should delete a budget', () => {
    const mockResponse: BuildingDetails = {
      budgetUuid: '1',
      totalBudget: 100000,
      maintenanceBudget: 40000,
      inventoryBudget: 60000,
      approvalDate: new Date('2023-01-01'),
      buildingUuid: 'bldg1'
    };

    httpClientSpy.delete.and.returnValue(of(mockResponse));

    service.deleteBudget('1').subscribe({
      next: (response) => {
        expect(response).toEqual(mockResponse);
        expect(httpClientSpy.delete).toHaveBeenCalledWith(
          `${url}/budgets/1`
        );
      },
      error: () => fail('expected success but got error')
    });
  });

  it('should handle error when deletion fails', () => {
    const errorResponse = { status: 500, message: 'Server error' };
    
    httpClientSpy.delete.and.returnValue(throwError(() => errorResponse));

    service.deleteBudget('1').subscribe({
      next: () => fail('expected error but got success'),
      error: (error) => {
        expect(error).toEqual(errorResponse);
      }
    });
  });
});
