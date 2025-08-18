import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryUsage } from '../../../models/inventoryUsage.model';
import { environmentMobile } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryUsageApiService {

  // private url = '/api';
  private url = environmentMobile.apiUrl;
  constructor(private http: HttpClient) { }

  createInventoryUsage(itemId: string, taskId: string, quantityUsed: number): Observable<InventoryUsage>
  {
    const newInventoryUsage = {
      itemUuid: itemId,
      taskUuid: taskId,
      quantityUsed: quantityUsed
    };

    return this.http.post<InventoryUsage>(`${this.url}/inventory-usage`, newInventoryUsage,
    { withCredentials: true });
  }

  getAllInventoryUsage(page: number, size: number): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage?page=${page}&size=${size}`,
    { withCredentials: true });
  }

  getInventoryUsageById(usageId: string): Observable<InventoryUsage>
  {
    return this.http.get<InventoryUsage>(`${this.url}/inventory-usage/${usageId}`,
    { withCredentials: true });
  }
  getInventoryUsageByTaskId(taskId: string): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/by-task/${taskId}`,
    { withCredentials: true });
  }

  updateInventoryUsageById(usageId: string, inventoryUsage: InventoryUsage)
  {
    const updatedInventory = {
      quantityUsed: inventoryUsage.quantityUsed,
      trusteeApproved: inventoryUsage.trusteeApproval,
      approvalDate: inventoryUsage.approvedDate
    };
    return this.http.put<InventoryUsage>(`${this.url}/inventory-usage/${usageId}`, updatedInventory,
    { withCredentials: true });
  }

  deleteInventoryUsageById(usageId: string): Observable<InventoryUsage>
  {
    return this.http.delete<InventoryUsage>(`${this.url}/inventory-usage/${usageId}`,
    { withCredentials: true });
  }

  ApproveOrRejectInventoryUsage(usageId: string, inventoryUsage: InventoryUsage): Observable<InventoryUsage>
  {
    const updateStatus = {
      trusteeApproved: inventoryUsage.trusteeApproval,
      approvalDate: inventoryUsage.approvedDate
    }

    return this.http.patch<InventoryUsage>(`${this.url}/inventory-usage/${usageId}/approval`, updateStatus,
    { withCredentials: true });
  }
  getUsageRecordsByItemId(itemId: string): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/by-item/${itemId}`,
    { withCredentials: true });
  }

  getUsageRecordsByTaskId(taskId: string): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/by-task/${taskId}`,
    { withCredentials: true })
  }

  getUsageRecordsByContractorId(contractorId: string): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/by-contractor/${contractorId}`,
    { withCredentials: true });
  }

  getApprovedUsageRecords(): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/approved`,
    { withCredentials: true });
  }

  getPendingUsageRecords(): Observable<InventoryUsage[]>
  {
    return this.http.get<InventoryUsage[]>(`${this.url}/inventory-usage/pending-approval`,
    { withCredentials: true });
  }

  getTotalQuantityUsedByItemId(itemId: string): Observable<number>
  {
    return this.http.get<number>(`${this.url}/inventory-usage/total-quantity/item/${itemId}`,
    { withCredentials: true });
  }

  getTotalQuantityUsedByContractorId(contractorId: string): Observable<number>
  {
    return this.http.get<number>(`${this.url}/inventory-usage/total-quantity/contractor/${contractorId}`,
    { withCredentials: true });
  }
}
