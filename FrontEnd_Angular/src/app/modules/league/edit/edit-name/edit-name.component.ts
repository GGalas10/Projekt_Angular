import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseAlert } from '../../../../shared/Component/base-alert/BaseAlertInterface';
import { LeagueService } from '../../../core/Services/API/LeagueService';
import { LeagueListDTO } from '../../../../shared/Interfaces/League';

@Component({
  selector: 'app-edit-name',
  standalone: false,

  templateUrl: './edit-name.component.html',
  styleUrl: './edit-name.component.css',
})
export class EditNameComponent implements OnInit {
  newName = '';
  league!: LeagueListDTO;
  @Input() LeagueId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<string>();
  baseAlert: BaseAlert = { Title: '', Message: '' };
  ShowAlert = false;
  constructor(private leagueService: LeagueService) {}
  ngOnInit(): void {
    this.leagueService.GetLeagueForEdit(this.LeagueId).subscribe({
      next: (result) => {
        this.league = result;
      },
      error: () => {
        this.ShowAlertFunction(
          'Coś nie tak',
          'Coś poszło nie tak. Spróbuj ponownie później',
        );
      },
    });
  }
  OnSubmit() {
    if (this.newName == '') {
      this.ShowAlertFunction('Błąd', 'Uzupełnij pole nowej nazwy');
      return;
    }
    this.leagueService
      .EditLeague({
        leagueId: this.LeagueId,
        name: this.newName,
        maxClubsInLeague: null,
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
            return;
          }
          if (err.error.includes('Cannot_Start_Before_1888')) {
            this.ShowAlertFunction(
              'Błąd',
              '<p>W tych latach nie istniała profesjonalna piłka nożna</p>',
            );
            return;
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
