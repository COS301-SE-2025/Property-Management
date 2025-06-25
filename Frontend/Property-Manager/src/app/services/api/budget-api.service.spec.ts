import { TestBed } from '@angular/core/testing';

import { BudgetApiService } from './budget-api.service';

describe('BudgetApiService', () => {
  let service: BudgetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
