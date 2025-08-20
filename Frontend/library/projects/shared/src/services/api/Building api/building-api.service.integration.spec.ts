import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { BuildingApiService } from "./building-api.service";
import { Property } from "../../../models/property.model";

describe('BuildingApiService Integration Tests', () => {
  let service: BuildingApiService;
  let createId = '';

  const mockProperty: Omit<Property, "buildingUuid"> = {
    name: 'Integration Test Building',
    address: '123 Main St',
    type: 'Commercial',
    propertyValue: 1000000,
    primaryContractors: [1, 2],
    latestInspectionDate: '2023-01-01',
    propertyImage: 'img1',
    trustees: '1',
    area: 2,
    trusteeUuid: '1'
  };

   beforeEach((done) => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BuildingApiService]
    });

    service = TestBed.inject(BuildingApiService);

    service.createBuilding(
      mockProperty.name,
      mockProperty.address,
      mockProperty.type,
      mockProperty.propertyValue as number,
      mockProperty.primaryContractors as number[],
      mockProperty.latestInspectionDate,
      mockProperty.propertyImage as string,
      mockProperty.trustees as string,
      mockProperty.area
    ).subscribe(created => {
      createId = created.buildingUuid!;
      done();
    });
  });

  afterEach((done) => {
    if (createId) {
      service.deleteBuilding(createId).subscribe({
        next: () => done(),
        error: () => done()
      });
    } else {
      done();
    }
  });

  it('should retrieve building by id', (done) => {
    service.getBuildingById(createId).subscribe(fetched => {
      expect(fetched.buildingUuid).toBe(createId);
      expect(fetched.name).toBe(mockProperty.name);
      done();
    });
  });

  it('should update a building', (done) => {
    service.updateBuilding(createId, 'Updated Name', 'newImg.png', '')
      .subscribe(updated => {
        expect(updated).toBeTruthy();
        expect(updated.name).toBe('Updated Name');
        done();
      });
  });
});
