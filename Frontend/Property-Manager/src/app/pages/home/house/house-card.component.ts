import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HousesService } from '../../../services/houses.service';
import { House } from '../../../models/house.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-card',
  imports: [CardModule],
  template: `
    <div class = "shadow-md rounded-lg border w-75 text-center">
      <button class = "cursor-pointer" (click)="viewHouse(house().id)">
        <p-card>
            <img [src] = "house().image" class="w-60 h-40 mx-auto object-scale-down mt-4 rounded-md">
            <p class = "text-lg font-bold mt-4"> {{ house().name }}</p>
            <p class = "text-gray-600 mb-4"> {{ house().address }}</p>
        </p-card>
    </button>
    </div>
  `,
  styles: ``
})
export class HouseCardComponent {

  constructor(private router: Router){}
  houseService = inject(HousesService);

  house = input.required<House>();

  viewHouse(houseId: number)
  {
    this.router.navigate(['viewHouse', houseId])
  }
}
