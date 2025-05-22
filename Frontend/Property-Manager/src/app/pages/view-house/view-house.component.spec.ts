import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHouseComponent } from './view-house.component';
import { HousesService } from '../../services/houses.service';
import { House } from '../../models/house.model';
import { HeaderComponent } from '../../components/header/header.component';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-inventory-card',
  template: '',
  standalone: true
})
class MockInventoryCardComponent{
  @Input() inventory: any;
}

@Component({
  selector: 'app-budget-card',
  template: '',
  standalone: true
})
class MockBudgetCardComponent {
  @Input() budget: any;
}

@Component({
  selector: 'app-timeline-card',
  template: '',
  standalone: true
})
class MockTimelineCardComponent {
  @Input() timeline: any;
}

describe('ViewHouseComponent', () => {
  let component: ViewHouseComponent;
  let fixture: ComponentFixture<ViewHouseComponent>;
  let mockHouseService: jasmine.SpyObj<HousesService>;
  let mockActivatedRoute: any;

  const mockHouse: House = {
    id: 1,
    name: 'Property A',
    address: '111 Example str, Menlyn, Pretoria',
    image: "assets/images/houseDemo3.jpg",
  };

  beforeEach(async () => {

    mockHouseService = jasmine.createSpyObj('HousesService', ['getHouseById', 'inventory', 'budgets', 'timeline']);
    mockHouseService.getHouseById.and.returnValue(mockHouse);
    mockHouseService.inventory.and.returnValue([]);
    mockHouseService.budgets.and.returnValue([]);
    mockHouseService.timeline.and.returnValue([]);

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        ViewHouseComponent, 
        HeaderComponent, 
        CardModule, 
        MockInventoryCardComponent,
        MockBudgetCardComponent, 
        MockTimelineCardComponent
      ],
      declarations:[],
      providers: [
        { provide: HousesService, useValue: mockHouseService},
        { provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should initialize with house data when route param exists', () => {
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('houseId');
    expect(mockHouseService.getHouseById).toHaveBeenCalledWith(1);
    expect(component.house).toEqual(mockHouse);
    expect(component.findHouse).toBeFalse();
  });

   it('should set findHouse to true when house is not found', () => {
    mockHouseService.getHouseById.and.returnValue(undefined);
    component.ngOnInit();
    expect(component.findHouse).toBeTrue();
  });

   it('should display error message when house is not found', () => {
    component.findHouse = true;
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('p.text-yellow-500');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Could not load house. Please try again');
  });

  it('should display house name when house is found', () => {
    fixture.detectChanges();
    const name = fixture.nativeElement.querySelector('p.text-center.text-xl.font-bold');

    expect(name).toBeTruthy();
    expect(name.textContent).toContain(mockHouse.name);
  });

   it('should render all three components', () => {
    fixture.detectChanges();
    const inventoryCard = fixture.nativeElement.querySelector('app-inventory-card');
    const budgetCard = fixture.nativeElement.querySelector('app-budget-card');
    const timelineCard = fixture.nativeElement.querySelector('app-timeline-card');
    
    expect(inventoryCard).toBeTruthy();
    expect(budgetCard).toBeTruthy();
    expect(timelineCard).toBeTruthy();
  });
});
