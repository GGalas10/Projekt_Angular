import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import {
  LoginCommand,
  LoginToken,
  RegisterUser,
} from '../../../../shared/Interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  RegisterUser(command: RegisterUser): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>('Login/Register', command);
  }
  LoginUser(command: LoginCommand): Observable<LoginToken> {
    return this.http.post<LoginToken>(`${this.apiUrl}/Login/Login`, command);
  }
}
