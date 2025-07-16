import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class StorageMock {
  create = jasmine.createSpy('create').and.returnValue(Promise.resolve());
  get = jasmine.createSpy('get').and.returnValue(Promise.resolve(null));
  set = jasmine.createSpy('set').and.returnValue(Promise.resolve());
  remove = jasmine.createSpy('remove').and.returnValue(Promise.resolve());
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: Storage, useClass: StorageMock }]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});