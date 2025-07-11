import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: (allowedRoles: string[]) => CanActivateFn = (allowedRoles: string[]) => {

  return () => {
    const router = inject(Router);
    const userType = localStorage.getItem('userType');
    const isLoggedIn = userType !== null;
  
    if(!isLoggedIn || !allowedRoles.includes(userType))
    {
      router.navigate(['/login']);
      return false;
    }
    return true;
  }
};
