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
    createSession(taskId: string, corporateId: string, votingEnds: string)
    {
        const req = {
            taskUuid: taskId,
            coporateUuid: corporateId,
            votingEndsAt: votingEnds
        };

        return this.http.post<Voting>(`${this.url}/session`, req);
    }
    getSessions()
    {
        return this.http.get<Voting[]>(`${this.url}/sessions`);
    }
}