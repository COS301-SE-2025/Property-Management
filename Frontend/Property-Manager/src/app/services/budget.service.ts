import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { House } from '../models/house.model';
import { Graph } from '../models/graph.model';
import { Inventory } from '../models/inventory.model';
import { Budget } from '../models/budget.model';
import { MaintenanceTask } from '../models/maintenanceTask.model';
import { Contractor } from '../models/contractor.model';

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
    buildingUuid: '1',
    name: 'Property X',
    address: '123 Example Str, Pretoria',
    image: this.mockImages[Math.floor(Math.random() * this.mockImages.length)]
  });

  budgetGraph = signal<Graph>({
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
      itemUuid: '1',
      name: 'Light bulbs',
      unit: 'Unit 1',
      quantity: 6,
      buildingUuid: '1',
      price: 100,
      boughtDate: new Date('2025-05-01')
    },
    {
      itemUuid: '2',
      name: 'Grey paint 5L bucket',
      unit: 'Unit 2',
      quantity: 3,
      buildingUuid: '1',
      price: 500,
      boughtDate: new Date('2024-11-12')
    },
    {
      itemUuid: '3',
      name: 'Box of 25 tiles',
      unit: 'Unit 3',
      quantity: 5,
      buildingUuid: '1',
      price: 1500,
      boughtDate: new Date('2025-06-10')
    }
  ]);

  maintenanceTasks = signal<MaintenanceTask[]>([
    {
      description: 'Fixed sink leak',
      UnitNo: "1",
      cost: 1000,
      DoneBy: {
        contractorId: 1,
        name: 'ABC Plumbing',
        email: 'abc_plumbing@gmail.com',
        phone: '0123456789',
        apikey: 'abc123',
        banned: false,
      },
      DoneOn: new Date('2025-06-11'),
      DueDate: new Date('2025-06-11'),
      status: "Done",
      approved: true,
      proofImages: ["assets/images/sinkMock1.jpg", "assets/images/sinkMock2.jpeg", "assets/images/sinkMock3.jpeg"],
      inventoryItemsUsed:[
        {
          itemUuid: '4',
          name: "Tap",
          unit: "1",
          quantity: 1,
          buildingUuid: '1',
        },
        {
          itemUuid: '5',
          name: "Silicon tube",
          unit: "1",
          quantity: 1,
          buildingUuid: '1',
        }
      ],
      ReviewScore: 4,
      ReviewDescription: "Very happy with the job",
      numOfAssignedContractors: 2
    },
    {
      description: 'Fixed light bulb',
      UnitNo: "2",
      cost: 200,
      DoneBy: {
        contractorId: 2,
        name: 'XYZ Electricians',
        email: 'xyz_electrician@gmail.com',
        phone: '0987654321',
        apikey: 'xyz456',
        banned: false,
      } as Contractor,
      DoneOn: new Date('2024-05-28'),
      DueDate: new Date('2024-05-28'),
      status: "Done",
      approved: true,
      numOfAssignedContractors: 4
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
  
  async getInventory(houseId: string)
  {
    this.inventory.set([]);

    this.apiService.getInventory().subscribe({
      next: (inventory) => {
        const filterInventory = inventory.filter(item => item.buildingUuid == houseId);
        this.inventory.set(filterInventory);
      },
      error: (err) => {
        console.error('Error fetching inventory:', err);
      }
    });
  }
  async getTasks(houseId: string)
  {

  }
  async getGraph(houseId: string)
  {
    
  }
}
