import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CoachAddCommand,
  CoachDTO,
} from '../../../../../shared/Interfaces/Coach';
import { CoachService } from '../../../../core/Services/API/CoachService';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-add-coach',
  standalone: false,
  templateUrl: './add-coach.component.html',
  styleUrl: './add-coach.component.css',
})
export class AddCoachComponent {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  coach = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    contractFrom: new FormControl(new Date()),
    contractTo: new FormControl(new Date()),
    whatTrains: new FormControl(''),
  });
  get GetControlls() {
    return this.coach.controls;
  }
  @Input() clubId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<CoachDTO>();
  constructor(private _coachService: CoachService) {}
  SendAddRequest() {
    this._coachService.AddCoachToClub(this.GetCommandFromForm()).subscribe({
      next: (result) => {
        this.saveEvent.emit(this.GetDetailsFromForm(result));
      },
      error: (err) => {
        if (err.error.includes('Coach_Add_Cannot_Be_Null')) {
          this.ShowAlert('Błąd', 'Uzupełnij prawidłowo wszystkie pola');
        }
        if (err.error.includes('Club_Doesnt_Exist')) {
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
  private GetCommandFromForm(): CoachAddCommand {
    return {
      ClubId: this.clubId,
      FirstName: this.GetControlls.firstName.value || '',
      LastName: this.GetControlls.lastName.value || '',
      ContractFrom: this.GetControlls.contractFrom.value || new Date(),
      ContractTo: this.GetControlls.contractTo.value || new Date(),
      WhatTrains: this.GetControlls.whatTrains.value || '',
    };
  }
  private GetDetailsFromForm(coachId: string): CoachDTO {
    return {
      id: coachId,
      firstName: this.GetControlls.firstName.value || '',
      lastName: this.GetControlls.lastName.value || '',
      contractFrom: this.GetControlls.contractFrom.value || new Date(),
      contractTo: this.GetControlls.contractTo.value || new Date(),
      whatTrains: this.GetControlls.whatTrains.value || '',
    };
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
