import { Injectable } from '@angular/core';
import { LoginToken } from '../../../shared/Interfaces/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = new BehaviorSubject<string | null>(localStorage.getItem('jwtToken'));
  refreshToken = new BehaviorSubject<string | null>(
    localStorage.getItem('jwtToken'),
  );
  ExpiredAt = new BehaviorSubject<number | null>(
    Number(localStorage.getItem('ExpiredAt')),
  );
  IsLogin = new BehaviorSubject<boolean | null>(this.getIsLogin());

  LoginUser(newToken: LoginToken) {
    this.setToken(newToken.jwtToken);
    this.setRefreshToken(newToken.refreshToken);
    this.setExpiredTime(newToken.tokenExpiredAt);
    this.setIsLogin(true);
  }

  private setToken(token: string): void {
    this.token.next(token);
    localStorage.setItem('jwtToken', token);
  }
  private setRefreshToken(token: string): void {
    this.refreshToken.next(token);
    localStorage.setItem('jwtRefreshToken', token);
  }
  private setExpiredTime(token: number): void {
    this.ExpiredAt.next(token);
    localStorage.setItem('ExpiredAt', token.toString());
  }
  private setIsLogin(isLogin: boolean) {
    this.IsLogin.next(isLogin);
    localStorage.setItem('isLogin', isLogin.toString());
  }
  private removeToken() {
    localStorage.removeItem('jwtToken');
  }
  private removeRefreshToken() {
    localStorage.removeItem('jwtRefreshToken');
  }
  private removeExpiredTime() {
    localStorage.removeItem('ExpiredAt');
  }
  private getIsLogin(): boolean {
    return localStorage.getItem('isLogin')?.toLowerCase() === 'true';
  }
  LogoutUser() {
    this.removeToken();
    this.removeRefreshToken();
    this.removeExpiredTime();
    this.setIsLogin(false);
  }
}
