import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


export interface AuthTokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  userType: string;
  userId: string;
}

export interface BodyCoporateRegisterResponse {
  corporateUuid: string;
  corporateName: string;
  email: string;
  cognitoUserId: string;
  username: string;
  emailVerificationRequired: boolean;
}

export interface trusteeRegisterResponse {
  corporateUuid: string;
  corporateName: string;
  email: string;
  cognitoUserId: string;
  username: string;
  emailVerificationRequired: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = '/api';

  constructor(private http: HttpClient, private router: Router){}

  bodyCoporateLogin(email: string, password: string): Promise<AuthTokens>
  {
    return new Promise((resolve, reject) => {
      this.bodyCoporateLoginRequest(email, password).subscribe({
        next: (result) => {
          const idToken = result.idToken;
          const bodyCoporateId = result.userId;

          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);

          document.cookie = `idToken=${idToken}; expires=${expireDate.toUTCString()}; path=/`;
          document.cookie = `bodyCoporateId=${bodyCoporateId}; expires=${expireDate.toUTCString()}; path=/`;

          resolve(result);
        },
        error: (error) => {
          reject(error);
        }
      })
    })
  }

  private bodyCoporateLoginRequest(email: string, password: string) : Observable<AuthTokens>
  {
    const req = {
      email,
      password
    };

    return this.http.post<AuthTokens>(`${this.url}/body-corporates/login`, req);
  }

  bodyCoporateRegister(
    corporateName: string,
    contributionPerSqm: number,
    email: string,
    password: string,
    totalBudget?: number,
    contactNumber?: string
  ): Promise<BodyCoporateRegisterResponse> {
    return new Promise((resolve, reject) => {
      this.bodyCoporateRegisterRequest(
        corporateName,
        contributionPerSqm,
        email,
        password,
        totalBudget,
        contactNumber
      ).subscribe({
        next: (result) => resolve(result),
        error: (error) => reject(error)
      });
    });
  }

  private bodyCoporateRegisterRequest(
    corporateName: string,
    contributionPerSqm: number,
    email: string,
    password: string,
    totalBudget?: number,
    contactNumber?: string
  ): Observable<BodyCoporateRegisterResponse> {

    const req = {
      corporateName,
      contributionPerSqm,
      email,
      password,
      totalBudget,
      contactNumber
    };

    return this.http.post<BodyCoporateRegisterResponse>(`${this.url}/body-corporates/register`, req);
  }

  confirmBodyCoporateRegistration(username: string, code: string): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      const req = { username, code };

      this.http.post<{ message: string }>(`${this.url}/body-corporates/confirm-registration`, req)
        .subscribe({
          next: (result) => resolve(result),
          error: (error) => reject(error)
        });
    });
  }

  trusteeLogin(email: string, password: string): Promise<AuthTokens>
  {
    return new Promise((resolve, reject) => {
      this.bodyCoporateLoginRequest(email, password).subscribe({
        next: (result) => {
          const idToken = result.idToken;
          const bodyCoporateId = result.userId;

          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);

          document.cookie = `idToken=${idToken}; expires=${expireDate.toUTCString()}; path=/`;
          document.cookie = `bodyCoporateId=${bodyCoporateId}; expires=${expireDate.toUTCString()}; path=/`;

          resolve(result);
        },
        error: (error) => {
          reject(error);
        }
      })
    })
  }

  private trusteeLoginRequest(email: string, password: string) : Observable<AuthTokens>
  {
    const req = {
      email,
      password
    };

    return this.http.post<AuthTokens>(`${this.url}/body-corporates/login`, req);
  }

  trusteeRegister(
    corporateName: string,
    contributionPerSqm: number,
    email: string,
    password: string,
    totalBudget?: number,
    contactNumber?: string
  ): Promise<trusteeRegisterResponse> {
    return new Promise((resolve, reject) => {
      this.bodyCoporateRegisterRequest(
        corporateName,
        contributionPerSqm,
        email,
        password,
        totalBudget,
        contactNumber
      ).subscribe({
        next: (result) => resolve(result),
        error: (error) => reject(error)
      });
    });
  }

  private trusteeRegisterRequest(
    corporateName: string,
    contributionPerSqm: number,
    email: string,
    password: string,
    totalBudget?: number,
    contactNumber?: string
  ): Observable<trusteeRegisterResponse> {

    const req = {
      corporateName,
      contributionPerSqm,
      email,
      password,
      totalBudget,
      contactNumber
    };

    return this.http.post<trusteeRegisterResponse>(`${this.url}/body-corporates/register`, req);
  }

  confirmtrusteeRegistration(username: string, code: string): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      const req = { username, code };

      this.http.post<{ message: string }>(`${this.url}/body-corporates/confirm-registration`, req)
        .subscribe({
          next: (result) => resolve(result),
          error: (error) => reject(error)
        });
    });
  }
}