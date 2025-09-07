import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthMobileService } from 'shared';

export const authGuard: (allowedRoles: string[]) => CanActivateFn = (allowedRoles: string[]) => {
    return async () => {
        const router = inject(Router);
        const authService = inject(AuthMobileService);

        const userType = await authService.getUserType();
        const isLoggedIn = !!userType;

        if(!isLoggedIn || !allowedRoles.includes(userType))
        {
            router.navigate(['/login']);
            return false;
        }
        return true;
    }
}