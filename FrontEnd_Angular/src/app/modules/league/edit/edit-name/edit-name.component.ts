import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseAlert } from '../../../../shared/Component/base-alert/BaseAlertInterface';
import { LeagueService } from '../../../core/Services/API/LeagueService';

@Component({
  selector: 'app-edit-name',
  standalone: false,

  templateUrl: './edit-name.component.html',
  styleUrl: './edit-name.component.css',
})
export class EditNameComponent {
  newName = '';
  @Input() oldName!: string;
  @Input() LeagueId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<string>();
  baseAlert: BaseAlert = { Title: '', Message: '' };
  ShowAlert = false;
  constructor(private leagueService: LeagueService) {}
  OnSubmit() {
    if (this.newName == '') {
      this.ShowAlertFunction('Błąd', 'Uzupełnij pole nowej nazwy');
      return;
    }
    console.log(this.LeagueId);
    this.leagueService
      .EditLeague({
        leagueId: this.LeagueId,
        name: this.newName,
        startAt: null,
        endAt: null,
      })
      .subscribe({
        next: () => {
          this.saveEvent.emit(this.newName);
        },
        error: (err) => {
          if (err.error.includes('EndDate_Must_Be_Greater_Than_StartDate')) {
            this.ShowAlertFunction(
              'Błąd',
              '<p>Koniec ligi musi być później niż rozpoczęcie</p>',
            );
          }
          if (err.error.includes('Cannot_Start_Before_1888')) {
            this.ShowAlertFunction(
              'Błąd',
              '<p>W tych latach nie istniała profesjonalna piłka nożna</p>',
            );
          } else {
            this.ShowAlertFunction(
              'Coś nie tak',
              'Coś poszło nie tak. Spróbuj ponownie później',
            );
          }
        },
      });
  }
  ShowAlertFunction(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.ShowAlert = true;
  }
}
