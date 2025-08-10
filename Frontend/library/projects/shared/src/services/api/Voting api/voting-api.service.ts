import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quote, Voting, VotingResults } from '../../../public-api';
import { environmentMobile } from '../../../environment';

@Injectable({
    providedIn: 'root'
})
export class VotingApiService{
    // private url = '/api/vote';
    private url = `${environmentMobile.apiUrl}/vote`;
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
    castVote(sessionId: string, quoteId: string, voterId: string, isTrustee: boolean)
    {
        const req = { 
         sessionUuid: sessionId,
         quoteUuid: quoteId,
         voterUuid: voterId,
         isTrustee: isTrustee,
         voteFor: true   
        };

        return this.http.post(`${this.url}`, req, { responseType: 'text' });
    }
    getVoteResults(sessionId: string)
    {
        return this.http.get<VotingResults>(`${this.url}/session/${sessionId}/results`);
    }
    getQuote(quoteId: string)
    {
        return this.http.get<Quote>(`${this.url}/vote/${quoteId}`);
    }
    updateQuote(quoteId: string, status: string, quote: Quote)
    {
        const req = {
            status: status,
            submitted_on: quote.submitted_on
        }
        return this.http.put<Quote>(`${this.url}/quote/${quoteId}`, req);
    }
}