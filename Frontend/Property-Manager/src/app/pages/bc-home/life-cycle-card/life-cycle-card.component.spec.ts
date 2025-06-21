import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCycleCardComponent } from './life-cycle-card.component';

describe('LifeCycleCardComponent', () => {
  let component: LifeCycleCardComponent;
  let fixture: ComponentFixture<LifeCycleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeCycleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeCycleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
