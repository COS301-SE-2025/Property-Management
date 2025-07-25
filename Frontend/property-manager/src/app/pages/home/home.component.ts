import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { HouseCardComponent } from "./house/house-card.component";
import { getCookieValue, HousesService } from 'shared';
import { Router } from '@angular/router';
import { BreadCrumbService } from '../../components/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HouseCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{

  constructor(private router: Router, private breadCrumb: BreadCrumbService) {}

  ngOnInit(){
    const id = getCookieValue(document.cookie, 'trusteeId');
    this.houseService.loadHouses(id);

    effect(() => {
        this.breadCrumb.clearBreadCrumb();
    })
  }

  private houseService = inject(HousesService);
  houses = this.houseService.houses;

  RouteToCreateProperty()
  {
    this.router.navigate(['/create-property'])
  }
}
