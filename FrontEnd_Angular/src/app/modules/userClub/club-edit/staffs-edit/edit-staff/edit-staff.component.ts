import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StaffDTO } from '../../../../../shared/Interfaces/Staff';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-edit-staff',
  standalone: false,

  templateUrl: './edit-staff.component.html',
  styleUrl: './edit-staff.component.css',
})
export class EditStaffComponent {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  staff!: StaffDTO;
  oldStaff!: StaffDTO;
  contractFromString = '';
  contractToString = '';
  @Input() staffId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<StaffDTO>();
}
