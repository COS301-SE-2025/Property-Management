import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentMobile } from '../../../environment';
import { TaskProgress } from '../../../public-api';

interface CreateProgressRequest {
  contractorUuid: string;
  taskUuid: string;
  imageId: string;
  workDescription: string;
  progressPercentage: number;
  inventoryUsageUuid?: string; 
  quantityUsed?: number; 
}

@Injectable({
    providedIn: 'root'
})
export class TaskProgresApiService{
    private url = `${environmentMobile.apiUrl}/task-progress`;

    constructor(private http: HttpClient){}

    createProgress(contractorId: string, taskId: string, imageId: string, workDescription: string, progress: number, inventoryUsageId?: string, quantityUsed?: number)
    {
        const req: CreateProgressRequest = {
            contractorUuid: contractorId,
            taskUuid: taskId,
            imageId: imageId,
            workDescription: workDescription,
            progressPercentage: progress,
            ...(inventoryUsageId && { inventoryUsageUuid: inventoryUsageId }),
            ...(quantityUsed !== undefined && { quantityUsed })
        };
        return this.http.post<TaskProgress>(`${this.url}`, req,
    { withCredentials: true });
    }
    getTaskProgressById(progressId: string)
    {
        return this.http.get<TaskProgress[]>(`${this.url}/${progressId}`,
    { withCredentials: true });
    }
    getTaskProgressByTaskId(taskId: string)
    {
        return this.http.get<TaskProgress[]>(`${this.url}/task/${taskId}`,
    { withCredentials: true });
    }
    updateProgressPercentage(taskId: string, progress: number)
    {
        const req = {
            progressPercentage: progress
        };

        return this.http.post<TaskProgress>(`${this.url}/task/${taskId}`, req,
    { withCredentials: true });
    }
    deleteTaskProgress(progressId: string)
    {
        return this.http.delete<TaskProgress>(`${this.url}/${progressId}`,
    { withCredentials: true });
    }
}