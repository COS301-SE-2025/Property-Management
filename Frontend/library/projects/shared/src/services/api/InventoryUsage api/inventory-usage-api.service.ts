import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryUsage } from '../../../models/inventoryUsage.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryUsageApiService {

  private url = '/api';
  constructor(private http: HttpClient) { }

  createInventoryUsage(itemId: string, taskId: string, contractorId: string, quantityUsed: number): Observable<InventoryUsage>
  {
    const newInventoryUsage = {
      itemUuid: itemId,
      taskUuid: taskId,
      usedByContractorUuid: contractorId,
      quantityUsed: quantityUsed
    };

    return this.http.post<InventoryUsage>(`${this.url}/inventory-usage`, newInventoryUsage);
  }

  getAllInventoryUsage(page: number, size: number): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage?page=${page}&size=${size}`);
  }

  getInventoryUsageById(usageId: string): Observable<InventoryUsage>
  {
    return this.http.get<InventoryUsage>(`${this.url}/inventory-usage/${usageId}`);
  }

  updateInventoryUsageById(usageId: string, inventoryUsage: InventoryUsage)
  {
    const updatedInventory = {
      quantityUsed: inventoryUsage.quantityUsed,
      trusteeApproved: inventoryUsage.trusteeApproval,
      approvalDate: inventoryUsage.approvedDate
    };
    return this.http.put<InventoryUsage>(`${this.url}/inventory-usage/${usageId}`, updatedInventory);
  }

  deleteInventoryUsageById(usageId: string): Observable<InventoryUsage>
  {
    return this.http.delete<InventoryUsage>(`${this.url}/inventory-usage/${usageId}`);
  }

  ApproveOrRejectInventoryUsage(usageId: string, inventoryUsage: InventoryUsage): Observable<InventoryUsage>
  {
    const updateStatus = {
      trusteeApproved: inventoryUsage.trusteeApproval,
      approvalDate: inventoryUsage.approvedDate
    }

    return this.http.patch<InventoryUsage>(`${this.url}/inventory-usage/${usageId}/approval`, updateStatus);
  }
  getUsageRecordsByItemId(itemId: string): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/by-item/${itemId}`);
  }

  getUsageRecordsByTaskId(taskId: string): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/${taskId}`)
  }

  getUsageRecordsByContractorId(contractorId: string): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/by-contractor/${contractorId}`);
  }

  getApprovedUsageRecords(): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/approved`);
  }

  getPendingUsageRecords(): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/pending-approval`);
  }

  getTotalQuantityUsedByItemId(itemId: string): Observable<number>
  {
    return this.http.get<number>(`${this.url}/inventory-usage/total-quantity/item/${itemId}`);
  }

  getTotalQuantityUsedByContractorId(contractorId: string): Observable<number>
  {
    return this.http.get<number>(`${this.url}/inventory-usage/total-quantity/contractor/${contractorId}`);
  }
}
