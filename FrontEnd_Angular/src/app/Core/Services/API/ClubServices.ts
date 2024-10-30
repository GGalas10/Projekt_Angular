import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubDetails } from '../../../shared/Interfaces/ClubDetailsDTO';

@Injectable({
  providedIn: 'root',
})
export class ClubServices {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  constructor(private http: HttpClient) {}

  GetClubDetails(clubId: string): Observable<ClubDetails> {
    const params: HttpParams = new HttpParams().set('clubId', clubId);
    return this.http.get<ClubDetails>(
      `https://localhost:7137/Club/GetClubById`,
      {
        headers: this.headers,
        params,
      },
    );
  }
}
