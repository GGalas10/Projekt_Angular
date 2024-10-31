import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { LoginCommand, RegisterUser } from '../../../../shared/Interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  RegisterUser(command: RegisterUser): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>('Login/Register', command, {
      headers: this.headers,
    });
  }
  LoginUser(command: LoginCommand): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Login/Login`, command, {
      headers: this.headers,
    });
  }
}
