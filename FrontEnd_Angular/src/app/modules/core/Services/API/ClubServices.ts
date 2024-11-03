import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ClubDetails } from '../../../../shared/Interfaces/ClubDetailsDTO';
import { CreateCommand } from '../../../../shared/Interfaces/ClubCommand';

@Injectable({
  providedIn: 'root',
})
export class ClubServices {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  GetClubDetails(clubId: string): Observable<ClubDetails> {
    const params: HttpParams = new HttpParams().set('clubId', clubId);
    return this.http.get<ClubDetails>(`${this.apiUrl}/Club/GetClubById`, {
      headers: this.headers,
      params,
    });
  }
  CreateClubCommand(command: CreateCommand): Observable<any> {
    return this.http.post(`${this.apiUrl}/Club/CreateClub`, command, {
      headers: this.headers,
    });
  }
  GetClubIdByName(clubName: string): Observable<ClubDetails> {
    const params: HttpParams = new HttpParams().set('clubName', clubName);
    return this.http.get<ClubDetails>(
      `${this.apiUrl}/Club/GetClubIdByNameAsync`,
      {
        headers: this.headers,
        params,
      },
    );
  }
  GetAllClub(): Observable<ClubDetails[]> {
    return this.http.get<ClubDetails[]>(`${this.apiUrl}/Club/GetAllClubs`, {
      headers: this.headers,
    });
  }
}
