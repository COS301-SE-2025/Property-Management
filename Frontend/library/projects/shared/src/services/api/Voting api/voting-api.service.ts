import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VotingApiService{
    private url = '/api';
    constructor(private http: HttpClient){}

    
}