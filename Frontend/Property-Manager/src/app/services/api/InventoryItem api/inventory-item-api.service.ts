import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../../../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemApiService {

  private url = '/api';

  constructor(private http: HttpClient) { }

  getAllInventoryItems() : Observable<Inventory[]>
  {
    return this.http.get<Inventory[]>(`${this.url}/inventory`);
  }

  getInventoryItemsByBuilding(buildingId: string) : Observable<Inventory[]>
  {
    return this.http.get<Inventory[]>(`${this.url}/inventory/building/${buildingId}`);
  }

  getInventoryItemsById(inventoryId: string): Observable<Inventory>
  {
    return this.http.get<Inventory>(`${this.url}/inventory/${inventoryId}`);
  }

  addInventoryItem(name: string, unit: string, quantity:number, buildingId: string) : Observable<Inventory>
  {
    const item ={
      name: name,
      unit: unit,
      quantity: quantity,
      buildingUuid: buildingId
    }

    return this.http.post<Inventory>(`${this.url}/inventory`, item);
  }

  updateInventoryItem(inventoryItem: Inventory) : Observable<Inventory>
  {
    const item = {
      name: inventoryItem.name,
      unit: inventoryItem.unit,
      quantity: inventoryItem.quantity
    }

    return this.http.put<Inventory>(`${this.url}/inventory/${inventoryItem.itemUuid}`, item);
  }

  updateInventoryItemQuantity(inventoryItem: Inventory, differenceQuantity: number, operation: string): Observable<Inventory>
  {
    const quantityUpdate = {
      quantity: differenceQuantity,
      operation: operation
    }

    return this.http.patch<Inventory>(`${this.url}/inventory/${inventoryItem.itemUuid}/quantity`, quantityUpdate);
  }

  deleteInventoryItem(inventoryItem: Inventory): Observable<Inventory>
  {
    return this.http.delete<Inventory>(`${this.url}/inventory/${inventoryItem.itemUuid}`);
  }
}
