import { TestBed } from '@angular/core/testing';

import { BodyCoporateApiService } from './body-coporate-api.service';

describe('BodyCoporateApiService', () => {
  let service: BodyCoporateApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyCoporateApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
