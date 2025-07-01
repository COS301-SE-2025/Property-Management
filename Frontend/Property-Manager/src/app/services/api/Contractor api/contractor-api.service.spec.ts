import { TestBed } from '@angular/core/testing';

import { ContractorApiService } from './contractor-api.service';

describe('ContractorApiService', () => {
  let service: ContractorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
