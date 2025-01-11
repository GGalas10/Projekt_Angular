import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateLeagueCommand,
  LeagueDTO,
} from '../../../../shared/Interfaces/League';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  public ApiIsHealth = false;
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiURL = environment.baseUrl;
  constructor(private http: HttpClient) {}
  GetAllLeagues(): Observable<LeagueDTO[]> {
    return this.http.get<LeagueDTO[]>(`${this.apiURL}/League/GetAllLeagues`, {
      headers: this.headers,
    });
  }
  GetClubById(leagueId: string): Observable<LeagueDTO> {
    return this.http.get<LeagueDTO>(
      `${this.apiURL}/League/GetLeagueById?leagueId=${leagueId}`,
      { headers: this.headers },
    );
  }
  CreateLeague(command: CreateLeagueCommand): Observable<string> {
    console.log(command);
    return this.http.post<string>(
      `${this.apiURL}/League/CreateLeague`,
      command,
      { headers: this.headers },
    );
  }
}
