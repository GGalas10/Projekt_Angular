import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import {
  ClubDetails,
  ClubForSelectList,
  ClubListDTO,
  HomeClubDTO,
} from '../../../../shared/Interfaces/Club';

@Injectable({
  providedIn: 'root',
})
export class ClubServices {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = environment.baseUrl + '/Club';
  constructor(private http: HttpClient) {}

  GetClubDetails(clubId: string): Observable<ClubDetails> {
    const params: HttpParams = new HttpParams().set('clubId', clubId);
    return this.http.get<ClubDetails>(`${this.apiUrl}/GetClubById`, {
      headers: this.headers,
      params,
    });
  }
  GetAllClubsForHome(): Observable<HomeClubDTO[]> {
    return this.http.get<HomeClubDTO[]>(`${this.apiUrl}/GetAllClubsForHome`, {
      headers: this.headers,
    });
  }
  GetAllClub(): Observable<HomeClubDTO[]> {
    return this.http.get<HomeClubDTO[]>(`${this.apiUrl}/GetAllClubs`, {
      headers: this.headers,
    });
  }
  GetAllClubsWithPagination(
    howMuchClubs: number,
    page: number,
  ): Observable<ClubListDTO> {
    return this.http.get<ClubListDTO>(
      `${this.apiUrl}/GetAllClubsWithPagination?howMuchClubs=${howMuchClubs}&page=${page}`,
      {
        headers: this.headers,
      },
    );
  }
  GetClubsForSelectList(): Observable<ClubForSelectList[]> {
    return this.http.get<ClubForSelectList[]>(
      `${this.apiUrl}/GetClubsForSelectList`,
      {
        headers: this.headers,
      },
    );
  }
}
