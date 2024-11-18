import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../../../../shared/Interfaces/User';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  DetailsUser(): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.apiUrl}/User/GetUserDetails`);
  }
  ChangeLogin(login: string): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(`${this.apiUrl}/User/ChangeLogin`, {
      newLogin: login,
    });
  }
  ChangePassword(password: string): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(
      `${this.apiUrl}/User/ChangePassword`,
      { newPassword: password },
    );
  }
}
