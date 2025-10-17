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
import { firstValueFrom } from 'rxjs';
import { BudgetPrediction } from '../public-api';
import { ForecastResponse } from '../models/forecast.model';



interface Prediction {
  ds: Date;
  yhat: number;
}

@Injectable({
  providedIn: 'root'
})
export class HousesService {
  constructor(
    private buildingApiService: BuildingApiService,
    private budgetApiService: BudgetApiService,
    private inventoryItemApiService: InventoryItemApiService,
    private taskApiService: TaskApiService,
    private imageApiService: ImageApiService
  ) {}

  houses = signal<Property[]>([]);
  inventory = signal<Inventory[]>([]);
  budgets = signal<BuildingDetails>({} as BuildingDetails);
  timeline = signal<MaintenanceTask[]>([]);
  budgetGraph = signal<Graph>({} as Graph);
  inventoryForecast = signal<ForecastResponse | null>(null);
  labels: Date[] = [];

  addToHouses(house: Property) {
    this.houses.set([...this.houses(), house]);
  }
  addToTimeline(task: MaintenanceTask) {
    this.timeline.set([...this.timeline(), task]);
  }
  removeFromHouses(id: string) {
    this.houses.set(this.houses().filter(h => h.buildingUuid !== id));
  }
  addToInventory(item: Inventory) {
    this.inventory.set([...this.inventory(), item]);
  }
  addToTasks(task: MaintenanceTask) {
    this.timeline.set([...this.timeline(), task]);
    this.sortTimeline();
  }

  getHouseById(id: string): Property | undefined {
    return this.houses().find(house => house.buildingUuid === id);
  }
  getInventoryById(id: string): Inventory | undefined {
    return this.inventory().find(item => item.itemUuid === id);
  }

  private sortTimeline() {
    return this.timeline().sort((a: MaintenanceTask, b: MaintenanceTask) => {
      if (!a.status && b.status) return -1;
      else if (a.status && !b.status) return 1;
      return 0;
    });
  }

  async getImagesForBuilding(buildingUuid: string): Promise<string[]> {
    try {
      const imageResponse = await firstValueFrom(
        this.imageApiService.getImages('', '', '', buildingUuid)
      );
      const imageUrls = Array.isArray(imageResponse) ? imageResponse : imageResponse.split(',').map(url => url.trim());
      return imageUrls.length > 0 ? imageUrls : ['assets/images/no_image.png'];
    } catch (err) {
      console.error('Error fetching images for building', err);
      return ['assets/images/no_image.png'];
    }
  }

  async loadHouses(trusteeId: string) {
    this.houses.set([]);
    try {
      const buildings = await firstValueFrom(
        this.buildingApiService.getBuildingsByTrustee(trusteeId)
      );

      const buildingImages = await Promise.all(
        buildings.buildings.map(async b => {
          if (b.propertyImage) {
            try {
              const url = await firstValueFrom(
                this.imageApiService.getImage(b.propertyImage)
              );
              return { ...b, propertyImage: url };
            } catch (error) {
              console.error('Error fetching images', error);
              return { ...b, propertyImage: 'assets/images/no_image.png' };
            }
          } else {
            return { ...b, propertyImage: 'assets/images/no_image.png' };
          }
        })
      );
      this.houses.set(buildingImages);
    } catch (error) {
      console.error('Error fetching buildings', error);
    }
  }

  async loadHouseById(houseId: string): Promise<Property | undefined> {
    try {
      const building = await firstValueFrom(
        this.buildingApiService.getBuildingById(houseId)
      );

      if (building.propertyImage) {
        try {
          const url = await firstValueFrom(
            this.imageApiService.getImage(building.propertyImage)
          );
          building.propertyImage = url;
        } catch (err) {
          console.error('Error fetching image', err);
          building.propertyImage = 'assets/images/no_image.png';
        }
      } else {
        building.propertyImage = 'assets/images/no_image.png';
      }

      this.addToHouses(building);
      return building;
    } catch (err) {
      console.error('Error fetching building', err);
      return undefined;
    }
  }

  async loadBudget(houseId: string) {
    this.budgetApiService.getBudgetsByBuildingId(houseId).subscribe(
      (buildingDetails: BuildingDetails[]) => {
        const firstElement = buildingDetails[buildingDetails.length - 1];

        this.budgetApiService
          .getBudgetPredictionHouse(houseId, 'M', 6, 'inventory_budget')
          .subscribe({
            next: res => {
              firstElement.predictedInventoryBudget = res.prediction[0].yhat;
              this.budgetPrediction(firstElement, houseId);
            },
            error: err => {
              console.error('Couldnt get predicted inventory budget', err);
              this.budgetPrediction(firstElement, houseId);
            }
          });

        this.budgetApiService
          .getBudgetPredictionHouse(houseId, 'M', 6, 'total_budget')
          .subscribe({
            next: res => {
              this.handleBudgetPrediction(res, buildingDetails);
            },
            error: err => {
              console.error('Budget prediction failed', err);
              this.handleBudgetData(buildingDetails, []);
            }
          });

        const sortedDetails = [...buildingDetails].sort((a, b) => {
          return (
            new Date(a.approvalDate).getTime() -
            new Date(b.approvalDate).getTime()
          );
        });

        this.createGraphData(sortedDetails, []);
      }
    );
  }

