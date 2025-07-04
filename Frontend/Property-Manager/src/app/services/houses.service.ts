import { Injectable, signal } from '@angular/core';
import { Inventory } from '../models/inventory.model';
import { BuildingApiService } from './api/Building api/building-api.service';
import { BudgetApiService } from './api/Budget api/budget-api.service';
import { InventoryItemApiService } from './api/InventoryItem api/inventory-item-api.service';
import { Property } from '../models/property.model';
import { BuildingDetails } from '../models/buildingDetails.model';
import { TaskApiService } from './api/Task api/task-api.service';
import { MaintenanceTask } from '../models/maintenanceTask.model';
import { Graph } from '../models/graph.model';
import { ImageApiService } from './api/Image api/image-api.service';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  private tempTrusteeId = 'b6785ed2-3230-4d55-8b83-660b63ca32f0';

  constructor(private buildingApiService: BuildingApiService, private budgetApiService: BudgetApiService, private inventoryItemApiService: InventoryItemApiService, private taskApiService: TaskApiService, private imageApiService: ImageApiService) { }

  houses = signal<Property[]>([]);
  inventory = signal<Inventory[]>([]);
  budgets = signal<BuildingDetails>({} as BuildingDetails);
  timeline = signal<MaintenanceTask[]>([]);
  budgetGraph = signal<Graph>;
  labels: Date[] = [];

  mockImages = [
    "assets/images/houseDemo.jpg",
    "assets/images/houseDemo2.jpg",
    "assets/images/houseDemo3.jpg"
  ];

  addToHouses(house: Property)
  {
    this.houses.set([...this.houses(), house]);
  }
  addToTimeline(task: MaintenanceTask)
  {
    this.timeline.set([...this.timeline(), task]);
  }

  removeFromHouses(id : string)
  {
    this.houses.set(this.houses().filter((h) => h.buildingUuid !== id));
  }
  addToInventory(item: Inventory)
  {
    this.inventory.set([...this.inventory(), item]);
  }
  addToTasks(task: MaintenanceTask)
  {
    this.timeline.set([...this.timeline(), task]);
    console.log(this.timeline());
    this.sortTimeline();
  }

  getHouseById(id: string): Property | undefined{
    console.log(this.houses());
    return this.houses().find(house => house.buildingUuid === id);
  }

  private sortTimeline()
  {
    return this.timeline().sort((a: MaintenanceTask, b: MaintenanceTask) => {
      //Sort by done status, done items should be at the end
      if(!a.status && b.status) return -1;
      else if(a.status && !b.status) return 1;
      return 0;
    })
  }
  async loadHouses() {

    if (this.houses().length > 0) {
      return;
    }

    const trusteeId = localStorage.getItem("trusteeID");
    if (!trusteeId) {
      console.error("No trustee ID found in localStorage.");
      return;
    }

    this.buildingApiService.getBuildingsByTrustee(trusteeId).subscribe({
      next: (response) => {
        console.log("Full response from backend:", response);

        if (!response || !Array.isArray(response.buildings)) {
          console.error("Unexpected response structure:", response);
          return;
        }

        response.buildings.forEach(h => {
          if (h.propertyImage) {
            this.imageApiService.getImage(h.propertyImage).subscribe(imageUrl => {
              this.houses.update(currentHouses => [
                ...currentHouses,
                {
                  ...h,
                  propertyImage: imageUrl
                }
              ]);
            });
          } else {
            this.houses.update(currentHouses => [
              ...currentHouses,
              h
            ]);
          }
        });
      },
      error: (error) => {
        console.error("Error loading properties", error);
      }
    });
  }

  async loadBudget(houseId: string){

    this.budgetApiService.getBudgetsByBuildingId(houseId).subscribe(
      (bulidingDetails: BuildingDetails[]) => {
        const firstElement = bulidingDetails[bulidingDetails.length-1];
        this.budgets.set(firstElement);

        // const graphData = {
        //   labels: firstElement.
        // }
      }
    )
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

    this.inventoryItemApiService.getInventoryItemsByBuilding(houseId).subscribe({
      next: (inventory) => {
       console.log(inventory);
       this.inventory.set(inventory);
      },
      error: (err) => {
        console.error("Error loading inventory:", err);
      }
    });
  }
  async loadTasks(buildingId: string)
  {
    this.taskApiService.getAllTasks().subscribe({
      next: (task) => {
        const filteredTasks = task.filter(t => t.b_uuid === buildingId);
        this.timeline.set(filteredTasks);
        this.sortTimeline();
      },
      error: (err) => {
        console.error("Error getting tasks", err);
      }
    });
  }
}
