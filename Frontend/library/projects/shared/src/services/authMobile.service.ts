import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { AuthTokens, contractorRegisterResponse, trusteeRegisterResponse } from '../models/Auth.model';
import { environmentMobile } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthMobileService {

  // private url = '/api';
  private url = environmentMobile.apiUrl;

  private http = inject(HttpClient);
  private storage = inject(StorageService);

  constructor(){}

  trusteeLogin(email: string, password: string): Promise<AuthTokens>
  {
    return new Promise((resolve, reject) => {
      this.trusteeLoginRequest(email, password).subscribe({
        next: (result) => {
          const idToken = result.idToken;
          const trusteeId = result.userId;

          this.storage.set('idToken', idToken);
          this.storage.set('trusteeId', trusteeId);
          this.storage.set('userType', 'trustee');

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
         const contractorId = result.userId;
          const idToken = result.idToken;
          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);

          document.cookie = `idToken=${idToken}; expires=${expireDate.toUTCString()}; path=/`;
          document.cookie = `contractorId=${contractorId}; expires=${expireDate.toUTCString()}; path=/`;
          document.cookie = `userType=contractor; expires=${expireDate.toUTCString()}; path=/`;
      

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

  async logout()
  {
    await this.storage.remove("userType");
    await this.storage.remove("trusteeID");
    await this.storage.remove("contractorID");
    await this.storage.remove("theme");
  }
}