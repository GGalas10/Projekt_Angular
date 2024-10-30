import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '../../../shared/Interfaces/RegisterCommand';
import { LoginCommand } from '../../../shared/Interfaces/LoginCommand';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  constructor(private http: HttpClient) {}

  RegisterUser(command: RegisterUser): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>('Login/Register', command, {
      headers: this.headers,
    });
  }
  LoginUser(command: LoginCommand): Observable<string> {
    return this.http.post<string>(
      'https://localhost:7137/Login/Login',
      command,
      { headers: this.headers },
    );
  }
}
