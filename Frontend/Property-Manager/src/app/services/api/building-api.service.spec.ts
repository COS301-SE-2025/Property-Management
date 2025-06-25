import { TestBed } from '@angular/core/testing';

import { BuildingApiService } from './building-api.service';

describe('BuildingApiService', () => {
  let service: BuildingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
