import { Component, Input, OnInit } from '@angular/core';
import { StaffDTO } from '../../../../shared/Interfaces/Staff';
import { StaffService } from '../../../core/Services/API/StaffService';
import { BaseAlert } from '../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-staffs-edit',
  templateUrl: './staffs-edit.component.html',
  styleUrl: './staffs-edit.component.css',
  standalone: false,
})
export class StaffsEditComponent implements OnInit {
  addStaff = false;
  editStaff = false;
  detailsStaff = false;
  ChosenStaffId = '';
  constructor(private staffService: StaffService) {}
  ShowAlert = false;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  @Input() ClubId!: string;
  staffs!: StaffDTO[];
  ngOnInit(): void {
    this.staffService.GetAllStaffsForClub(this.ClubId).subscribe({
      next: (result) => {
        this.staffs = result;
      },
      error: () => {
        this.ShowAlertWithMessage(
          'Coś nie tak',
          'Coś poszło nie tak spróbuj ponownie później.',
        );
      },
    });
  }
  private ShowAlertWithMessage(title: string, message: string) {
    this.ShowAlert = true;
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
  }
  GetNewCoach(staff: StaffDTO) {
    if (staff) this.pushAndSortCoachList(staff);
    this.addStaff = false;
  }
  ChoseStaffForDetails(staffId: string) {
    this.ChosenStaffId = staffId;
    this.detailsStaff = true;
  }
  ChoseStaffForEdit(staffId: string) {
    this.ChosenStaffId = staffId;
    this.editStaff = true;
  }
  private pushAndSortCoachList(staff: StaffDTO) {
    this.staffs.push(staff);
    this.staffs = this.staffs.sort((a, b) => {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
        return -1;
      }
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  DeleteSelectedStaff(staffId: string) {
    this.staffService.DeleteStaff(staffId).subscribe({
      next: () => {
        this.ShowAlertWithMessage(
          'Powodzenie',
          'Udało się usunąć osobę z personelu',
        );
      },
      error: () => {
        this.ShowAlertWithMessage(
          'Błąd',
          'Coś poszło nie tak. Spróbuj ponownie później',
        );
      },
    });
  }
}
