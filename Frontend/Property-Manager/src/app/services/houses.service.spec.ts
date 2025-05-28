import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HousesService } from './houses.service';

describe('HousesService', () => {
  let service: HousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
