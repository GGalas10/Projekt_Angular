import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';
import { FormControl, FormGroup } from '@angular/forms';
import { StaffService } from '../../../../core/Services/API/StaffService';
import {
  StaffAddCommand,
  StaffDTO,
} from '../../../../../shared/Interfaces/Staff';

@Component({
  selector: 'app-add-staff',
  standalone: false,
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css',
})
export class AddStaffComponent {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  staff = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    contractFrom: new FormControl(new Date()),
    contractTo: new FormControl(new Date()),
    jobPosition: new FormControl(''),
  });
  get GetControlls() {
    return this.staff.controls;
  }
  constructor(private staffService: StaffService) {}
  @Input() ClubId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<StaffDTO>();
  CloseAlert() {
    this.showAlert = false;
  }
  SendRequest() {
    this.staffService.AddStaffToClub(this.GetCommandFromForm()).subscribe({
      next: (result) => {
        this.saveEvent.emit(this.GetDTOFromForm(result));
      },
      error: (err) => {
        if (err.error.includes('Command_Cannot_Be_Null')) {
          this.ShowAlert('Błąd', 'Odśwież stronę i spróbuj ponownie');
          return;
        }
        this.ShowAlert(
          'Wystąpił błąd',
          'Coś poszło nie tak. Spróbuj ponownie później',
        );
      },
    });
  }
  private GetCommandFromForm(): StaffAddCommand {
    return {
      ClubId: this.ClubId,
      FirstName: this.GetControlls.firstName.value || '',
      LastName: this.GetControlls.lastName.value || '',
      ContractFrom: this.GetControlls.contractFrom.value || new Date(),
      ContractTo: this.GetControlls.contractTo.value || new Date(),
      JobPosition: this.GetControlls.jobPosition.value || '',
    };
  }
  private GetDTOFromForm(staffId: string): StaffDTO {
    return {
      id: staffId,
      firstName: this.GetControlls.firstName.value || '',
      lastName: this.GetControlls.lastName.value || '',
      contractFrom: this.GetControlls.contractFrom.value || new Date(),
      contractTo: this.GetControlls.contractTo.value || new Date(),
      jobPosition: this.GetControlls.jobPosition.value || '',
    };
  }
  ShowAlert(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.showAlert = true;
  }
}
