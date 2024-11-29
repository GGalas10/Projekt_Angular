import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import {
  CreatePlayerCommand,
  EditPlayerCommand,
} from '../../../../shared/Interfaces/Player';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = `${environment.baseUrl}/Player`;
  constructor(private http: HttpClient) {}

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
}
