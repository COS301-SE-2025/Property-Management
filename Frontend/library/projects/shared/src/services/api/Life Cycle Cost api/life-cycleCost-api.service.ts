import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

export interface CreateLifecycleCostRequest {
    coporateUuid: string;
    type: string;
    description?: string;
    condition?: string;
    timeframe?: string;
    estimatedCost?: number;
}

export interface UpdateLifecycleCostRequest {
  type: string;
  description?: string;
  condition?: string;
  timeframe?: string;
  estimatedCost?: number;
}

export interface LifecycleCostResponse {
  costUuid: string;
  coporateUuid: string;
  type: string;
  description?: string;
  condition?: string;
  timeframe?: string;
  estimatedCost?: number;
}

@Injectable({
    providedIn: 'root'
})
export class LifecycleCostService {
    private url = '/api';

    constructor(private http: HttpClient) {}

    create(request: CreateLifecycleCostRequest): Observable<LifecycleCostResponse> {
        return this.http.post<LifecycleCostResponse>(`${this.url}/lifecycle-cost`, request);
    }

    getById(uuid: string): Observable<LifecycleCostResponse> {
        return this.http.get<LifecycleCostResponse>(`${this.url}/lifecycle-cost/${uuid}`);
    }

   getByCorporate(corporateUuid: string): Observable<LifecycleCostResponse[]> {
        return this.http.get<LifecycleCostResponse[]>(`${this.url}/lifecycle-cost/coporate/${corporateUuid}`).pipe(map(res => res || []));
    }

    update(uuid: string, request: UpdateLifecycleCostRequest): Observable<LifecycleCostResponse> {
        return this.http.put<LifecycleCostResponse>(`${this.url}/lifecycle-cost/${uuid}`, request);
    }

    delete(uuid: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/lifecycle-cost/${uuid}`);
    }
}