import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveFundCardComponent } from './reserve-fund-card.component';

describe('ReserveFundCardComponent', () => {
  let component: ReserveFundCardComponent;
  let fixture: ComponentFixture<ReserveFundCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveFundCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveFundCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
