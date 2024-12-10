import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';
import { CoachDTO } from '../../../../../shared/Interfaces/Coach';
import { CoachService } from '../../../../core/Services/API/CoachService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details-coach',
  standalone: false,
  templateUrl: './details-coach.component.html',
  styleUrl: './details-coach.component.css',
  providers: [DatePipe],
})
export class DetailsCoachComponent implements OnInit {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  contractFromString = '';
  contractToString = '';
  coach!: CoachDTO;
  @Input() coachId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  constructor(
    private _coachService: CoachService,
    private datePipe: DatePipe,
  ) {}
  ngOnInit(): void {
    this._coachService.GetCoachById(this.coachId).subscribe({
      next: (respond) => {
        this.coach = respond;
        this.contractFromString =
          this.datePipe.transform(this.coach.contractFrom, 'yyyy-MM-dd') || '';
        this.contractToString =
          this.datePipe.transform(this.coach.contractTo, 'yyyy-MM-dd') || '';
      },
      error: () => {
        this.ShowAlert('Coś poszło nie tak', 'Odśwież i spróbuj ponownie');
      },
    });
  }
  CloseAlert() {
    this.showAlert = false;
  }
  ShowAlert(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.showAlert = true;
  }
}
