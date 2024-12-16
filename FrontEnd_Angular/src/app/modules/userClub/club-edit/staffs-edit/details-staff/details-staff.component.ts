import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';
import { StaffDTO } from '../../../../../shared/Interfaces/Staff';

@Component({
  selector: 'app-details-staff',
  standalone: false,

  templateUrl: './details-staff.component.html',
  styleUrl: './details-staff.component.css',
})
export class DetailsStaffComponent {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  coach!: StaffDTO;
  oldCoach!: StaffDTO;
  contractFromString = '';
  contractToString = '';
  @Input() coachId!: string;
  @Output() closeEvent = new EventEmitter<void>();
}
