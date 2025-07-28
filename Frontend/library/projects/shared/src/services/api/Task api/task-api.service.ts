import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MaintenanceTask } from '../../../models/maintenanceTask.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  private url = '/api';
  constructor(private http: HttpClient) { }

  createTask(title: string, des: string, scheduledDate: Date, buildingId: string, trusteeId: string, imgId: string, createdId: string, isOwner: boolean, isBodyCorporate: boolean): Observable<MaintenanceTask>
  {
    const headers = new HttpHeaders().set('isOwner', String(isOwner)).set('isBodyCorporate', String(isBodyCorporate));
    const req = {
      title: title,
      description: des,
      scheduledDate: scheduledDate,
      buildingUuid: buildingId,
      trusteeUuid: trusteeId,
      imageUuid: imgId,
      createdByUuid: createdId,
      approvalStatus: "PENDING"
    };

    return this.http.post<MaintenanceTask>(`${this.url}/maintenance/create`, req, { headers }).pipe(map( res => ({
      ...res,
      uuid: res['taskUuid']
    })
    ));
  } 

  getAllTasks(): Observable<MaintenanceTask[]>
  {
    return this.http.get<MaintenanceTask[]>(`${this.url}/maintenance`);
  }

  getTaskById(taskId: string): Observable<MaintenanceTask>
  {
    return this.http.get<MaintenanceTask>(`${this.url}/maintenance/${taskId}`);
  }

  updateTaskStatus(status: 'pending' | 'done', taskId: string)
  {
    const req = {
      status: status
    }

    return this.http.put<MaintenanceTask>(`${this.url}/maintenance/${taskId}`, req);
  }
}
