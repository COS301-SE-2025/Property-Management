import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { BudgetApiService } from "./budget-api.service";
import { BuildingApiService } from "../Building api/building-api.service";

describe('BudgetApiService Integration Tests', () => {
  let budgetService: BudgetApiService;
  let buildingService: BuildingApiService;
  let testBuildingUuid: string | undefined;

  beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BudgetApiService, BuildingApiService]
    });

    budgetService = TestBed.inject(BudgetApiService);
    buildingService = TestBed.inject(BuildingApiService);

    buildingService.createBuilding(
      "Test Building",
      "123 Test Street",
      "Residential",
      500000,
      [], 
      new Date().toISOString(),
      "test.png",
      "test-trustee",
      100
    ).subscribe(building => {
      testBuildingUuid = building.buildingUuid;
      expect(testBuildingUuid).toBeTruthy();
      done();
    });
  });

  afterEach((done) => {
    if (testBuildingUuid) {
      buildingService.deleteBuilding(testBuildingUuid).subscribe({
        next: () => done(),
        error: () => done()
      });
    } else {
      done();
    }
  });

  it('should create and retrieve a budget', (done) => {
    const mockDate = new Date('2025-01-01');

    budgetService.createBudget(100000, 40000, 60000, mockDate, testBuildingUuid!).subscribe(created => {
      expect(created).toBeTruthy();
      expect(created.buildingUuid).toBe(testBuildingUuid!);

      budgetService.getBudgetById(created.budgetUuid!).subscribe(fetched => {
        expect(fetched.budgetUuid).toBe(created.budgetUuid);
        expect(fetched.totalBudget).toBe(100000);
        done();
      });
    });
  });

  it('should get all budgets', (done) => {
    budgetService.getAllBudgets().subscribe(budgets => {
      expect(Array.isArray(budgets)).toBeTrue();
      expect(budgets.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should handle 400 when budget not found', (done) => {
    budgetService.getBudgetById('nonexistent').subscribe({
      next: () => fail('Expected 400, but got success'),
      error: (err) => {
        expect(err.status).toBe(400);
        done();
      }
    });
  });
});
