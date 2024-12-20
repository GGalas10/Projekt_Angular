import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import {
  StaffAddCommand,
  StaffDTO,
  StaffEditommand,
} from '../../../../shared/Interfaces/Staff';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  headers: HttpHeaders = new HttpHeaders({ FC_Header: '' });
  apiUrl = `${environment.baseUrl}/Staff`;
  constructor(private http: HttpClient) {}
  AddStaffToClub(command: StaffAddCommand): Observable<string> {
    console.log(command);
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
  GettaffsById(staffId: string): Observable<StaffDTO> {
    return this.http.get<StaffDTO>(
      `${this.apiUrl}/GetStaffById?staffId=${staffId}`,
      {
        headers: this.headers,
      },
    );
  }
  EditStaff(editCommand: StaffEditommand): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/EditStaff`, editCommand, {
      headers: this.headers,
    });
  }
}
