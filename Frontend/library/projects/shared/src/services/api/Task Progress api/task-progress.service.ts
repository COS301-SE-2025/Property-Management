import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentMobile } from '../../../environment';
import { TaskProgress } from '../../../public-api';

@Injectable({
    providedIn: 'root'
})
export class TaskProgresApiService{
    private url = `${environmentMobile.apiUrl}/task-progress`;

    constructor(private http: HttpClient){}

    createProgress(contractorId: string, taskId: string, imageId: string, workDescription: string, inventoryUsageId: string, quantityUsed: number)
    {
        const req = {
            contractorUuid: contractorId,
            taskUuid: taskId,
            imageId: imageId,
            workDescription: workDescription,
            inventoryUsageUuid: inventoryUsageId,
            quantityUsed: quantityUsed
        }
        return this.http.post<TaskProgress>(`${this.url}`, req);
    }
    getTaskProgressById(progressId: string)
    {
        return this.http.get<TaskProgress[]>(`${this.url}/${progressId}`);
    }
    getTaskProgressByTaskId(taskId: string)
    {
        return this.http.get<TaskProgress[]>(`${this.url}/task/${taskId}`);
    }
    updateProgressPercentage(taskId: string, progress: number)
    {
        const req = {
            progressPercentage: progress
        };

        return this.http.post<TaskProgress>(`${this.url}/task/${taskId}`, req);
    }
    deleteTaskProgress(progressId: string)
    {
        return this.http.delete<TaskProgress>(`${this.url}/${progressId}`);
    }
}