import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTaskCardComponent } from './pending-task-card.component';

describe('PendingTaskCardComponent', () => {
  let component: PendingTaskCardComponent;
  let fixture: ComponentFixture<PendingTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingTaskCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
