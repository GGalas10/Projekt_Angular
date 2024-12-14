import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';
import { FormControl, FormGroup } from '@angular/forms';
import { StaffService } from '../../../../core/Services/API/StaffService';
import { StaffAddCommand } from '../../../../../shared/Interfaces/Staff';

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
  CloseAlert() {
    this.showAlert = false;
  }
  SendRequest() {
    this.staffService.AddStaffToClub(this.GetCommandFromForm()).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err) => {
        console.log(err);
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
  ShowAlert(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.showAlert = true;
  }
}
