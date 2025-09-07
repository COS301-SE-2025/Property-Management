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
    private quoteUrl = environmentMobile.apiUrl;

    constructor(private http: HttpClient){}

    getSessionDetails(sessionId: string)
    {
        return this.http.get<Voting>(`${this.url}/session/${sessionId}/results`,
    { withCredentials: true });
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

        return this.http.post<Voting>(`${this.url}/session`, req,
    { withCredentials: true });
    }
    getSessions()
    {
        return this.http.get<Voting[]>(`${this.url}/sessions`,
    { withCredentials: true });
    }
    getSessionFromTaskId(taskId: string)
    {
        return this.http.get<Voting>(`${this.url}/task/${taskId}/session`,
    { withCredentials: true });
    }
    getTaskFromSessionId(sessionId: string)
    {
        return this.http.get<Voting>(`${this.url}/session/${sessionId}/task`,
    { withCredentials: true });
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

        return this.http.post(`${this.url}`, req, { responseType: 'text' , withCredentials: true });
    }
    getVoteResults(sessionId: string)
    {
        return this.http.get<VotingResults>(`${this.url}/session/${sessionId}/results`,
    { withCredentials: true });
    }
    getQuote(quoteId: string)
    {
        return this.http.get<Quote>(`${this.url}/vote/${quoteId}`,
    { withCredentials: true });
    }
    updateQuoteStatus(quoteId: string, status: string)
    {
        const req = {
            status: status
        }
        return this.http.patch<Quote>(`${this.quoteUrl}/quote/${quoteId}`, req,
    { withCredentials: true });
    }
}