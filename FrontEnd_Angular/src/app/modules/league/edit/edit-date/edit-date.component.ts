import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseAlert } from '../../../../shared/Component/base-alert/BaseAlertInterface';
import { LeagueService } from '../../../core/Services/API/LeagueService';
import { LeagueListDTO } from '../../../../shared/Interfaces/League';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-date',
  standalone: false,

  templateUrl: './edit-date.component.html',
  styleUrl: './edit-date.component.css',
  providers: [DatePipe],
})
export class EditDateComponent implements OnInit {
  newStartDate = '';
  newEndDate = '';
  league!: LeagueListDTO;
  @Input() LeagueId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<LeagueListDTO>();
  baseAlert: BaseAlert = { Title: '', Message: '' };
  ShowAlert = false;
  constructor(
    private leagueService: LeagueService,
    private datePipe: DatePipe,
  ) {}
  ngOnInit(): void {
    this.leagueService.GetLeagueForEdit(this.LeagueId).subscribe({
      next: (result) => {
        this.league = result;
        this.newStartDate =
          this.datePipe.transform(this.league.startAt, 'yyyy-MM-dd') || '';
        this.newEndDate =
          this.datePipe.transform(this.league.endAt, 'yyyy-MM-dd') || '';
      },
      error: () => {
        this.ShowAlertFunction(
          'Coś nie tak',
          'Coś poszło nie tak. Spróbuj ponownie później',
        );
      },
    });
  }
  OnSubmit(): void {
    this.leagueService
      .EditLeague({
        leagueId: this.LeagueId,
        name: null,
        startAt: new Date(this.newStartDate),
        endAt: new Date(this.newEndDate),
      })
      .subscribe({
        next: () => {
          this.saveEvent.emit({
            id: '',
            name: '',
            startAt: new Date(this.newStartDate),
            endAt: new Date(this.newEndDate),
            status: 0,
          });
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
