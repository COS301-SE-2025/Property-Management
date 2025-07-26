import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  'cognito:groups'?: string[];
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class TokenUtilService {
  getUserGroups(token: string): string[] {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded['cognito:groups'] || [];
    } catch {
      return [];
    }
  }
}