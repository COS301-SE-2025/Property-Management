import { Injectable, signal } from '@angular/core';
import { MaintenanceTask } from '../models/maintenanceTask.model';
import { LifeCycleCost } from '../models/lifeCycleCost.model';
import { ContractorDetails } from '../models/contractorDetails.model';
import { ReserveFund } from '../models/reserveFund.model';
import { BodyCoporateApiService } from './api/Body Coporate api/body-coporate-api.service';
import { catchError, firstValueFrom, forkJoin, from, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { Graph } from '../models/graph.model';
import { BudgetApiService } from './api/Budget api/budget-api.service';
import { ImageApiService } from './api/Image api/image-api.service';
import { Anomaly, ApiService, BuildingApiService, ContractorApiService, Inventory, InventoryItemApiService, Property } from '../public-api';

@Injectable({
  providedIn: 'root'
})
export class BodyCoporateService {

  pendingTasks = signal<MaintenanceTask[]>([]);

  lifeCycleCosts = signal<LifeCycleCost[]>([]);

  fundContribution = signal<ReserveFund[]>([]);
  maintenanceGraph = signal<Graph>({} as Graph);
  contractorDetails = signal<ContractorDetails[]>([]);
  buildings = signal<Property[]>([]);
  contribution = signal<number>(0);

  anomalies = signal<Anomaly[]>([]);

  constructor(
    private bodyCoporateApiService: BodyCoporateApiService, 
    private budgetApiService: BudgetApiService, 
    private imageApiService: ImageApiService, 
    private contractorService: ContractorApiService,
    private inventoryService: InventoryItemApiService,
    private buildingServie: BuildingApiService,
    private inviteService: ApiService){
  }

  async loadHouses(bcId: string)
  {
    if(this.buildings().length > 0) {
      return;
    }

    try{
      const buildings = await firstValueFrom(this.bodyCoporateApiService.getBuildingsLinkedtoBC(bcId));

      const buildingImages = await Promise.all(
        buildings.map(async b => {
          try{
            const url = b.propertyImage ? await firstValueFrom(this.imageApiService.getImage(b.propertyImage)) : 'assets/images/no_image.png';
            return { ...b, propertyImage: url };
          }
          catch(err) {
            console.error("Error fetching image for building", b.buildingUuid, err);
            return {...b, propertyImage: 'assets/images/no_image.png' };
          }
        })
      );
      this.buildings.set(buildingImages);
    }
    catch(error){
      console.error("Error fetching buildings", error);
      this.buildings.set([]);
    }
  } 

  async addToTask(task: MaintenanceTask): Promise<void> {
    this.pendingTasks.update(tasks => [...tasks, task]);
  }

  async loadPendingTasks(bcId: string): Promise<void> {

    this.pendingTasks.set([]);
    try {
      const buildings = await firstValueFrom(
        this.bodyCoporateApiService.getBuildingsLinkedtoBC(bcId)
      );

      const buildingUuids: string[] = buildings
        .map(b => b.buildingUuid)
        .filter((uuid): uuid is string => typeof uuid === 'string');

      await Promise.all(buildingUuids.map(async uuid => {
        try {
          const tasks = await firstValueFrom(
            this.bodyCoporateApiService.getPendingTasks(uuid)
          );
          tasks.forEach(task => {
            if(task.approvalStatus !== 'COMPLETED')
            {
              this.addToTask(task)
            }
          });
        } catch (error) {
          console.error(`Failed to load tasks for building ${uuid}`, error);
        }
      }));
    } catch (error) {
      console.error('Failed to load buildings', error);
    }
  }
  async loadFundContribution(bcId: string): Promise<void> {

    try {
      const [buildings, bc] = await Promise.all([
        firstValueFrom(this.bodyCoporateApiService.getBuildingsLinkedtoBC(bcId)),
        firstValueFrom(this.bodyCoporateApiService.getBodyCoporate(bcId))
      ]);

      this.contribution.set(bc.contributionPerSqm);

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
  async loadGraph(bcId: string):Promise<void>
  {
   try{
    const buildings = await firstValueFrom(
      this.bodyCoporateApiService.getBuildingsLinkedtoBC(bcId)
    );

    const budgetPromise = buildings
      .filter((building): building is typeof building & { buildingUuid: string } => typeof building.buildingUuid === 'string')
      .map(building => firstValueFrom(this.budgetApiService.getBudgetsByBuildingId(building.buildingUuid)));

    const allBudgets = await Promise.all(budgetPromise);
    const budgets = allBudgets.flatMap(bud => {
      if(!bud) return [];

      const group: Record<number, typeof bud[0]> = {};
      bud.forEach(b => {
        const existing = group[b.year!];
        if(!existing || new Date(b.approvalDate).getTime() > new Date(existing.approvalDate).getTime())
        {
          group[b.year!] = b;
        }
      });

      return Object.values(group);
    });

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

      //Get predicted budget
      this.budgetApiService.getBudgetPredictionBodyCorporate(bcId, "Y", 3, "total_budget").subscribe({
        next: (res) => {
          const year3 = res.prediction;

          const predictedYears = year3.map(p => new Date(p.ds).getFullYear().toString());
          const predictedVal = year3.map(p => p.yhat);

          const labels = [...years, ...predictedYears.filter(y => !years.includes(y))];
          const existingData = labels.map(y => yearData[+y] !== undefined ? yearData[+y] : 0);
          const predictedData = labels.map(y => {
            const idx = predictedYears.indexOf(y);
            return idx >= 0 ? predictedVal[idx] : 0;
          });

          const graphData: Graph = {
            labels: labels,
            datasets: [
              {
                label: 'Existing Budget',
                data: existingData,
                backgroundColor: 'rgba(255,227,114,0.7)',
                borderColor: 'rgb(255,227,114)',
                borderWidth: 1
              },
              {
                label: 'Predicted Budget',
                data: predictedData,
                backgroundColor: 'rgba(255, 165, 0, 0.7)',
                borderColor: 'rgb(255, 165, 0)',
                borderWidth: 1
              }
            ]
          };
          
          //Get predicted inventory and maintennce budgets
          this.budgetApiService.getBudgetPredictionBodyCorporate(bcId, "Y", 1, "inventory_budget").subscribe({
            next: (res) => {
              graphData.predictedInventoryBudget = res.prediction[0].yhat;
              
              this.budgetApiService.getBudgetPredictionBodyCorporate(bcId, "Y", 1, 'maintenance_budget').subscribe({
                next: (res) => {
                  graphData.predictedMaintenanceBudget = res.prediction[0].yhat;
                  this.maintenanceGraph.set(graphData);
                },
                error: (err) => {
                  console.error("Couldnt get predicted maintenance budgets", err);
                  this.maintenanceGraph.set(graphData);
                }
              })
            },
            error: (err) => {
              console.error("Couldnt get predicted inventory or maintenance budgets", err);
              this.maintenanceGraph.set(graphData);
            }
          })
        },
        error: (err) => {
          console.error("Couldnt get predicted budgets", err);
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
      });
    }
   }
   catch(error)
   {
    console.error("Failed to load graph data", error);
   }
  }
  async loadTrustedContractors(bcId: string): Promise<void>
  {
    this.contractorDetails.set([]);

    try{
      const contractorIds = await firstValueFrom(
        this.bodyCoporateApiService.getTrustedContractors(bcId)
      );

      const contractors = await Promise.all(
        contractorIds.map(async (c) => {
          const contractor = await firstValueFrom(
            this.contractorService.getContractorById(c)
          );

          if (contractor.img) {
            try {
              contractor.img = await firstValueFrom(
                this.imageApiService.getImage(contractor.img)
              );
            } catch (err) {
              console.error("Error loading images", err);
              contractor.img = "assets/images/no_image.png";
            }
          } else {
            contractor.img = "assets/images/no_image.png";
          }

          return contractor;
        })
      );

      this.contractorDetails.set(contractors);
    }
    catch(err){
      console.error("Error loading trusted contractors", err);
    }
  } 
  async loadPublicContractors(bcId: string): Promise<void>
  {
    this.contractorDetails.set([]);

    try{
      const contractors = await firstValueFrom(
        this.bodyCoporateApiService.getAllPublicContractors(bcId)
      );
      const contractorsWithImages = await Promise.all(
        contractors.filter(c => c.status).map(async (c) => {

          if(c.img) 
          {
            try{
              const imageUrl = await firstValueFrom(this.imageApiService.getImage(c.img));
              return { 
                ...c, 
                img: imageUrl
              };
            }
            catch(err){
              console.error("Error loading images", err);
              return {
                ...c, 
                img: ""
              };
            }
          }
          else
          {
            c.img = "assets/images/no_image.png";
          }
          return c;
        })
      );

      this.contractorDetails.set(contractorsWithImages);
    }
    catch(err) {
      console.error("Error loading public contractors", err);
    }
  }
  updateContractor(contractor: ContractorDetails): Observable<ContractorDetails>
  {
    return new Observable<ContractorDetails>((observer) => {
      this.bodyCoporateApiService.updateContractorDetails(contractor).subscribe({
        next: (updatedContractor) => {
          this.contractorDetails.update(details => {
            const index = details.findIndex(c => c.uuid === updatedContractor.uuid);
            if (index !== -1) {
              details[index] = updatedContractor;
            } else {
              details.push(updatedContractor);
            }
            return details;
          });
          observer.next(updatedContractor);
          observer.complete();
        },
        error: (err) => {
          console.error("Error updating contractor", err);
          observer.error(err);
        }
      });
    });
  }
  getBodyCorporateName(bcId: string): Observable<string>
  {
    return this.bodyCoporateApiService.getBodyCoporate(bcId).pipe(
      map(res => res.corporateName)
    );
  }
  getBodyCorporate(bcId: string)
  {
    return this.bodyCoporateApiService.getBodyCoporate(bcId);
  }
  makeContractorTrusted(bcId:string, contractorId: string)
  {
    return this.bodyCoporateApiService.makeContractorTrusted(contractorId, bcId);
  }

 async loadAnomalies(bcId: string) {
  this.anomalies.set([]);
  
  try {
    const buildings = await firstValueFrom(
      this.bodyCoporateApiService.getBuildingsLinkedtoBC(bcId)
    );

    const buildingUuids: string[] = buildings
      .map(b => b.buildingUuid)
      .filter((uuid): uuid is string => typeof uuid === 'string');

    await Promise.all(buildingUuids.map(async uuid => {
        try {
          this.inventoryService.getInventoryItemsByBuilding(uuid).subscribe({
            next: (inventory) => {
              const filtered = inventory.filter(i => i.unit === 'ANOMALY');

              filtered.forEach((f) => {
                this.buildingServie.getBuildingById(uuid).subscribe({
                  next: (res) => {
                    if(res.trusteeUuid)
                    {
                      this.inviteService.getTrusteesById(res.trusteeUuid).subscribe({
                        next: (t) => {
                          
                          const anomly: Anomaly = {
                            ...f,
                            email: t.email,
                            trusteeUuid: t.trusteeUuid,
                            houseName: res.name
                          }
                          this.addToAnomalies(anomly) 
                        }
                      })
                    }
                  }
                })
              })
            },
            error: (err) => {
              console.error("Error loading inventory:", err);
            }
          })
        } catch (error) {
          console.error(`Failed to load inventory anomalies for building ${uuid}`, error);
        }
      }));
    
  } catch (error) {
    console.error('Failed to load buildings', error);
  }
}
  private addToAnomalies(anomaly: Anomaly): void {
    this.anomalies.update(items => [...items, anomaly]);
  }
}