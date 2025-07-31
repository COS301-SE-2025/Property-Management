import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HouseCardComponent } from "./house/house-card.component";
import { BodyCoporateService, getCookieValue, HousesService, Property } from 'shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HouseCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styles: ``
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
      console.log('getting body corporate houses');
      await this.bodyCoporateService.loadHouses();
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
