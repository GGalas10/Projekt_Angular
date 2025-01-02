import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  public ApiIsHealth = false;
  apiURL = environment.baseUrl;
  constructor(private http: HttpClient) {}
  GetAllLeagues(): Observable<void> {
    return this.http.get<void>(`${this.apiURL}/League/GetAll`);
  }
}
