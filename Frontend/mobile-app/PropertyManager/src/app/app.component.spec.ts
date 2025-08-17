import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StorageService } from 'shared';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    storageService = jasmine.createSpyObj('StorageService', ['get', 'set', 'remove']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]),
      { provide: StorageService, useValue: storageService}
    ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
