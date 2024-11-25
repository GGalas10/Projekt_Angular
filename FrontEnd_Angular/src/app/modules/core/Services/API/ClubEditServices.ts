import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  DescriptionEdit,
  NameEdit,
  RisingEdit,
} from '../../../../shared/Interfaces/ClubEdit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubEditService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  ClubNameEdit(command: NameEdit): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/ClubEdit/EditName`, command, {
      headers: this.headers,
    });
  }
  ClubDescriptionEdit(command: DescriptionEdit): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/ClubEdit/EditDescription`,
      command,
      {
        headers: this.headers,
      },
    );
  }
  ClubRisingEdit(command: RisingEdit): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/ClubEdit/EditRising`, command, {
      headers: this.headers,
    });
  }
}
