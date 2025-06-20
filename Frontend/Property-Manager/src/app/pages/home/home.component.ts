import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HouseCardComponent } from "./house/house-card.component";
import { HousesService } from '../../services/houses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HouseCardComponent],
  template: `
    <app-header/>

    <div class = "mt-4 ml-10">
      <p class = "text-lg font-normal">Your properties</p>
    </div>

    <div class = "flex flex-wrap justify-center gap-8 p-8">
      @for (house of houses(); track  house.buildingId)
      {
        <app-house-card [house]="house"/>
      }
      <button (click)="RouteToCreateProperty()" class = "cursor-pointer">
        <img class= "w-16 h-16" src= "assets/icons/add_circle.svg" alt="">
      </button>
    </div>
  `,
  styles: ``
})
export class HomeComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(){
    this.houseService.loadHouses();
  }

  private houseService = inject(HousesService);
  houses = this.houseService.houses;

  RouteToCreateProperty()
  {
    this.router.navigate(['/create-property'])
  }
}
