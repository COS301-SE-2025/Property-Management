import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseCardComponent } from "./house/house-card.component";
import { BodyCoporateService, getCookieValue, HousesService, Property } from 'shared';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProgressSpinnerModule } from "primeng/progressspinner";

@Component({
  selector: 'app-home',
  imports: [HouseCardComponent, CommonModule, ProgressSpinnerModule],
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
  bcUser = false;
  loading = true;
  
  constructor(private router: Router) {}

  async ngOnInit(){
    this.loading = true;
    let id = getCookieValue(document.cookie, 'trusteeId');

    if(!id)
    {
      id = getCookieValue(document.cookie, 'bodyCoporateId');
      this.bcUser = true;
      await this.bodyCoporateService.loadHouses(id);
      this.houses.set(this.bodyCoporateService.buildings());

      const start = Date.now();
      while(this.bodyCoporateService.buildings().length === 0 && Date.now() - start < 2000)
      {
        await new Promise(res => setTimeout(res, 100));
      }

      await new Promise(res => setTimeout(res, 2000)); 
      this.loading = false;
    }
    else
    {
      this.bcUser = false;
      await this.houseService.loadHouses(id);
      this.houses.set(this.houseService.houses());

      const start = Date.now();
      while(this.houseService.houses().length === 0 && Date.now() - start < 2000)
      {
        await new Promise(res => setTimeout(res, 100));
      }

      await new Promise(res => setTimeout(res, 2000)); 
      this.loading = false;
    }
  }


  RouteToCreateProperty()
  {
    this.router.navigate(['/create-property'])
  }
}
