import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';
import { StaffDTO } from '../../../../../shared/Interfaces/Staff';
import { StaffService } from '../../../../core/Services/API/StaffService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details-staff',
  standalone: false,

  templateUrl: './details-staff.component.html',
  styleUrl: './details-staff.component.css',
  providers: [DatePipe],
})
export class DetailsStaffComponent implements OnInit {
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
  @HostListener('document:keydown.escape', ['$event'])
  onEscKeydown(): void {
    this.closeEvent.emit();
  }
}
