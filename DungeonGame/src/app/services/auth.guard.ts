import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authToken = localStorage.getItem('auth_token'); // Check for auth_token
  
  // If token exists and the user tries to access `signin` or `signup`, redirect
  if (authToken && (state.url === '/signin' || state.url === '/signup')) {
    const router = inject(Router);
    router.navigate(['/home']);
    return false;
  }

  return true;
};
