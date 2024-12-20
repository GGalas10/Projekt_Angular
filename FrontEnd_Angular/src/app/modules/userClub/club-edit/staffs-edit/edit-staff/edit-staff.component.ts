import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  StaffDTO,
  StaffEditommand,
} from '../../../../../shared/Interfaces/Staff';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';
import { StaffService } from '../../../../core/Services/API/StaffService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-staff',
  standalone: false,
  templateUrl: './edit-staff.component.html',
  styleUrl: './edit-staff.component.css',
  providers: [DatePipe],
})
export class EditStaffComponent implements OnInit {
  constructor(
    private staffService: StaffService,
    private datePipe: DatePipe,
  ) {}
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
  @Output() saveEvent = new EventEmitter<StaffDTO>();
  ngOnInit(): void {
    this.staffService.GettaffsById(this.staffId).subscribe({
      next: (result) => {
        this.staff = result;
        this.contractFromString =
          this.datePipe.transform(this.staff.contractFrom, 'yyyy-MM-dd') || '';
        this.contractToString =
          this.datePipe.transform(this.staff.contractTo, 'yyyy-MM-dd') || '';
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
  GetCommandsFromForm(): StaffEditommand {
    return {
      StaffId: this.staffId,
      ContractFrom: new Date(this.contractFromString),
      ContractTo: new Date(this.contractToString),
      FirstName: this.staff.firstName,
      LastName: this.staff.lastName,
      JobPosition: this.staff.jobPosition,
    };
  }
  GetDTOFromForm(): StaffDTO {
    return {
      id: this.staffId,
      contractFrom: new Date(this.contractFromString),
      contractTo: new Date(this.contractToString),
      firstName: this.staff.firstName,
      lastName: this.staff.lastName,
      jobPosition: this.staff.jobPosition,
    };
  }
  SendRequest() {
    return this.staffService.EditStaff(this.GetCommandsFromForm()).subscribe({
      next: () => {
        this.saveEvent.emit(this.GetDTOFromForm());
      },
      error: () => {
        this.ShowAlert(
          'Wystąpił nieoczekiwany błąd',
          'Spróbuj ponownie później',
        );
      },
    });
  }
}
