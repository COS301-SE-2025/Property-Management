import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenUtilService {
  getUserGroups(token: string): string[] {
    try {
      const decoded: any = jwtDecode(token);
      return decoded['cognito:groups'] || [];
    } catch {
      return [];
    }
  }
}