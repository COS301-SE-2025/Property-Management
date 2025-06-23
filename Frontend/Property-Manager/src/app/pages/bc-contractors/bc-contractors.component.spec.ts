import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcContractorsComponent } from './bc-contractors.component';

describe('BcContractorsComponent', () => {
  let component: BcContractorsComponent;
  let fixture: ComponentFixture<BcContractorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcContractorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BcContractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
