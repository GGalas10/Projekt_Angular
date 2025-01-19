import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ClubCountWithMaxDTO,
  CreateLeagueCommand,
  EditLeagueCommand,
  LeagueDTO,
  LeagueListDTO,
} from '../../../../shared/Interfaces/League';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  public ApiIsHealth = false;
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiURL = environment.baseUrl + '/League';
  constructor(private http: HttpClient) {}
  GetAllLeagues(): Observable<LeagueDTO[]> {
    return this.http.get<LeagueDTO[]>(`${this.apiURL}/GetAllLeagues`, {
      headers: this.headers,
    });
  }
  GetClubById(leagueId: string): Observable<LeagueDTO> {
    return this.http.get<LeagueDTO>(
      `${this.apiURL}/GetLeagueById?leagueId=${leagueId}`,
      { headers: this.headers },
    );
  }
  CreateLeague(command: CreateLeagueCommand): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/CreateLeague`, command, {
      headers: this.headers,
    });
  }
  GetAllUserLeagues(): Observable<LeagueListDTO[]> {
    return this.http.get<LeagueListDTO[]>(`${this.apiURL}/GetAllUserLeagues`, {
      headers: this.headers,
    });
  }
  EditLeague(command: EditLeagueCommand): Observable<void> {
    return this.http.post<void>(`${this.apiURL}/EditPrimaryDate`, command, {
      headers: this.headers,
    });
  }
  GetLeagueForEdit(leagueId: string): Observable<LeagueListDTO> {
    return this.http.get<LeagueDTO>(
      `${this.apiURL}/GetLeagueForEditById?leagueId=${leagueId}`,
      { headers: this.headers },
    );
  }
  GetClubsCount(leagueId: string): Observable<ClubCountWithMaxDTO> {
    return this.http.get<ClubCountWithMaxDTO>(
      `${this.apiURL}/GetLeagueForEditById?leagueId=${leagueId}`,
      { headers: this.headers },
    );
  }
}
