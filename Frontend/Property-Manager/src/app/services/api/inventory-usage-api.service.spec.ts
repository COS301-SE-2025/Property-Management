import { TestBed } from '@angular/core/testing';

import { InventoryUsageApiService } from './inventory-usage-api.service';

describe('InventoryUsageApiService', () => {
  let service: InventoryUsageApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryUsageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