  private budgetPrediction(element: BuildingDetails, houseId: string) {
    this.budgetApiService
      .getBudgetPredictionHouse(houseId, 'M', 6, 'maintenance_budget')
      .subscribe({
        next: res => {
          element.predictedMaintenanceBudget = res.prediction[0].yhat;
          this.budgets.set(element);
        },
        error: err => {
          console.error('Couldnt get predicted maintance budget', err);
          this.budgets.set(element);
        }
      });
  }

  private handleBudgetPrediction(
    prediction: BudgetPrediction,
    buildingDetails: BuildingDetails[]
  ) {
    const threeMonths = prediction.prediction.slice(0, 3);
    this.handleBudgetData(buildingDetails, threeMonths);
  }

  private handleBudgetData(
    buildingDetails: BuildingDetails[],
    predictions: Prediction[]
  ) {
    const sortedDetails = [...buildingDetails].sort((a, b) => {
      return (
        new Date(a.approvalDate).getTime() -
        new Date(b.approvalDate).getTime()
      );
    });

    this.createGraphData(sortedDetails, predictions);
  }

  private createGraphData(
    data: BuildingDetails[],
    predictions: Prediction[]
  ) {
    const labels = data.map(item => {
      const date = new Date(item.approvalDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
    });

    const values = data
      .map(item => item.totalBudget)
      .filter((v): v is number => v !== undefined);

    if (predictions.length !== 0) {
      const predictionLabels = predictions.map(pred => {
        const date = new Date(pred.ds);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
      });

      const predictionValues = predictions.map(pred => pred.yhat);
      const allLabels = [...labels, ...predictionLabels];

      const graphData: Graph = {
        labels: allLabels,
        datasets: [
          {
            label: 'Existing Budget',
            data: [...values, null, null, null],
            fill: false,
            backgroundColor: 'rgba(255,227,114, 0.7)',
            borderColor: 'rgb(255,227,114)',
            pointBackgroundColor: 'rgb(255, 227, 114)',
            tension: 0.1,
            borderWidth: 2,
            spanGaps: true
          },
          {
            label: 'Predicted Budget',
            data: [
              ...Array(values.length - 1).fill(null),
              values[values.length - 1],
              ...predictionValues
            ],
            fill: false,
            backgroundColor: 'rgba(255, 68, 33, 0.7)',
            borderColor: 'rgb(255, 68, 33)',
            pointBackgroundColor: 'rgb(255, 68, 33)',
            tension: 0.1,
            borderWidth: 2,
            spanGaps: true
          }
        ]
      };
      this.budgetGraph.set(graphData);
    } else {
      const graphData: Graph = {
        labels: labels,
        datasets: [
          {
            label: 'Existing Budget',
            data: values,
            fill: false,
            backgroundColor: 'rgba(255,227,114, 0.7)',
            borderColor: 'rgb(255,227,114)',
            pointBackgroundColor: 'rgb(255, 227, 114)',
            tension: 0.1,
            borderWidth: 2,
            spanGaps: true
          }
        ]
      };
      this.budgetGraph.set(graphData);
    }
  }

  async isBudget(buildingId: string): Promise<boolean> {
    return new Promise(resolve => {
      this.budgetApiService.getBudgetsByBuildingId(buildingId).subscribe({
        next: budget => {
          const budgetExists = Array.isArray(budget) && budget.length > 0;
          resolve(budgetExists);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  }

  async loadInventory(houseId: string) {
    this.inventory.set([]);
    this.inventoryItemApiService.getInventoryItemsByBuilding(houseId).subscribe({
      next: inventory => {
        const filtered = inventory.filter(i => i.unit !== 'ANOMALY');
        this.inventory.set(filtered);
      },
      error: err => {
        console.error('Error loading inventory:', err);
      }
    });
  }

  async loadInventoryForecast(houseId: string) {
    try {
      const res = await firstValueFrom(
        this.inventoryItemApiService.getInventoryForecast(houseId)
      );
      this.inventoryForecast.set(res as ForecastResponse);
    } catch (err) {
      console.error('Error loading inventory forecast:', err);
      this.inventoryForecast.set(null);
    }
  }

  async loadTasks(buildingId: string) {
    this.taskApiService.getAllTasks().subscribe({
      next: task => {
        const filteredTasks = task.filter(t => t.buuid === buildingId);
        this.timeline.set(filteredTasks);
        this.sortTimeline();
      },
      error: err => {
        console.error('Error getting tasks', err);
      }
    });
  }

  async updateInventory(items: Inventory[]) {
    const updatedItems = items.map(
      item =>
        new Promise<void>((resolve, reject) => {
          if (item.quantityInStock > 0) {
            this.inventoryItemApiService.updateInventoryItem(item).subscribe({
              next: updatedItem => {
                this.inventory.update(current =>
                  current.map(i =>
                    i.itemUuid === updatedItem.itemUuid ? updatedItem : i
                  )
                );
                resolve();
              },
              error: err => {
                console.error(`Error updating item ${item}`, err);
                reject(err);
              }
            });
          } else {
            this.deleteInvetoryItem(item);
          }
        })
    );

    try {
      await Promise.all(updatedItems);
      return true;
    } catch (error) {
      console.error('Inventory items update failed', error);
      return false;
    }
  }

  deleteInvetoryItem(item: Inventory): Promise<void> {
    return new Promise((resolve, reject) => {
      this.inventoryItemApiService.deleteInventoryItem(item.itemUuid).subscribe({
        next: () => {
          this.inventory.update(current =>
            current.filter(i => i.itemUuid !== item.itemUuid)
          );
          resolve();
        },
        error: err => {
          console.error('Error deleting item ${item}', err);
          reject(err);
        }
      });
    });
  }
}
