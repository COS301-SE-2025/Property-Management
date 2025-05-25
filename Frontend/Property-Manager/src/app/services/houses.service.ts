import { Injectable, signal } from '@angular/core';
import { House } from '../models/house.model'
import { Inventory } from '../models/inventory.model';
import { Budget } from '../models/budget.model';
import { Timeline } from '../models/timeline.model';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

   //Mock data
  houses = signal<House[]>([
    {
      id: 1,
      name: 'Property X',
      address: '123 Example str, Hatfield, Pretoria',
      image: "assets/images/houseDemo.jpg"
    },
    {
      id: 2,
      name: 'Property Y',
      address: '456 Example ave, Montana, Pretoria',
      image: "assets/images/houseDemo2.jpg"
    },
    {
      id: 3,
      name: 'Property Z',
      address: '789 Example str, Menlyn, Pretoria',
      image: "assets/images/houseDemo3.jpg"
    }
  ]);

  inventory = signal<Inventory[]>([
    {
      description: 'Light bulbs',
      quantity: 3,
      Last_bought: new Date(2025, 5, 1)
    },
    {
      description: 'Grey paint 5L bucket',
      quantity: 1,
      Last_bought: new Date(2024, 11, 12)
    },
    {
      description: 'Box of 25 tiles',
      quantity: 2,
      Last_bought: new Date(2025, 2, 15)
    }
  ]);

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
  
}
