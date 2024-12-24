import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import {
  CreatePlayerCommand,
  EditPlayerCommand,
  PlayerDetailsDTO,
} from '../../../../shared/Interfaces/Player';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = `${environment.baseUrl}/Player`;
  constructor(private http: HttpClient) {}

  GetPlayerById(playerId: string): Observable<PlayerDetailsDTO> {
    return this.http.get<PlayerDetailsDTO>(
      `${this.apiUrl}/GetPlayerDetails?playerId=${playerId}`,
      { headers: this.headers },
    );
  }

  GetAllPlayersFromClub(clubId: string): Observable<PlayerDetailsDTO[]> {
    return this.http.get<PlayerDetailsDTO[]>(
      `${this.apiUrl}/GetAllClubPlayers?clubId=${clubId}`,
      { headers: this.headers },
    );
  }

  AddPlayerToClub(command: CreatePlayerCommand): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/AddPlayerToClub`, command, {
      headers: this.headers,
    });
  }
  EditPlayer(command: EditPlayerCommand): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/EditPlayer`, command, {
      headers: this.headers,
    });
  }
  DeletePlayer(playerId:string):Observable<void>{
    return this.http.delete<void>(
      `${this.apiUrl}/DeletePlayer?playerId=${playerId}`,
      { headers: this.headers },
  );
  }
}
