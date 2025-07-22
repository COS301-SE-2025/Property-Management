import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HousesService, StorageService } from 'shared';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from "src/app/components/tab/tab.component";
import { IonItem, IonContent } from "@ionic/angular/standalone";
import { HouseComponent } from './house/house.component';

@Component({
  selector: 'app-home',
  imports: [IonItem, HeaderComponent, TabComponent, CommonModule, FormsModule, HouseComponent, IonContent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{

  private houseService = inject(HousesService);
  houses = this.houseService.houses;

  constructor(private storage: StorageService, private router: Router) { 
    
  }

  async ngOnInit()
  {
    const id = await this.storage.get('trusteeId');
    // await this.storage.set("trusteeId", id);
    this.houseService.loadHouses(id);
  }

  RouteToCreateProperty()
  {
    this.router.navigate(['/create-property']);
  }
}
