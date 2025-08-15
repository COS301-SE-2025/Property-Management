import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseCardComponent } from "./house/house-card.component";
import { BodyCoporateService, getCookieValue, HousesService, Property } from 'shared';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [HouseCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styles: ``,
  animations: [
    trigger('floatUp', [
      state('void', style({
        transform: 'translateY(20%)',
        opacity: 0
      })),
      transition(':enter', [
        animate('600ms ease-out', style({
          transform: 'translateY(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit{

  houses = signal<Property[]>([]);
  private houseService = inject(HousesService);
  private bodyCoporateService = inject(BodyCoporateService);
  constructor(private router: Router) {}

  async ngOnInit(){
    let id = getCookieValue(document.cookie, 'trusteeId');

    if(!id)
    {
      id = getCookieValue(document.cookie, 'bodyCoporateId');
      await this.bodyCoporateService.loadHouses(id);
      this.houses.set(this.bodyCoporateService.buildings());
    }
    else
    {
      await this.houseService.loadHouses(id);
      this.houses.set(this.houseService.houses());
    }
  }


  RouteToCreateProperty()
  {
    this.router.navigate(['/create-property'])
  }
}
