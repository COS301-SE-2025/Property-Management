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
    this.houses.set(this.houses().filter((h) => h.id !== id));
  }

  getHouseById(id: number): House | undefined{
    return this.houses().find(house => house.id === id);
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
  async loadBudgetTimeline(houseId: number){
    this.apiService.getBuildingDetails(houseId).subscribe({
      next: (details) => {
        
        const budget = [
          {
            category: 'Inventory',
            budgetAmount: details.inventoryBudget,
            budgetSpent: details.inventorySpent
          },
          {
            category: 'Maintenance',
            budgetAmount: details.maintenanceBudget,
            budgetSpent: details.maintenanceSpent
          }
        ];

        this.budgets.set(budget);
        
        let timeLineArr: Timeline[] = [];

        for(let i = 0; i < details.maintenanceTasks.length; i++)
        {
          const timelineItem: Timeline = {
            description: details.maintenanceTasks[i].description,
            done: details.maintenanceTasks[i].status === 'DONE'? true : false,
          }
          timeLineArr.push(timelineItem);
        }

        this.timeline.set(timeLineArr);
        this.sortTimeline();
      },
      error: (err) => {
      }
    })
  }
  async loadInventory(houseId: number)
  {
    this.inventory.set([]); 

    this.apiService.getInventory().subscribe({
      next: (inventory) => {
        inventory.filter((item: any) => {
          return item.buildingId === houseId;
        }).forEach((item: any) => {
          this.inventory.set([...this.inventory(), {
            description: item.name,
            quantity: item.quantityInStock,
          }]);
        });

      },
      error: (err) => {
        console.error("Error loading inventory:", err);
      }
    });
  }
}
