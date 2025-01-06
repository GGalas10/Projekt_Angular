import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeagueDTO } from '../../../../shared/Interfaces/League';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  public ApiIsHealth = false;
  apiURL = environment.baseUrl;
  constructor(private http: HttpClient) {}
  GetAllLeagues(): Observable<LeagueDTO[]> {
    return this.http.get<LeagueDTO[]>(`${this.apiURL}/League/GetAll`);
  }
  GetClubById(leagueId: string): Observable<LeagueDTO> {
    return this.http.get<LeagueDTO>(
      `${this.apiURL}/League/GetLeagueById?leagueId=${leagueId}`,
    );
  }
}
