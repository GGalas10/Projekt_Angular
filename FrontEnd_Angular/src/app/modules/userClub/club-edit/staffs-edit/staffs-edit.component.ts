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
}
