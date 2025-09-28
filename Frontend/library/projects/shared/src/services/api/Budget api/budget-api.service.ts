import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuildingDetails } from '../../../models/buildingDetails.model';
import { environmentMobile } from '../../../environment';
import { BudgetPrediction } from '../../../public-api';

@Injectable({
  providedIn: 'root'
})
export class BudgetApiService {

  // private url = '/api';
  private url = environmentMobile.apiUrl;
  private wowFactorUrl = environmentMobile.wowFactorUrl

  constructor(private http: HttpClient) { }

  createBudget(totalBudget: number, maintenanceBudget: number, inventoryBudget:number, updatedOn: Date, buildingId: string): Observable<BuildingDetails>
  {
    const newBudget = {
      year: updatedOn.getFullYear(),
      totalBudget: totalBudget,
      maintenanceBudget: maintenanceBudget,
      inventoryBudget: inventoryBudget,
      approvalDate: updatedOn,
      buildingUuid: buildingId
    };
    return this.http.post<BuildingDetails>(`${this.url}/budgets`, newBudget,
    { withCredentials: true });
  }

  getBudgetById(budgetId: string) : Observable<BuildingDetails>
  {
    return this.http.get<BuildingDetails>(`${this.url}/budgets/${budgetId}`,
    { withCredentials: true });
  }

  getAllBudgets(): Observable<BuildingDetails[]>
  {
    return this.http.get<BuildingDetails[]>(`${this.url}/budgets`,
    { withCredentials: true });
  }

  getBudgetsByBuildingId(buildingId: string): Observable<BuildingDetails[]>
  {
    return this.http.get<BuildingDetails[]>(`${this.url}/budgets/building/${buildingId}`,
    { withCredentials: true });
  }

  getBudgetsByYear(year: string): Observable<BuildingDetails[]>
  {
    return this.http.get<BuildingDetails[]>(`${this.url}/budgets/year/${year}`,
    { withCredentials: true });
  }

  getBudgetsByBuildingIdAndYear(buidlingId: string, year: string): Observable<BuildingDetails[]>
  {
    return this.http.get<BuildingDetails[]>(`${this.url}/budgets/building/${buidlingId}/year/${year}`,
    { withCredentials: true });
  }

  updateBudget(budgetId: string, budget: BuildingDetails)
  {
    const totalBudget = (budget.maintenanceBudget + budget.inventoryBudget);

    const updatedBudget = {
      year: budget.approvalDate.getFullYear(),
      totalBudget: totalBudget,
      maintenanceBudget: budget.maintenanceBudget,
      maintenanceSpent: budget.maintenanceSpent,
      inventoryBudget: budget.inventoryBudget,
      inventorySpent: budget.inventorySpent,
      approvalDate: budget.approvalDate,
      buildingUuid: budget.buildingUuid
    };

    return this.http.put<BuildingDetails>(`${this.url}/budgets/${budgetId}`, updatedBudget,
    { withCredentials: true });
  }

  deleteBudget(budgetId: string): Observable<BuildingDetails>
  {
    return this.http.delete<BuildingDetails>(`${this.url}/budgets/${budgetId}`,
    { withCredentials: true });
  }

  getBudgetPredictionHouse(buildingId: string, freq: string, period: number, type: string)
  {
    const req = {
      freq: freq,
      periods: period,
      budget_type: type
    }
    return this.http.post<BudgetPrediction>(`${this.wowFactorUrl}/budget-prediction/building/${buildingId}`, req, {withCredentials: true});
  }
  getBudgetPredictionBodyCorporate(bcId: string, freq: string, period: number, type: string)
  {
    const req = {
      freq: freq,
      periods: period,
      budget_type: type
    }
    return this.http.post<BudgetPrediction>(`${this.wowFactorUrl}/budget-prediction/body-corporate/${bcId}`, req, {withCredentials: true});
  }
}
