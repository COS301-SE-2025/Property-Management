import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HouseCardComponent } from "./house/house-card.component";
import { HousesService } from '../../services/houses.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HouseCardComponent],
  template: `
    <app-header/>

    <div class = "flex flex-wrap justify-center gap-8 p-8">
      @for (house of houses(); track  house.id)
      {
        <app-house-card [house]="house"/>
      }
      <button class = "cursor-pointer">
        <img class= "w-16 h-16" src= "assets/icons/add_circle.svg" alt="">
      </button>
    </div>
  `,
  styles: ``
})
export class HomeComponent {
  private houseService = inject(HousesService);
  houses = this.houseService.houses;
}
