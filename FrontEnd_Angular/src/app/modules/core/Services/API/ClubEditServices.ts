import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  DescriptionEdit,
  NameEdit,
  RisingEdit,
} from '../../../../shared/Interfaces/ClubEdit';
import { Observable } from 'rxjs';
import { ClubDetails } from '../../../../shared/Interfaces/Club';

@Injectable({
  providedIn: 'root',
})
export class ClubEditService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = `${environment.baseUrl}/ClubEdit`;
  constructor(private http: HttpClient) {}
  ClubNameEdit(command: NameEdit): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/EditName`, command, {
      headers: this.headers,
    });
  }
  ClubDescriptionEdit(command: DescriptionEdit): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/EditDescription`, command, {
      headers: this.headers,
    });
  }
  ClubRisingEdit(command: RisingEdit): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/EditRising`, command, {
      headers: this.headers,
    });
  }
  GetClubDetails(clubId: string): Observable<ClubDetails> {
    const params: HttpParams = new HttpParams().set('clubId', clubId);
    return this.http.get<ClubDetails>(`${this.apiUrl}/GetClubById`, {
      headers: this.headers,
      params,
    });
  }
}
