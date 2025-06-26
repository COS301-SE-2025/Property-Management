import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface AuthTokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  userType: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = '/api';

  constructor(private http: HttpClient){}

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
      emaiL: email,
      password: password
    };

    return this.http.post<AuthTokens>(`${this.url}/body-coporates/login`, req);
  }

  bodyCoporateRegister()
  {

  }

  trusteeLogin()
  {

  }

  trusteeRegister()
  {

  }
}