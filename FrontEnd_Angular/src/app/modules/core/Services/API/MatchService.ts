import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { MatchByIdDTO } from '../../../../shared/Interfaces/Match';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = environment.baseUrl + '/Match';
  constructor(private http: HttpClient) {}
  GenerateAllMatches(leagueId: string): Observable<void> {
    const params: HttpParams = new HttpParams().set('leagueId', leagueId);
    return this.http.post<void>(`${this.apiUrl}/GenerateMatches`, null, {
      headers: this.headers,
      params: params,
    });
  }
  GetMatchById(matchId: string): Observable<MatchByIdDTO> {
    const params: HttpParams = new HttpParams().set('matchId', matchId);
    return this.http.get<MatchByIdDTO>(`${this.apiUrl}/GetMatchById`, {
      headers: this.headers,
      params: params,
    });
  }
}
