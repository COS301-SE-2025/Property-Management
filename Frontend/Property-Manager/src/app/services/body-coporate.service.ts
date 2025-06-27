import { Injectable, signal } from '@angular/core';
import { MaintenanceTask } from '../models/maintenanceTask.model';
import { LifeCycleCost } from '../models/lifeCycleCost.model';
import { ContractorDetails } from '../models/contractorDetails.model';
import { ReserveFund } from '../models/reserveFund.model';
import { BodyCoporateApiService } from './api/Body Coporate api/body-coporate-api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyCoporateService {

  //Mock data
  pendingTasks = signal<MaintenanceTask[]>([]);

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

  fundContribution = signal<ReserveFund[]>([]);

  // maintenanceGraph = signal<Graph>({
  //   labels: [2020, 2021, 2022, 2023, 2024, 2025],
  //   datasets:[
  //     {
  //       data: [130000, 110000, 85000, 160000, 220000, 180000],
  //       backgroundColor: 'rgba(255,227,114, 0.7)',
  //       borderColor: 'rgb(255,227,114)',
  //       borderWidth: 1
  //     }
  //   ]
  // });

  contractorDetails = signal<ContractorDetails[]>([]);

  constructor(private bodyCoporateApiService: BodyCoporateApiService){}

  async addToTask(task: MaintenanceTask): Promise<void> {
    console.log(task);
    this.pendingTasks.update(tasks => [...tasks, task]);
  }

  async loadPendingTasks(): Promise<void> {
    try {
      const buildings = await firstValueFrom(
        this.bodyCoporateApiService.getBuildingsLinkedtoBC()
      );

      console.log(buildings);

      const buildingUuids: string[] = buildings
        .map(b => b.buildingUuid)
        .filter((uuid): uuid is string => typeof uuid === 'string');

      await Promise.all(buildingUuids.map(async uuid => {
        try {
          const tasks = await firstValueFrom(
            this.bodyCoporateApiService.getPendingTasks(uuid)
          );
          console.log(tasks)
          tasks.forEach(task => this.addToTask(task));
        } catch (error) {
          console.error(`Failed to load tasks for building ${uuid}`, error);
        }
      }));
    } catch (error) {
      console.error('Failed to load buildings', error);
    }
  }
  async loadFundContribution(): Promise<void> {
  try {
    const [buildings, bc] = await Promise.all([
      firstValueFrom(this.bodyCoporateApiService.getBuildingsLinkedtoBC()),
      firstValueFrom(this.bodyCoporateApiService.getBodyCoporate())
    ]);

    console.log(buildings);
    console.log(bc);

    const reserveFunds = buildings
      .filter((building): building is typeof building & { area: number } => typeof building.area === 'number')
      .map(building => 
        this.bodyCoporateApiService.getAndCalculateReserveFund(
          bc, 
          building.area,
          building.name
        )
      );

    this.fundContribution.set(reserveFunds);
    
  } catch (error) {
    console.error('Failed to load fund contributions', error);
    this.fundContribution.set([]);
  }
}
}
