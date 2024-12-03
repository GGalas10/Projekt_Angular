import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CoachAddCommand, CoachDTO } from '../../../../shared/Interfaces/Coach';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = `${environment.baseUrl}/Coach`;
  constructor(private http: HttpClient) {}
  GetAllCoachesFromClub(clubId: string): Observable<CoachDTO[]> {
    return this.http.get<CoachDTO[]>(
      `${this.apiUrl}/GetAllClubCoaches?clubId=${clubId}`,
      { headers: this.headers },
    );
  }
  AddCoachToClub(command: CoachAddCommand): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/AddCoachToClub`, command, {
      headers: this.headers,
    });
  }
}
