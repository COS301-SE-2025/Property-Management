import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../../../models/rating.model';
import { environmentMobile } from '../../../environment';


export interface RatingPayload {
  contractorUuid: string;
  comment: string;
  rating: number;
  taskUuid: string;
  trusteeUuid: string;
}

@Injectable({ providedIn: 'root' })
export class RatingService {
private apiUrl = environmentMobile.apiUrl;

  constructor(private http: HttpClient) {}

    getAllRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.apiUrl,
    { withCredentials: true });
    }

    createRating(payload: RatingPayload): Observable<Rating> {
    return this.http.post<Rating>(this.apiUrl, payload,
    { withCredentials: true });
    }
}