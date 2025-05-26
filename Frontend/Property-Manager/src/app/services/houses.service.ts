import { Injectable, signal } from '@angular/core';
import { House } from '../models/house.model'
import { Inventory } from '../models/inventory.model';
import { Budget } from '../models/budget.model';
import { Timeline } from '../models/timeline.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  constructor(private apiService: ApiService) {
    this.loadHouses();
  }

   //Mock data
  houses = signal<House[]>([]);

  mockImages = [
    "assets/images/houseDemo.jpg",
    "assets/images/houseDemo2.jpg",
    "assets/images/houseDemo3.jpg"
  ];

  inventory = signal<Inventory[]>([]);


  budgets = signal<Budget[]>([
    {
      category: "Plumbing",
      amount: 5000
    },
    {
      category: "Electrical",
      amount: 5000
    },
    {
      category: "Miscellaneous",
      amount: 10000
    }
  ]);

  timeline = signal<Timeline[]>([
    {
      description: "Fix broken window",
      done: false
    },
    {
      description: "Repair electrical outlet",
      done: true
    },
    {
      description: "Fix kitchen sink leak",
      done: true
    },
    {
      description: "Repain interior",
      done: true
    },
    {
      description: "Fix pavement outside",
      done: true
    }
  ])

  addToHouses(house: House)
  {
    this.houses.set([...this.houses(), house]);
  }

  removeFromHouses(id : number)
  {
    this.houses.set(this.houses().filter((h) => h.id !== id));
  }

  getHouseById(id: number): House | undefined{
    return this.houses().find(house => house.id === id);
  }

  async loadHouses(){
    console.log("Loading houses...");
    this.apiService.getBuildings().subscribe({
      next: (houses) => {
        console.log("Houses loaded:", houses);
        this.houses.set(houses.map((house: any) => {
          return {
            id: house.buildingId,
            name: house.name,
            address: house.address,
            image: this.mockImages[Math.floor(Math.random() * this.mockImages.length)]
          }
        }))
      },
      error: (err) => {
        console.error("Error loading houses:", err); 
      }
    })
  }
}
