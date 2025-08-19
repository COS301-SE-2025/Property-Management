import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../../../models/inventory.model';
import { environmentMobile } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemApiService {

  // private url = '/api';
  private url = environmentMobile.apiUrl;

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

  updateInventoryItemQuantity(itemId: string, differenceQuantity: number, operation: string): Observable<Inventory>
  {
    const quantityUpdate = {
      quantity: differenceQuantity,
      operation: operation
    }

    return this.http.patch<Inventory>(`${this.url}/inventory/${itemId}/quantity`, quantityUpdate,
    { withCredentials: true });
  }
  
  deleteInventoryItem(inventoryItem: Inventory): Observable<Inventory>
  {
    return this.http.delete<Inventory>(`${this.url}/inventory/${inventoryItem.itemUuid}`,
    { withCredentials: true });
  }
}
