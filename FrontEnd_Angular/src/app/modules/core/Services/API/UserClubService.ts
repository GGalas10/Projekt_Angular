import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { CreateCommand, HomeClubDTO } from '../../../../shared/Interfaces/Club';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserClubService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  GetAllUserClubs(): Observable<HomeClubDTO[]> {
    return this.http.get<HomeClubDTO[]>(
      `${this.apiUrl}/UserClub/GetAllUserClub`,
      {
        headers: this.headers,
      },
    );
  }
  CreateClubCommand(command: CreateCommand): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/UserClub/CreateClub`,
      command,
      {
        headers: this.headers,
      },
    );
  }
}
