import { Injectable, signal } from '@angular/core';
import { MaintenanceTask } from '../models/maintenanceTask.model';
import { Contractor } from '../models/contractor.model';
import { LifeCycleCost } from '../models/lifeCycleCost.model';
import { BuildingContribution } from '../models/buildingContribution.model';
import { Graph } from '../models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class BodyCoporateService {

  constructor() { }

  //Mock data
  pendingTasks = signal<MaintenanceTask[]>([
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
      status: "pending",
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
        email: 'xyz_electrician@gmail.com',
        phone: '0987654321',
        apikey: 'xyz456',
        banned: false,
      } as Contractor,
      DoneOn: new Date('2024-05-28'),
      DueDate: new Date('2024-05-28'),
      status: "pending",
      approved: true,
      numOfAssignedContractors: 4
    },
    {
      description: 'Repaint interior',
      UnitNo: "3",
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
      DueDate: new Date('2024-05-11'),
      status: "pending",
      approved: true,
      numOfAssignedContractors: 3
    }
  ]);

  lifeCycleCosts = signal<LifeCycleCost[]>([
    {
      type: "Building",
      description: "Painting roof",
      condition: "Fixed 2024",
      timeFrame: "Year",
      estimatedBudget: 5000
    },
    {
      type: "Building",
      description: "Gutters and pipes",
      condition: "Leakages and loose pipes",
      timeFrame: "6-months",
      estimatedBudget: 10000
    },
    {
      type: "Community Facilities",
      description: "Garden equipment",
      condition: "Fair",
      timeFrame: "Year",
      estimatedBudget: 7000
    }
  ]);

  fundContribution = signal<BuildingContribution[]>([
    {
      buildingId: 1,
      name: "Name 1",
      address: "example 1 address",
      UnitNo: "1",
      floorArea: 100,
      quota: 12,
      annualContribution: 12000
    },
    {
      buildingId: 2,
      name: "Name 2",
      address: "example 2 address",
      UnitNo: "2",
      floorArea: 67,
      quota: 9,
      annualContribution: 8000
    },
    {
      buildingId: 3,
      name: "Name 3",
      address: "example 3 address",
      UnitNo: "3",
      floorArea: 145,
      quota: 16,
      annualContribution: 20000
    }
  ]);

  maintenanceGraph = signal<Graph>({
    labels: [2020, 2021, 2022, 2023, 2024, 2025],
    datasets:[
      {
        data: [130000, 110000, 85000, 160000, 220000, 180000],
        backgroundColor: 'rgba(255,227,114, 0.7)',
        borderColor: 'rgb(255,227,114)',
        borderWidth: 1
      }
    ]
  });
}
