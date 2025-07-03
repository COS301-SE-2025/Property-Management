import { Injectable, signal } from '@angular/core';
import { MaintenanceTask } from '../models/maintenanceTask.model';
import { LifeCycleCost } from '../models/lifeCycleCost.model';
import { ContractorDetails } from '../models/contractorDetails.model';
import { ReserveFund } from '../models/reserveFund.model';
import { BodyCoporateApiService } from './api/Body Coporate api/body-coporate-api.service';
import { firstValueFrom } from 'rxjs';
import { getCookieValue } from '../../utils/cookie-utils';
import { Graph } from '../models/graph.model';
import { BuildingDetails } from '../models/buildingDetails.model';
import { BudgetApiService } from './api/Budget api/budget-api.service';

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
  maintenanceGraph = signal<Graph>({} as Graph);
  contractorDetails = signal<ContractorDetails[]>([]);
  bcId = '';


  constructor(private bodyCoporateApiService: BodyCoporateApiService, private budgetApiService: BudgetApiService){
    this.bcId = getCookieValue(document.cookie, 'bodyCoporateId');
  }

  async addToTask(task: MaintenanceTask): Promise<void> {
    this.pendingTasks.update(tasks => [...tasks, task]);
  }

  async loadPendingTasks(): Promise<void> {

    try {
      const buildings = await firstValueFrom(
        this.bodyCoporateApiService.getBuildingsLinkedtoBC(this.bcId)
      );

      const buildingUuids: string[] = buildings
        .map(b => b.buildingUuid)
        .filter((uuid): uuid is string => typeof uuid === 'string');

      await Promise.all(buildingUuids.map(async uuid => {
        try {
          const tasks = await firstValueFrom(
            this.bodyCoporateApiService.getPendingTasks(uuid)
          );
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
        firstValueFrom(this.bodyCoporateApiService.getBuildingsLinkedtoBC(this.bcId)),
        firstValueFrom(this.bodyCoporateApiService.getBodyCoporate(this.bcId))
      ]);

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
  async loadGraph():Promise<void>
  {
   try{
    const buildings = await firstValueFrom(
      this.bodyCoporateApiService.getBuildingsLinkedtoBC(this.bcId)
    );

    const budgetPromise = buildings
      .filter((building): building is typeof building & { buildingUuid: string } => typeof building.buildingUuid === 'string')
      .map(building => firstValueFrom(this.budgetApiService.getBudgetsByBuildingId(building.buildingUuid)));

    const allBudgets = await Promise.all(budgetPromise);
    const budgets = allBudgets.map(bud => {
      if(!bud || bud.length === 0) return null;

      //Get newest budget
      const sorted = [...bud].sort((a, b) => 
        new Date(b.approvalDate).getTime() - new Date(a.approvalDate).getTime()
      );

      return sorted[0];
    }).filter(Boolean);

    if(budgets.length > 0)
    {
      const yearData = budgets.reduce((acc: Record<number, number>, budget) => {
        if(budget && budget.year && budget.totalBudget)
        {
          acc[budget.year] = (acc[budget.year] || 0) + budget.totalBudget;
        }
        return acc;
      }, {});

      const years = Object.keys(yearData).sort();
      const allBudgets = years.map(year => yearData[parseInt(year)]);

      const graphData: Graph = {
        labels: years,
        datasets: [
          {
            data: allBudgets,
            backgroundColor: 'rgba(255,227,114, 0.7)',
            borderColor: 'rgb(255,227,114)',
            borderWidth: 1
          }
        ]
      };

      this.maintenanceGraph.set(graphData);
    }
   }
   catch(error)
   {
    console.error("Failed to load graph data", error);
   }
  }
}