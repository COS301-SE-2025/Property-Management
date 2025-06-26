import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaintenanceTask } from '../../../models/maintenanceTask.model';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  private url = '/api';
  constructor(private http: HttpClient) { }

  createTask(title: string, des: string, status: string, scheduledDate: Date, approved: boolean, buildingId: string, trusteeId: string): Observable<MaintenanceTask>
  {
    const req = {
      title: title,
      des: des,
      status: status,
      scheduled_date: scheduledDate,
      approved: approved,
      b_uuid: buildingId,
      t_uuid: trusteeId,
      img: "2de5597f-981b-4de5-b2af-45703cc7c258"
    };
    console.log(req);

    return this.http.post<MaintenanceTask>(`${this.url}/maintenance`, req);
  } 

  getAllTasks(): Observable<MaintenanceTask[]>
  {
    return this.http.get<MaintenanceTask[]>(`${this.url}/maintenance`)
  }

  getTaskById(taskId: string): Observable<MaintenanceTask>
  {
    return this.http.get<MaintenanceTask>(`${this.url}/maintenance`)
  }

  updateTaskStatus(status: 'pending' | 'done', taskId: string)
  {
    const req = {
      status: status
    }

    return this.http.put<MaintenanceTask>(`${this.url}/maintenance/${taskId}`, req);
  }
}
