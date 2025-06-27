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

maintenanceTasks = signal<MaintenanceTask[]>([
  {
    description: 'Fixed sink leak',
    UnitNo: "1",
    cost: 1000,
    DoneBy: {
      contractorId: 1,
      name: 'ABC Plumbing',
      contact_info: '0123456789',
      status: false,
      apikey: 'abc123',
      email: 'abc_plumbing@gmail.com',
      phone: '0123456789',
      address: '123 Example Street',
      city: 'Pretoria',
      postal_code: '01800',
      reg_number: 'REG123',
      description: 'General plumbing repairs',
      services: 'Plumbing'
    },
    DoneOn: new Date('2025-06-11'),
    DueDate: new Date('2025-06-11'),
    status: "Done",
    approved: true,
    proofImages: ["assets/images/sinkMock1.jpg", "assets/images/sinkMock2.jpeg", "assets/images/sinkMock3.jpeg"],
    inventoryItemsUsed:[
      {
        itemId: 4,
        name: "Tap",
        unit: "1",
        quantityInStock: 1,
        buildingId: 1,
      },
      {
        itemId: 5,
        name: "Silicon tube",
        unit: "1",
        quantityInStock: 1,
        buildingId: 1,
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
      contact_info: '0987654321',
      status: false,
      apikey: 'xyz456',
      email: 'xyz_electrician@gmail.com',
      phone: '0987654321',
      address: '456 Example Avenue',
      city: 'Pretoria',
      postal_code: '01801',
      reg_number: 'REG456',
      description: 'Electrical repairs',
      services: 'Electrical'
    },
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
