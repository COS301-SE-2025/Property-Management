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
    const localISO = (date: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const headers = new HttpHeaders().set('isOwner', String(isOwner)).set('isBodyCorporate', String(isBodyCorporate));
    const req = {
      title: title,
      description: des,
      scheduledDate: localISO(scheduledDate),
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

    return this.http.put<MaintenanceTask>(`${this.url}/maintenance/${taskId}`, req, );
  }
  updateTaskApproval(status: string, taskId: string, isBodyCorporate: boolean)
  {
    const headers = new HttpHeaders().set('isBodyCorporate', String(isBodyCorporate));
    const req = {
      approvalStatus: status
    }

    return this.http.put<MaintenanceTask>(`${this.url}/maintenance/update/${taskId}`, req, { headers });
  }
  updateTaskScheduledDate(taskId: string, date: Date)
  {
    const localISO = (date: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    console.log(localISO(date));

    const headers = new HttpHeaders().set('isBodyCorporate', String(true));
    const req = {
      scheduledDate: localISO(date)
    }

    return this.http.put<MaintenanceTask>(`${this.url}/maintenance/update/${taskId}`, req, { headers });
  }
  assignContractorsToTask(contractorIds: string[], taskId: string)
  {
    const headers = new HttpHeaders().set('isBodyCorporate', String(true));
    const req = {
      taskUuid: taskId,
      contractorUuids: contractorIds
    };

    return this.http.post<MaintenanceTask>(`${this.url}/maintenance/assign-contractors`, req, { headers });
  }
  deleteTask(taskId: string)
  {
    return this.http.delete<MaintenanceTask>(`${this.url}/maintenance/${taskId}`);
  }
}
