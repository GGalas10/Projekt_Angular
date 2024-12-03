import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CoachAddCommand,
  CoachDTO,
} from '../../../../../shared/Interfaces/Coach';
import { CoachService } from '../../../../core/Services/API/CoachService';

@Component({
  selector: 'app-add-coach',
  standalone: false,
  templateUrl: './add-coach.component.html',
  styleUrl: './add-coach.component.css',
})
export class AddCoachComponent {
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
        console.log(err);
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
      Id: coachId,
      FirstName: this.GetControlls.firstName.value || '',
      LastName: this.GetControlls.lastName.value || '',
      ContractFrom: this.GetControlls.contractFrom.value || new Date(),
      ContractTo: this.GetControlls.contractTo.value || new Date(),
      WhatTrains: this.GetControlls.whatTrains.value || '',
    };
  }
}
