import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HouseCardComponent } from "./house/house-card.component";
import { HousesService } from '../../services/houses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HouseCardComponent, CommonModule],
  templateUrl: './home.component.html',
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
