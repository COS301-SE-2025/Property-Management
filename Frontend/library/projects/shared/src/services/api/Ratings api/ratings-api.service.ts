import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../../../models/rating.model';


export interface RatingPayload {
  contractorUuid: string;
  comment: string;
  rating: number;
  taskUuid: string;
  trusteeUuid: string;
}

@Injectable({ providedIn: 'root' })
export class RatingService {
  private apiUrl = 'http://localhost:8080/api/rating';

  constructor(private http: HttpClient) {}

    getAllRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.apiUrl);
    }

    createRating(payload: RatingPayload): Observable<Rating> {
    return this.http.post<Rating>(this.apiUrl, payload);
    }
}