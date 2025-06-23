import { TestBed } from '@angular/core/testing';

import { BodyCoporateService } from './body-coporate.service';

describe('BodyCoporateService', () => {
  let service: BodyCoporateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyCoporateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
