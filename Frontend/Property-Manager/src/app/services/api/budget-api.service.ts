import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuildingDetails } from '../../models/buildingDetails.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetApiService {

  private url = '/api';
  constructor(private http: HttpClient) { }

  createBudget(totalBudget: number, maintenanceBudget: number, inventoryBudget:number, updatedOn: Date, buildingId: string): Observable<BuildingDetails>
  {
    const newBudget = {
      year: updatedOn.getFullYear(),
      totalBudget: totalBudget,
      maintenanceBudge: maintenanceBudget,
      inventoryBudget: inventoryBudget,
      appovalDate: updatedOn,
      buildingUuid: buildingId
    };

    return this.http.post<BuildingDetails>(`${this.url}/budgets`, newBudget);
  }

  getBudgetById(budgetId: string) : Observable<BuildingDetails>
  {
    return this.http.get<BuildingDetails>(`${this.url}/budgets/${budgetId}`);
  }

  getAllBudgets(): Observable<BuildingDetails[]>
  {
    return this.http.get<BuildingDetails[]>(`${this.url}/budgets`);
  }

  getBudgetsByBuildingId(buildingId: string): Observable<BuildingDetails>
  {
    return this.http.get<BuildingDetails>(`${this.url}/budgets/building/${buildingId}`);
  }

  getBudgetsByYear(year: string): Observable<BuildingDetails[]>
  {
    return this.http.get<BuildingDetails[]>(`${this.url}/budgets/year/${year}`);
  }

  getBudgetsByBuildingIdAndYear(buidlingId: string, year: string): Observable<BuildingDetails[]>
  {
    return this.http.get<BuildingDetails[]>(`${this.url}/budgets/building/${buidlingId}/year/${year}`);
  }

  updateBudget(buildingId: string, budget: BuildingDetails)
  {
    const updatedBudget = {
      year: budget.updatedOn.getFullYear(),
      totalBudget: budget.totalBudget,
      maintenanceBudge: budget.maintenanceBudget,
      inventoryBudget: budget.inventoryBudget,
      appovalDate: budget.updatedOn,
      buildingUuid: buildingId
    };

    return this.http.put<BuildingDetails>(`${this.url}/budgets/${buildingId}`, updatedBudget);
  }

  deleteBudget(budgetId: string): Observable<BuildingDetails>
  {
    return this.http.delete<BuildingDetails>(`${this.url}/budgets/${budgetId}`);
  }
}
