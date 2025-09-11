import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environmentMobile } from '../../../environment';

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
    private url = environmentMobile.apiUrl;

    constructor(private http: HttpClient) {}

    create(request: CreateLifecycleCostRequest): Observable<LifecycleCostResponse> {
        return this.http.post<LifecycleCostResponse>(`${this.url}/lifecycle-cost`, request,
      { withCredentials: true });
    }

    getById(uuid: string): Observable<LifecycleCostResponse> {
        return this.http.get<LifecycleCostResponse>(`${this.url}/lifecycle-cost/${uuid}`,
      { withCredentials: true });
    }

   getByCorporate(corporateUuid: string): Observable<LifecycleCostResponse[]> {
        return this.http.get<LifecycleCostResponse[]>(`${this.url}/lifecycle-cost/coporate/${corporateUuid}`,
      { withCredentials: true }).pipe(map(res => res || []));
    }

    update(uuid: string, request: UpdateLifecycleCostRequest): Observable<LifecycleCostResponse> {
        return this.http.put<LifecycleCostResponse>(`${this.url}/lifecycle-cost/${uuid}`, request,
      { withCredentials: true });
    }

    delete(uuid: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/lifecycle-cost/${uuid}`,
      { withCredentials: true });
    }
}