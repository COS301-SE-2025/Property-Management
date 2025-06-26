import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { House } from '../models/house.model';
import { Graph } from '../models/graph.model';
import { Inventory } from '../models/inventory.model';
import { Budget } from '../models/budget.model';
import { MaintenanceTask } from '../models/maintenanceTask.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  // constructor(private apiService : ApiService) { }

  // //Mock data   
  // mockImages = [
  //   "assets/images/houseDemo.jpg",
  //   "assets/images/houseDemo2.jpg",
  //   "assets/images/houseDemo3.jpg"
  // ];

  // house = signal<House>({
  //   buildingUuid: '1',
  //   name: 'Property X',
  //   address: '123 Example Str, Pretoria',
  //   image: this.mockImages[Math.floor(Math.random() * this.mockImages.length)]
  // });

  // budgetGraph = signal<Graph>({
  //   labels: [2022, 2023, 2024, 2025],
  //   datasets: [
  //     {
  //       data:[10000, 20000, 40000, 65000],
  //       fill: false,
  //       borderColor: 'rgb(255,227,114)',
  //       tension: 0.1
  //     }
  //   ]
  // });
  
  // inventory = signal<Inventory[]>([]);

  // maintenanceTasks = signal<MaintenanceTask[]>([]);

  // overallBudget = signal<Budget[]>([
    
  // ])
  
  // async getInventory(houseId: string)
  // {
  //   this.inventory.set([]);

  //   this.apiService.getInventory().subscribe({
  //     next: (inventory) => {
  //       const filterInventory = inventory.filter(item => item.buildingUuid == houseId);
  //       this.inventory.set(filterInventory);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching inventory:', err);
  //     }
  //   });
  // }
  // async getTasks(houseId: string)
  // {
  //   this.maintenanceTasks.set([]);
  // }
  // async getGraph(houseId: string)
  // {
    
  // }
}
