import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router: Router = inject(Router);

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;


  if (state.url === '/login' && isLoggedIn) {
    router.navigate(['/envelope']);
    return false;
  }

  if (!isLoggedIn && state.url !== '/login') {
    router.navigate(['/login']);
    return false;
  }

  return true;
};





