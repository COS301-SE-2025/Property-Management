import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BudgetApiService } from "./budget-api.service"
import { TestBed } from "@angular/core/testing";
import { BuildingDetails } from "../../../models/buildingDetails.model";

describe('BudgetApiService Integration Tests', () => {
    let service: BudgetApiService;
    let httpMock: HttpTestingController;
    const url = '/api';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BudgetApiService]
        });

        service = TestBed.inject(BudgetApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create a budget and return the created budget', () => {
        const mockDate = new Date('2025-01-01');
        const mockResponse: BuildingDetails = {
            budgetUuid: '1',
            totalBudget: 100000,
            maintenanceBudget: 40000,
            inventoryBudget: 60000,
            approvalDate: mockDate,
            buildingUuid: 'bldg1'
        };

        service.createBudget(100000, 40000, 60000, mockDate, 'bldg1').subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${url}/budgets`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({
            year: 2025,
            totalBudget: 100000,
            maintenanceBudget: 40000,
            inventoryBudget: 60000,
            approvalDate: mockDate,
            buildingUuid: 'bldg1'
        });

        req.flush(mockResponse);
    });
    it('should retrieve a budget by id', () => {
        const mockResponse: BuildingDetails = {
            budgetUuid: '1',
            totalBudget: 100000,
            maintenanceBudget: 40000,
            inventoryBudget: 60000,
            approvalDate: new Date('2025-01-01'),
            buildingUuid: 'bldg1'
        };

        service.getBudgetById('1').subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${url}/budgets/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
    it('should retrieve all budgets', () => {
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

        service.getAllBudgets().subscribe(response => {
            expect(response.length).toBe(2);
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${url}/budgets`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
    it('should retrieve budgets by building id', () => {
        const mockResponse: BuildingDetails = {
            budgetUuid: '1',
            totalBudget: 100000,
            maintenanceBudget: 40000,
            inventoryBudget: 60000,
            approvalDate: new Date('2025-01-01'),
            buildingUuid: 'bldg1'
        };

        service.getBudgetsByBuildingId('bldg1').subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${url}/budgets/building/bldg1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
    it('should retrieve budgets by year', () => {
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

        service.getBudgetsByYear('2025').subscribe(response => {
            expect(response.length).toBe(1);
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${url}/budgets/year/2025`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
    it('should retrieve budgets by building id and year', () => {
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

        service.getBudgetsByBuildingIdAndYear('bldg1', '2025').subscribe(response => {
            expect(response.length).toBe(1);
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${url}/budgets/building/bldg1/year/2025`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
    it('should update a budget', () => {
        const mockDate = new Date('2025-01-01');
        const mockBudget: BuildingDetails = {
            budgetUuid: '1',
            totalBudget: 120000,
            maintenanceBudget: 50000,
            inventoryBudget: 70000,
            approvalDate: mockDate,
            buildingUuid: 'bldg1'
        };

        service.updateBudget('1', mockBudget).subscribe(response => {
            expect(response).toEqual(mockBudget);
        });

        const req = httpMock.expectOne(`${url}/budgets/1`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual({
            year: 2025,
            totalBudget: 120000,
            maintenanceBudget: 50000,
            inventoryBudget: 70000,
            approvalDate: mockDate,
            buildingUuid: 'bldg1'
        });

        req.flush(mockBudget);
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

        service.deleteBudget('1').subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${url}/budgets/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush(mockResponse);
    });
    it('should handle 404 error when getting a non-existent budget', () => {
        service.getBudgetById('nonexistent').subscribe(
            () => fail('should have failed with 404 error'),
            (error) => {
            expect(error.status).toBe(404);
            }
        );

        const req = httpMock.expectOne(`${url}/budgets/nonexistent`);
            req.flush('Not found', { status: 404, statusText: 'Not Found' });
        });

        it('should handle server error when creating a budget', () => {
        const mockDate = new Date('2023-01-01');
        
        service.createBudget(100000, 40000, 60000, mockDate, 'bldg1').subscribe(
            () => fail('should have failed with server error'),
            (error) => {
            expect(error.status).toBe(500);
            }
        );

        const req = httpMock.expectOne(`${url}/budgets`);
            req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
})