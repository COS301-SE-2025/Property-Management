import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { House } from '../models/house.model';
import { BudgetGraph } from '../models/budgetGraph.model';
import { Inventory } from '../models/inventory.model';
import { MaintenanceBudget } from '../models/maintenanceBudget.model';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private apiService : ApiService) { }

  //Mock data   
  mockImages = [
    "assets/images/houseDemo.jpg",
    "assets/images/houseDemo2.jpg",
    "assets/images/houseDemo3.jpg"
  ];

  house = signal<House>({
    buildingId: 1,
    name: 'Property X',
    address: '123 Example Str, Pretoria',
    image: this.mockImages[Math.floor(Math.random() * this.mockImages.length)]
  });

  budgetGraph = signal<BudgetGraph>({
    labels: [2022, 2023, 2024, 2025],
    datasets: [
      {
        data:[10000, 20000, 40000, 65000],
        fill: false,
        borderColor: 'rgb(255,227,114)',
        tension: 0.1
      }
    ]
  });
  
  inventory = signal<Inventory[]>([
    {
      itemId: 1,
      name: 'Light bulbs',
      unit: 'Unit 1',
      quantityInStock: 6,
      buildingId: 1,
      price: 100,
      boughtDate: new Date('2025-05-01')
    },
    {
      itemId: 2,
      name: 'Grey paint 5L bucket',
      unit: 'Unit 2',
      quantityInStock: 3,
      buildingId: 1,
      price: 500,
      boughtDate: new Date('2024-11-12')
    },
    {
      itemId: 3,
      name: 'Box of 25 tiles',
      unit: 'Unit 3',
      quantityInStock: 5,
      buildingId: 1,
      price: 1500,
      boughtDate: new Date('2025-06-10')
    }
  ]);

  maintenanceBudget = signal<MaintenanceBudget[]>([
    {
      description: 'Fixed sink leak',
      cost: 1000,
      DoneBy: {
        contractorId: 1,
        name: 'ABC Plumbing',
        email: 'abc_plumbing@gmail.com',
        phone: '0123456789',
        apikey: 'abc123',
        banned: false,
      },
      DoneOn: new Date('2025-06-11')
    },
    {
      description: 'Fixed light bulb',
      cost: 200,
      DoneBy: {
        contractorId: 2,
        name: 'XYZ Electricians',
        email: 'xyz_electrician@gmail.com',
        phone: '0987654321',
        apikey: 'xyz456',
        banned: false,
      },
      DoneOn: new Date('2024-05-28')
    }
  ]);

  overallBudget = signal<Budget[]>([
    {
      category: 'Inventory',
      budgetAmount: 10000,
      budgetSpent: 5000
    },
    {
      category: 'Maintenance',
      budgetAmount: 20000,
      budgetSpent: 12000
    }
  ])
  
  async getInventory(houseId: number)
  {
    this.inventory.set([]);

    this.apiService.getInventory().subscribe({
      next: (inventory) => {
        const filterInventory = inventory.filter(item => item.buildingId == houseId);
        this.inventory.set(filterInventory);
      },
      error: (err) => {
        console.error('Error fetching inventory:', err);
      }
    });
  }
}
