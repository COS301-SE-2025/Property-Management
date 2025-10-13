import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../../../models/inventory.model';
import { environmentMobile } from '../../../environment';
import { ForecastResponse } from '../../../models/forecast.model';

interface Anomaly{
  message: string;
  timestamp: Date;
  data: {
    title: string;
    price: number;
  },
  stats: {
    mean_price: number;
    std_price: number;
    min_threshold: number;
    max_threshold: number;
    sample_count: number;
  }
}
@Injectable({
  providedIn: 'root'
})
export class InventoryItemApiService {

  // private url = '/api';
  private url = environmentMobile.apiUrl;
  private wowFactorUrl = environmentMobile.wowFactorUrl;

  constructor(private http: HttpClient) { }

  getAllInventoryItems() : Observable<Inventory[]>
  {
    return this.http.get<Inventory[]>(`${this.url}/inventory`,
    { withCredentials: true });
  }

  getInventoryItemsByBuilding(buildingId: string) : Observable<Inventory[]>
  {
    return this.http.get<Inventory[]>(`${this.url}/inventory/building/${buildingId}`,
    { withCredentials: true });
  }

  getInventoryForecast(buildingId: string): Observable<ForecastResponse> {
    return this.http.get<ForecastResponse>(
      `${this.url}/buildings/${buildingId}/forecasts?months=2&freq=M`,
      { withCredentials: true }
    );
  }

  getInventoryItemsById(inventoryId: string): Observable<Inventory>
  {
    return this.http.get<Inventory>(`${this.url}/inventory/${inventoryId}`,
    { withCredentials: true });
  }

  addInventoryItem(name: string, unit: string, price: number, quantity:number, buildingId: string) : Observable<Inventory>
  {
    const item ={
      name: name,
      unit: unit,
      price: price,
      quantity: quantity,
      buildingUuid: buildingId
    }

    return this.http.post<Inventory>(`${this.url}/inventory`, item,
    { withCredentials: true });
  }

  updateInventoryItem(inventoryItem: Inventory) : Observable<Inventory>
  {
    const item = {
      name: inventoryItem.name,
      unit: inventoryItem.unit,
      quantity: inventoryItem.quantityInStock,
      price: inventoryItem.price
    }

    return this.http.put<Inventory>(`${this.url}/inventory/${inventoryItem.itemUuid}`, item,
    { withCredentials: true });
  }
  updateInventoryItemUnit(itemId: string, unitName: string): Observable<Inventory>
  { 
    const item = {
      unit: unitName
    };

    return this.http.put<Inventory>(`${this.url}/inventory/${itemId}`, item,
    { withCredentials: true });
  }

  updateInventoryItemQuantity(itemId: string, differenceQuantity: number, operation: string): Observable<Inventory>
  {
    const quantityUpdate = {
      quantity: differenceQuantity,
      operation: operation
    }

    return this.http.patch<Inventory>(`${this.url}/inventory/${itemId}/quantity`, quantityUpdate,
    { withCredentials: true });
  }
  
  deleteInventoryItem(itemId: string): Observable<Inventory>
  {
    return this.http.delete<Inventory>(`${this.url}/inventory/${itemId}`,
      { withCredentials: true });
  }
  detectAnomaly(title: string, price: number)
  {
      const req = {
          title: title,
          price: price
      }
      return this.http.post<Anomaly>(`${this.wowFactorUrl}/anomaly`, req);
  }

  updateInventoryItemStatus(itemUuid: string, status: string): Observable<any> {
    return this.http.patch<any>(`${this.url}/inventory-items/${itemUuid}/status`, { status }, { withCredentials: true });
  }

}
