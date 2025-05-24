import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ISignUpResult,
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environments';

export interface AuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPool = new CognitoUserPool({
    UserPoolId: environment.cognito.userPoolId,
    ClientId: environment.cognito.userPoolWebClientId,
  });

  login(email: string, password: string): Promise<AuthTokens> {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  register(
    email: string,
    password: string,
    attributes: Record<string, string> = {}
  ): Promise<ISignUpResult> {
    const randomName = () => Math.random().toString(36).substring(2, 10);

    const username = email.split('@')[0] + Date.now();

    const list: CognitoUserAttribute[] = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      }),
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: randomName()
      })
    ];

    for (const [key, value] of Object.entries(attributes)) {
      list.push(new CognitoUserAttribute({
        Name: key,
        Value: value
      }));
    }

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, list, [], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result!);
      });
    });
  }

  confirmRegister(email: string, code: string): Promise<string | undefined> {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const user = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  logout(): boolean {
    const user = this.userPool.getCurrentUser();

    if (user) {
      user.signOut();
      console.log("user signed out");
      return true;
    } else {
      console.error("user couldnt log out");
      return false;
    }
  }
}