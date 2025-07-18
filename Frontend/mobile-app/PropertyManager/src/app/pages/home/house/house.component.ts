import { Component, inject, input } from '@angular/core';
import { IonItem, IonCard, IonCardContent } from "@ionic/angular/standalone";
import { HousesService } from 'shared';
import { Property } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styles: ``,
  imports: [IonCardContent, IonCard, IonItem],
})
export class HouseComponent {

  constructor(private router: Router) { }

  houseService = inject(HousesService);
  house = input.required<Property>();
  
  viewHouse(houseId: string)
  {
    this.router.navigate(['viewHouse', houseId]);
  }
}
