import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, scheduled,switchMap } from 'rxjs';
import { MaintenanceTask } from '../../../models/maintenanceTask.model';
import { Quote } from '../../../public-api';
import { environmentMobile } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  // private url = '/api';
  private url = environmentMobile.apiUrl;
  constructor(private http: HttpClient) { }

  createTask(title: string, des: string, scheduledDate: Date, buildingId: string, trusteeId: string, imgId: string, createdId: string, isOwner: boolean, isBodyCorporate: boolean, proirity: string): Observable<MaintenanceTask>
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
      approvalStatus: "PENDING",
      priority: proirity
    };
    console.log(req);

    return this.http.post<MaintenanceTask>(`${this.url}/maintenance/create`, req, { headers , withCredentials: true }).pipe(map( res => ({
      ...res,
      uuid: res['taskUuid'] as string
    })
    ));
  } 

  getAllTasks(): Observable<MaintenanceTask[]>
  {
    return this.http.get<MaintenanceTask[]>(`${this.url}/maintenance`,
    { withCredentials: true });
  }

  getTaskById(taskId: string): Observable<MaintenanceTask>
  {
    return this.http.get<MaintenanceTask>(`${this.url}/maintenance/${taskId}`,
    { withCredentials: true });
  }

  updateTaskStatus(status: 'pending' | 'done', taskId: string)
  {
    const req = {
      status: status
    }

    return this.http.put<MaintenanceTask>(`${this.url}/maintenance/${taskId}`, req,
    { withCredentials: true });
  }

  updateTaskAllowContractor(taskId: string): Observable<MaintenanceTask> {
    const body = { status: 'APPROVED' };

    return this.http.put<MaintenanceTask>(`${this.url}/maintenance/update/${taskId}`, body, {
      withCredentials: true,
      headers: { 'isBodyCorporate': 'true' }
    });
  }

  updateTaskAssignedContractor(contractorId: string, taskId: string)
  {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDay()-1);

    const localISO = (date: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    const headers = new HttpHeaders().set('isBodyCorporate', String(true));
    const req = {
      contractorUuid: contractorId,
      approvalStatus: "APPROVED",
      scheduled_date: localISO(pastDate)
    };

    return this.http.put<MaintenanceTask>(`${this.url}/maintenance/update/${taskId}`, req, { headers, withCredentials: true  });
  }
  updateTaskApproval(status: string, taskId: string, isBodyCorporate: boolean)
  {
    const headers = new HttpHeaders().set('isBodyCorporate', String(isBodyCorporate));
    const req = {
      approvalStatus: status
    }

    return this.http.put<MaintenanceTask>(`${this.url}/maintenance/update/${taskId}`, req, { headers , withCredentials: true });
  }
  updateTaskScheduledDate(taskId: string, date: Date)
  {
    const localISO = (date: Date) => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    const headers = new HttpHeaders().set('isBodyCorporate', String(true));
    const req = {
      scheduledDate: localISO(date)
    }

    return this.http.put<MaintenanceTask>(`${this.url}/maintenance/update/${taskId}`, req, { headers , withCredentials: true });
  }
  assignContractorsToTask(contractorIds: string[], taskId: string)
  {
    const headers = new HttpHeaders().set('isBodyCorporate', String(true));
    const req = {
      taskUuid: taskId,
      contractorUuids: contractorIds
    };

    return this.http.post<MaintenanceTask>(`${this.url}/maintenance/assign-contractors`, req,{ headers , withCredentials: true });
  }
  deleteTask(taskId: string)
  {
    return this.http.delete<MaintenanceTask>(`${this.url}/maintenance/${taskId}`,
    { withCredentials: true });
  }
  getQuoteFromTaskId(taskId: string)
  {
    return this.http.get<Quote[]>(`${this.url}/quote/task/${taskId}`,
    { withCredentials: true });
  }

  getTasksForTrustee(trusteeUuid: string): Observable<MaintenanceTask[]> {
    return this.http.get<MaintenanceTask[]>(`/api/maintenance/trustee/${trusteeUuid}`,
    { withCredentials: true });
  }
}
