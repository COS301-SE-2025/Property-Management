import { Injectable } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ISignUpResult,
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environments';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPool = new CognitoUserPool({
    UserPoolId: environment.cognito.userPoolId,
    ClientId: environment.cognito.userPoolWebClientId,
  });

  login(email: string, password: string): Promise<any> {
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
          const idToken = result.getIdToken().getJwtToken();
          const decodeToken = jwtDecode<{given_name?: string}>(idToken);

          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
            givenName: decodeToken.given_name,
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  register(email: string, password: string, type: string, attributes: {[key: string]: string} = {}): Promise<ISignUpResult> {
    
    const username = email.split('@')[0] + Date.now();
    
    const list: CognitoUserAttribute[] = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      }),
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: type
      })
    ];

    for(const [key, value] of Object.entries(attributes))
    {
      list.push(new CognitoUserAttribute({
        Name: key,
        Value: value
      }));
    }

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, list, [], (err, result) => {
        if(err)
        {
          reject(err);
          return;
        }
        resolve(result!);
      }
      )
    });
  }
  confirmRegister(email: string, code: string): Promise<any>{
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const user = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      user.confirmRegistration(code, true, (err, result) => {
        if(err)
        {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}