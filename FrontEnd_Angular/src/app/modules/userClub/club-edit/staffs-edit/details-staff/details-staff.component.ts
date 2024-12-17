import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';
import { StaffDTO } from '../../../../../shared/Interfaces/Staff';
import { StaffService } from '../../../../core/Services/API/StaffService';

@Component({
  selector: 'app-details-staff',
  standalone: false,

  templateUrl: './details-staff.component.html',
  styleUrl: './details-staff.component.css',
})
export class DetailsStaffComponent implements OnInit {
  constructor(private staffService: StaffService) {}
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  staff!: StaffDTO;
  contractFromString = '';
  contractToString = '';
  @Input() staffId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  ngOnInit(): void {
    this.staffService.GettaffsById(this.staffId).subscribe({
      next: (result) => {
        this.staff = result;
      },
      error: () => {
        this.ShowAlert(
          'Wystąpił nieoczekiwany błąd',
          'Spróbuj ponownie później',
        );
      },
    });
  }
  ShowAlert(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.showAlert = true;
  }
}
