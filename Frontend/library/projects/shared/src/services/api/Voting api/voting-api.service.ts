import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voting } from '../../../public-api';

@Injectable({
    providedIn: 'root'
})
export class VotingApiService{
    private url = '/api/vote';
    constructor(private http: HttpClient){}

    getSessionDetails(sessionId: string)
    {
        return this.http.get<Voting>(`${this.url}/session/${sessionId}/results`);
    }
    createSession(taskId: string, corporateId: string, votingEnds: Date)
    {
         const localISO = (date: Date) => {
            const pad = (n: number) => n.toString().padStart(2, '0');
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        };

        const req = {
            taskUuid: taskId,
            coporateUuid: corporateId,
            votingEndsAt: localISO(votingEnds)
        };

        return this.http.post<Voting>(`${this.url}/session`, req);
    }
    getSessions()
    {
        return this.http.get<Voting[]>(`${this.url}/sessions`);
    }
    getSessionFromTaskId(taskId: string)
    {
        return this.http.get<Voting>(`${this.url}/task/${taskId}/session`);
    }
    getTaskFromSessionId(sessionId: string)
    {
        return this.http.get<Voting>(`${this.url}/session/${sessionId}/task`);
    }
}