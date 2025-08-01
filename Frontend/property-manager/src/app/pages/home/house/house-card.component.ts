import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { HousesService } from 'shared';
import { Router } from '@angular/router';
import { Property } from 'shared';

@Component({
  selector: 'app-house-card',
  imports: [CardModule, CommonModule],
  templateUrl: './house-card.component.html',
  styles: ``
})
export class HouseCardComponent {

  constructor(private router: Router){}
  houseService = inject(HousesService);

  house = input.required<Property>();

  viewHouse(houseId: string)
  {
    this.router.navigate(['viewHouse', houseId])
  }
}
