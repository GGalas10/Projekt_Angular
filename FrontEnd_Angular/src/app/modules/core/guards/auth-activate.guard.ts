import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/AuthService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authActivateGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).IsLogin.value
    ? true
    : inject(Router).createUrlTree(['User/login']);
};
