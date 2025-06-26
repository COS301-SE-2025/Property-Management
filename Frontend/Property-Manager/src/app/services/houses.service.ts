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

  constructor(private apiService: ApiService) { }

  houses = signal<House[]>([]);
  inventory = signal<Inventory[]>([]);
  budgets = signal<Budget[]>([]);
  timeline = signal<Timeline[]>([]);

  mockImages = [
    "assets/images/houseDemo.jpg",
    "assets/images/houseDemo2.jpg",
    "assets/images/houseDemo3.jpg"
  ];

  addToHouses(house: House)
  {
    this.houses.set([...this.houses(), house]);
  }
  addToTimeline(timeLine: Timeline)
  {
    this.timeline.set([...this.timeline(), timeLine]);
  }

  removeFromHouses(id : number)
  {
    this.houses.set(this.houses().filter((h) => h.buildingId !== id));
  }

  getHouseById(id: number): House | undefined{
    return this.houses().find(house => house.buildingId === id);
  }

  private sortTimeline()
  {
    return this.timeline().sort((a: Timeline, b: Timeline) => {
      //Sort by done status, done items should be at the end
      if(!a.done && b.done) return -1;
      else if(a.done && !b.done) return 1;
      return 0;
    })
  }
  async loadHouses(){

    if(this.houses().length > 0)
    {
      return;
    }

    this.apiService.getBuildings().subscribe({
      next: (houses) => {
        this.houses.set(houses.map((house) => ({
          ...house,
          image: this.mockImages[Math.floor(Math.random() * this.mockImages.length)]
        })));
      },
      error: (err) => {
        console.error("Error loading houses:", err); 
      }
    })
  }
  async loadBudgetTimeline(houseId: number){

    this.budgets.set([]);
    this.timeline.set([]);

    this.apiService.getBuildingDetails(houseId).subscribe({
      next: (details) => {
        console.log(details);
        
        if(!details)
        {
          throw Error("No building details returned");
        }

        const budget: Budget[] = [
          {
            category: "inventory",
            budgetAmount: details.inventoryBudget.budgetAmount,
            budgetSpent: details.inventoryBudget.budgetSpent
          },
          {
            category: "maintenance",
            budgetAmount: details.maintenanceBudget.budgetAmount,
            budgetSpent: details.maintenanceBudget.budgetSpent
          }
        ];

        this.budgets.set(budget);

        const timeLineArr: Timeline[] = details.maintenanceTasks.map(task => ({
          description: task.description,
          done: task.status === 'done'
        }));

        this.timeline.set(timeLineArr);
        this.sortTimeline();
      },
      error: (err) => {
        console.error("Error loading budget and timeline", err)
      }
    })
  }
  async loadInventory(houseId: number)
  {
    this.inventory.set([]); 

    this.apiService.getInventory().subscribe({
      next: (inventory) => {
       const filterInventory = inventory.filter(item => item.buildingId === houseId)
       this.inventory.set(filterInventory)
      },
      error: (err) => {
        console.error("Error loading inventory:", err);
      }
    });
  }
}
