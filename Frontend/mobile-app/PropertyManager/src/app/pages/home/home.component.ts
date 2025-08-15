import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HousesService, StorageService } from 'shared';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from "src/app/components/tab/tab.component";
import { IonItem, IonContent } from "@ionic/angular/standalone";
import { HouseComponent } from './house/house.component';
import { ThemeService } from 'src/app/services/theme.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  imports: [IonItem, HeaderComponent, TabComponent, CommonModule, FormsModule, HouseComponent, IonContent, ProgressSpinnerModule],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{

  private houseService = inject(HousesService);
  houses = this.houseService.houses;
  darkMode = false;
  loading = false;

  constructor(private storage: StorageService, private router: Router, private theme: ThemeService) { 
    
  }

  async ngOnInit()
  {
    this.loading = true;
    const id = await this.storage.get('trusteeId');
    // await this.storage.set("trusteeId", id);
    this.houseService.loadHouses(id);

    this.theme.darkMode$.subscribe(mode => this.darkMode = mode);
    this.loading = false;
  }

  RouteToCreateProperty()
  {
    this.router.navigate(['/create-property']);
  }
}
