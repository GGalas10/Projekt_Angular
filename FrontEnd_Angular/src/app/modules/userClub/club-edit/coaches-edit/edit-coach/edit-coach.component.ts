import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CoachDTO,
  CoachEditCommand,
} from '../../../../../shared/Interfaces/Coach';
import { CoachService } from '../../../../core/Services/API/CoachService';
import { DatePipe } from '@angular/common';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-edit-coach',
  standalone: false,
  templateUrl: './edit-coach.component.html',
  styleUrl: './edit-coach.component.css',
  providers: [DatePipe],
})
export class EditCoachComponent implements OnInit {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  coach!: CoachDTO;
  oldCoach!: CoachDTO;
  contractFromString = '';
  contractToString = '';
  @Input() coachId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<CoachDTO>();
  constructor(
    private _coachService: CoachService,
    private datePipe: DatePipe,
  ) {}
  ngOnInit(): void {
    this._coachService.GetCoachById(this.coachId).subscribe({
      next: (respond) => {
        this.oldCoach = respond;
        this.coach = { ...this.oldCoach };
        this.contractFromString =
          this.datePipe.transform(this.oldCoach.contractFrom, 'yyyy-MM-dd') ||
          '';
        this.contractToString =
          this.datePipe.transform(this.oldCoach.contractTo, 'yyyy-MM-dd') || '';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  SendRequest() {
    const model: CoachEditCommand = {
      CoachId: this.coachId || '',
      ContractFrom: this.coach.contractFrom || new Date(),
      ContractTo: this.coach.contractTo || new Date(),
      FirstName: this.coach.firstName || '',
      LastName: this.coach.lastName || '',
      WhatTrains: this.coach.whatTrains || '',
    };
    this._coachService.EditCoach(model).subscribe({
      next: () => this.saveEvent.emit(this.coach),
      error: (err) => {
        if (err.error.includes('Edit_Command_Cannot_Be_Null')) {
          this.ShowAlert('Błąd', 'Uzupełnij prawidłowo wszystkie pola');
        }
        if (err.error.includes('Cannot_Find_Coach_To_Exist')) {
          this.ShowAlert(
            'Coś poszło nie tak',
            'Odśwież stronę i spróbuj ponownie później.',
          );
        }
        if (err.error.includes('CoachRole_Cannot_Be_Null_CoachCtor')) {
          this.ShowAlert('Błąd', 'Uzupełnij role trenera');
        }
        this.ShowAlert(
          'Coś poszło nie tak',
          'Odśwież stronę i spróbuj ponownie',
        );
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
