import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../Services/AuthService';

export const authCanMatchGuard: CanMatchFn = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  route: Route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  segments: UrlSegment[],
) => {
  return inject(AuthService).IsLogin
    ? true
    : inject(Router).createUrlTree(['User/login']);
};
