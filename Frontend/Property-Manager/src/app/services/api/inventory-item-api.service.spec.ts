import { TestBed } from '@angular/core/testing';

import { InventoryItemApiService } from './inventory-item-api.service';

describe('InventoryItemApiService', () => {
  let service: InventoryItemApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryItemApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
