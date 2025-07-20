import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { Storage } from '@ionic/storage-angular';
import { of } from 'rxjs';

class StorageMock {
  create = jasmine.createSpy('create').and.returnValue(Promise.resolve());
  get = jasmine.createSpy('get').and.returnValue(Promise.resolve(null));
  set = jasmine.createSpy('set').and.returnValue(Promise.resolve());
  remove = jasmine.createSpy('remove').and.returnValue(Promise.resolve());
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent, IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: {}, params: {}, queryParams: {}},
            params: of({}),
            queryParams: of({})
          }
        },
        {
          provide: Storage,
          useClass: StorageMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
