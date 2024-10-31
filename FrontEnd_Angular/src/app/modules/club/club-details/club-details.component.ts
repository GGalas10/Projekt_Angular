import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClubServices } from '../../core/Services/API/ClubServices';
import { Subscription } from 'rxjs';
import { ClubDetails } from '../../../shared/Interfaces/ClubDetailsDTO';
import { BaseAlert } from '../../../shared/Component/base-alert/BaseAlertInterface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrl: './club-details.component.css',
})
export class ClubDetailsComponent implements OnInit, OnDestroy {
  observable: Subscription = new Subscription();
  club!: ClubDetails;
  baseModal = true;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  id!: string;

  constructor(
    private clubService: ClubServices,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = String(params.get('clubId'));
      },
    });
    this.observable = this.clubService.GetClubDetails(this.id).subscribe({
      next: (club) => (this.club = club),
      error: (err) => {
        if (err.status == 0) {
          this.baseModal = false;
          this.baseAlert.Title = 'Błąd aplikacji';
          this.baseAlert.Message = `Coś poszło nie tak. Spróbuj ponownie później`;
          return;
        }
        if (err.error.includes('ClubId_Cannot_Be_Empty_GetClubById')) {
          this.baseModal = false;
          this.baseAlert.Title = 'Błąd aplikacji';
          this.baseAlert.Message = `Niestety nie udało się pobrać danych. Spróbuj ponownie później`;
        }
        if (err.error.includes('Cannot_Find_Club_GetClubById')) {
          this.baseModal = false;
          this.baseAlert.Title = 'Nie udało się znaleźć klubu';
          this.baseAlert.Message = `Niestety w naszej bazie nie udało się znaleźć klubu o id ${this.id}`;
        }
      },
    });
  }
  ngOnDestroy(): void {
    this.observable.unsubscribe();
  }
}
