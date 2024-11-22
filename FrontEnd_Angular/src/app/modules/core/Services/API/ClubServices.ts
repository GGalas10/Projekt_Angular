import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ClubDetails, HomeClubDTO } from '../../../../shared/Interfaces/Club';

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
  GetAllClubsForHome(): Observable<HomeClubDTO[]> {
    return this.http.get<HomeClubDTO[]>(
      `${this.apiUrl}/Club/GetAllClubsForHome`,
      {
        headers: this.headers,
      },
    );
  }
  GetAllClub(): Observable<HomeClubDTO[]> {
    return this.http.get<HomeClubDTO[]>(`${this.apiUrl}/Club/GetAllClubs`, {
      headers: this.headers,
    });
  }
}
