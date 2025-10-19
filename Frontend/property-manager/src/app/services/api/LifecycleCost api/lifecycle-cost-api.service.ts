import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LifeCycleCostResponse, CreateLifeCycleCostRequest } from '../../../../../../library/projects/shared/src/models/lifeCycleCost.model';

@Injectable({
  providedIn: 'root'
})
export class LifecycleCostApiService {
  private apiUrl = '/api/lifecycle-cost';

  constructor(private http: HttpClient) { }

  getByCoporate(coporateUuid: string): Observable<LifeCycleCostResponse[]> {
    return this.http.get<LifeCycleCostResponse[]>(`${this.apiUrl}/coporate/${coporateUuid}`);
  }

  create(request: CreateLifeCycleCostRequest): Observable<LifeCycleCostResponse> {
    return this.http.post<LifeCycleCostResponse>(this.apiUrl, request);
  }
}