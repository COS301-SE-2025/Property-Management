import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokens, BodyCoporateRegisterResponse, contractorRegisterResponse, trusteeRegisterResponse } from '../models/Auth.model';
import { TokenUtilService } from '../services/token-util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = '/api';

  constructor(private http: HttpClient, private tokenUtil: TokenUtilService){}

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
      contributionPerSqm : Number(contributionPerSqm.toFixed(2)),
      email,
      password,
      totalBudget: totalBudget ? Number(totalBudget.toFixed(2)) : undefined,
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
      this.trusteeLoginRequest(email, password).subscribe({
        next: (result) => {
          const idToken = result.idToken;
          const trusteeId = result.userId;

          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);

          document.cookie = `idToken=${idToken}; expires=${expireDate.toUTCString()}; path=/`;
          document.cookie = `trusteeId=${trusteeId}; expires=${expireDate.toUTCString()}; path=/`;

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

    return this.http.post<AuthTokens>(`${this.url}/trustee/auth/login`, req);
  }

  trusteeRegister(
    email: string,
    password: string,
    contactNumber?: string
  ): Promise<trusteeRegisterResponse> {
    return new Promise((resolve, reject) => {
      this.trusteeRegisterRequest(
        email,
        password,
        contactNumber
      ).subscribe({
        next: (result) => resolve(result),
        error: (error) => reject(error)
      });
    });
  }

  private trusteeRegisterRequest(
    email: string,
    password: string,
    contactNumber?: string
  ): Observable<trusteeRegisterResponse> {

    const req = {
      email,
      password,
      contactNumber
    };

    return this.http.post<trusteeRegisterResponse>(`${this.url}/trustee/auth/register`, req);
  }

  confirmTrusteeRegistration(username: string, code: string): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      const req = { username, code };

      this.http.post<{ "message": "Account confirmed." }>(`${this.url}/trustee/auth/confirm`, req)
        .subscribe({
          next: (result) => resolve(result),
          error: (error) => reject(error)
        });
    });
  }

  contractorLogin(email: string, password: string): Promise<AuthTokens>
  {
    return new Promise((resolve, reject) => {
      this.contractorLoginRequest(email, password).subscribe({
        next: (result) => {
          const idToken = result.idToken;
          const contractorId = result.userId;

          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);

          document.cookie = `idToken=${idToken}; expires=${expireDate.toUTCString()}; path=/`;
          document.cookie = `contractorId=${contractorId}; expires=${expireDate.toUTCString()}; path=/`;

          resolve(result);
        },
        error: (error) => {
          reject(error);
        }
      })
    })
  }

  private contractorLoginRequest(email: string, password: string) : Observable<AuthTokens>
  {
    const req = {
      email,
      password
    };

    return this.http.post<AuthTokens>(`${this.url}/contractor/auth/login`, req);
  }

  contractorRegister(
    email: string,
    password: string,
    contactNumber?: string
  ): Promise<contractorRegisterResponse> {
    return new Promise((resolve, reject) => {
      this.contractorRegisterRequest(
        email,
        password,
        contactNumber
      ).subscribe({
        next: (result) => resolve(result),
        error: (error) => reject(error)
      });
    });
  }

  private contractorRegisterRequest(
    email: string,
    password: string,
    contactNumber?: string
  ): Observable<contractorRegisterResponse> {

    const req = {
      email,
      password,
      contactNumber
    };

    return this.http.post<contractorRegisterResponse>(`${this.url}/contractor/auth/register`, req);
  }

  confirmContractorRegistration(username: string, code: string): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      const req = { username, code };

      this.http.post<{ "message": "Account confirmed." }>(`${this.url}/contractor/auth/confirm`, req)
        .subscribe({
          next: (result) => resolve(result),
          error: (error) => reject(error)
        });
    });
  }

  private getCookieValue(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  } 

  getUserType(): string | null {
    if (this.getCookieValue('trusteeId')) {
      return 'trustee';
    } 
    else if (this.getCookieValue('bodyCoporateId')) {
      return 'bodyCorporate';
    } 
    else if (this.getCookieValue('contractorId')) {
      return 'contractor';
    }
    return null;
  }
  
  logout()
  {
    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    deleteCookie("idToken");
    deleteCookie("bodyCoporateId");
    deleteCookie("trusteeId");
    deleteCookie("contractorId");
  }
}