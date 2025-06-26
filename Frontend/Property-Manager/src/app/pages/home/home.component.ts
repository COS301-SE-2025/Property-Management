import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HouseCardComponent } from "./house/house-card.component";
import { HousesService } from '../../services/houses.service';
import { Router } from '@angular/router';
import { DrawerComponent } from "../../components/drawer/drawer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HouseCardComponent, CommonModule, DrawerComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{

  public bcUser = false;

  constructor(private router: Router) {

    const typeUser = localStorage.getItem("typeUser");
    if(typeUser !== null && typeUser === "body coporate")
    {
      this.bcUser = true;
      console.log("bcUser active");
    }
  }

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
