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

  async login(email: string, password: string): Promise<AuthTokens> {
    return new Promise((resolve, reject) => {
      const req = { email, password };

      this.http.post<AuthTokens>(`${this.url}/auth/login`, req, { withCredentials: true })
        .subscribe({
          next: async(result) => {
            
            switch(result.userType) {
              case 'contractor':
                await this.storage.set('userType', 'contractor');
                await this.storage.set('contractorId', result.userId);
                break;
              case 'trustee':
                await this.storage.set('userType', 'trustee');
                await this.storage.set('trusteeId', result.userId);
                break;
            }
            resolve(result);
          },
          error: (error) => reject(error)
        });
    });
  }
  trusteeLogin(email: string, password: string): Promise<AuthTokens>
  {
    return new Promise((resolve, reject) => {
      this.trusteeLoginRequest(email, password).subscribe({
        next: async(result) => {
          const idToken = result.idToken;
          const trusteeId = result.userId;

          await this.storage.set('idToken', idToken);
          await this.storage.set('trusteeId', trusteeId);
          await this.storage.set('userType', 'trustee');

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

    return this.http.post<AuthTokens>(`${this.url}/auth/login`, req,
    { withCredentials: true });
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

    return this.http.post<trusteeRegisterResponse>(`${this.url}/trustee/auth/register`, req,
    { withCredentials: true });
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
        next: async(result) => {
         const contractorId = result.userId;
          
         await this.storage.set('contractorId', contractorId);
         await this.storage.set('idToken', result.idToken);
         await this.storage.set('userType', 'contractor');
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

    return this.http.post<AuthTokens>(`${this.url}/contractor/auth/login`, req,
    { withCredentials: true });
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

    return this.http.post<contractorRegisterResponse>(`${this.url}/contractor/auth/register`, req,
    { withCredentials: true });
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
  async getUserType(): Promise<string | null> {
    if(await this.storage.get('trusteeId'))
    {
      return 'trustee';
    }
    else if(await this.storage.get('contractorId'))
    {
      return 'contractor';
    }
    return null;
  }

  async logout()
  {
    await this.storage.remove("userType");
    await this.storage.remove("trusteeId");
    await this.storage.remove("contractorId");
    await this.storage.remove("theme");
    await this.storage.remove("fontSize");
  }
}