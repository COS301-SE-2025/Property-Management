import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceGraphCardComponent } from './maintenanceGraph-card.component';

describe('GraphCardComponent', () => {
  let component: MaintenanceGraphCardComponent;
  let fixture: ComponentFixture<MaintenanceGraphCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceGraphCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceGraphCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
