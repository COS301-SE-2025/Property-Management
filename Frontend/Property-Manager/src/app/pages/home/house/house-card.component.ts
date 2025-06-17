import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { HousesService } from '../../../services/houses.service';
import { House } from '../../../models/house.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-card',
  imports: [CardModule],
  template: ``,
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
