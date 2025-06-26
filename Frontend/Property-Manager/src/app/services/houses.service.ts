import { Injectable, signal } from '@angular/core';
import { Inventory } from '../models/inventory.model';
import { Budget } from '../models/budget.model';
import { Timeline } from '../models/timeline.model';
import { BuildingApiService } from './api/Building api/building-api.service';
import { BudgetApiService } from './api/Budget api/budget-api.service';
import { InventoryItemApiService } from './api/InventoryItem api/inventory-item-api.service';
import { Property } from '../models/property.model';
import { BuildingDetails } from '../models/buildingDetails.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  private tempTrusteeId = 'b6785ed2-3230-4d55-8b83-660b63ca32f0';

  constructor(private buildingApiService: BuildingApiService, private budgetApiService: BudgetApiService, private inventoryItemApiService: InventoryItemApiService, private apiService: ApiService) { }

  houses = signal<Property[]>([]);
  inventory = signal<Inventory[]>([]);
  budgets = signal<BuildingDetails>({} as BuildingDetails);
  timeline = signal<Timeline[]>([]);

  mockImages = [
    "assets/images/houseDemo.jpg",
    "assets/images/houseDemo2.jpg",
    "assets/images/houseDemo3.jpg"
  ];

  addToHouses(house: Property)
  {
    this.houses.set([...this.houses(), house]);
  }
  addToTimeline(timeLine: Timeline)
  {
    this.timeline.set([...this.timeline(), timeLine]);
  }

  removeFromHouses(id : string)
  {
    this.houses.set(this.houses().filter((h) => h.buildingUuid !== id));
  }

  getHouseById(id: string): Property | undefined{
    console.log(this.houses());
    return this.houses().find(house => house.buildingUuid === id);
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

    this.buildingApiService.getBuildingsByTrustee(this.tempTrusteeId).subscribe({
      next: (house) => {
        console.log(house);
        
        this.houses.set(house.map((h) => ({
          ...h,
          propertyImage: this.mockImages[Math.floor(Math.random() * this.mockImages.length)]
        })));

      },
      error: (error) => {
        console.error("Error loading properties", error);
      }
    })
  }
  async loadBudget(houseId: string){

    this.budgetApiService.getBudgetsByBuildingId(houseId).subscribe({
      next: (budget) => {
        this.budgets.set(budget);
      },
      error: (error) => {
        console.error("Error getting budgets", error);
      }
    })
  }
  async createBudget(totalBudget: number, maintenanceBudget: number, inventoryBudget:number, updatedOn: Date, buildingId: string)
  {
    // this.budgetApiService.createBudget(totalBudget)
  }
  async isBudget(buildingId: string): Promise<boolean>
  {
   return new Promise((resolve) => {
    this.budgetApiService.getBudgetsByBuildingId(buildingId).subscribe({
      next: (budget) => {
        const budgetExists = Array.isArray(budget) && budget.length > 0;
        resolve(budgetExists);
      },
      error: () => {
        resolve(false)
      }
    })
   });
  }
  async loadInventory(houseId: string)
  {
    this.inventory.set([]); 

    this.apiService.getInventory().subscribe({
      next: (inventory) => {
       const filterInventory = inventory.filter(item => item.buildingUuid === houseId)
       this.inventory.set(filterInventory)
      },
      error: (err) => {
        console.error("Error loading inventory:", err);
      }
    });
  }
}
