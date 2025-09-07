import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { InventoryItemApiService } from "./inventory-item-api.service";
import { BuildingApiService } from "../Building api/building-api.service";
import { forkJoin } from "rxjs";

describe('InventoryItemApiService Integration Tests', () => {
  let inventoryService: InventoryItemApiService;
  let buildingService: BuildingApiService;
  let testBuildingUuid: string;
  let createdItemUuids: string[] = [];

  beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [InventoryItemApiService, BuildingApiService]
    });

    inventoryService = TestBed.inject(InventoryItemApiService);
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
      testBuildingUuid = building.buildingUuid!;
      expect(testBuildingUuid).toBeTruthy();
      done();
    });
  });

  afterEach((done) => {
    const deleteItems$ = createdItemUuids.map(uuid => 
    inventoryService.deleteInventoryItem(uuid));  

  if (deleteItems$.length > 0) {
    forkJoin(deleteItems$).subscribe({
        next: () => {
            createdItemUuids = [];
            if (testBuildingUuid) {
            buildingService.deleteBuilding(testBuildingUuid).subscribe({ next: () => done(), error: () => done() });
            } else {
            done();
            }
        },
        error: () => done()
        });
    } else if (testBuildingUuid) {
        buildingService.deleteBuilding(testBuildingUuid).subscribe({ next: () => done(), error: () => done() });
    } else {
        done();
    }
  });

  it('should add a new inventory item', (done) => {
    inventoryService.addInventoryItem('Chair', 'pcs', 50, 10, testBuildingUuid).subscribe(item => {
      expect(item).toBeTruthy();
      expect(item.name).toBe('Chair');
      done();
    });
  });

  it('should fetch inventory items', (done) => {
    inventoryService.getInventoryItemsByBuilding(testBuildingUuid).subscribe(items => {
      expect(Array.isArray(items)).toBeTrue();
      done();
    });
  });
});
