import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LeagueListDTO } from '../../../../shared/Interfaces/League';
import { BaseAlert } from '../../../../shared/Component/base-alert/BaseAlertInterface';
import { LeagueService } from '../../../core/Services/API/LeagueService';

@Component({
  selector: 'app-edit-quantity',
  standalone: false,

  templateUrl: './edit-quantity.component.html',
  styleUrl: './edit-quantity.component.css',
})
export class EditQuantityComponent implements OnInit {
  newQuantity = 0;
  league!: LeagueListDTO;
  @Input() LeagueId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<number>();
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
    if (this.newQuantity <= 0) {
      this.ShowAlertFunction('Błąd', 'Uzupełnij poprawnie ilość klubów');
      return;
    }
    this.leagueService
      .EditLeague({
        leagueId: this.LeagueId,
        name: null,
        maxClubsInLeague: this.newQuantity,
        startAt: null,
        endAt: null,
      })
      .subscribe({
        next: () => {
          this.saveEvent.emit(this.newQuantity);
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
