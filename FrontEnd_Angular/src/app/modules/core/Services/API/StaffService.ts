import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { StaffAddCommand, StaffDTO } from '../../../../shared/Interfaces/Staff';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = `${environment.baseUrl}/Staff`;
  constructor(private http: HttpClient) {}
  AddStaffToClub(command: StaffAddCommand): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/AddStaffToClub`, command, {
      headers: this.headers,
    });
  }
  GetAllStaffsForClub(clubId: string): Observable<StaffDTO[]> {
    return this.http.get<StaffDTO[]>(
      `${this.apiUrl}/GetAllStaffFromClub?clubId=${clubId}`,
      {
        headers: this.headers,
      },
    );
  }
}
