import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'shared';

export const authGuard: (allowedRoles: string[]) => CanActivateFn = (allowedRoles: string[]) => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    const userType = authService.getUserType();
    const isLoggedIn = !!userType;

    if (!isLoggedIn || !allowedRoles.includes(userType)) {
      router.navigate(['/login']);
      console.log("returning false");
      return false;
    }
    return true;
  }
};