/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubDetails } from '../../../shared/Interfaces/Club';
import { ClubEditService } from '../../core/Services/API/ClubEditServices';
import { BaseAlert } from '../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrl: './club-edit.component.css',
  standalone: false,
})
export class ClubEditComponent implements OnInit {
  IsLoading = true;
  ShowAlert = false;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  clubId!: string;
  club!: ClubDetails;
  primary = false;
  players = false;
  coaches = false;
  staffs = false;
  constructor(
    private clubService: ClubEditService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.clubId = String(params.get('clubId'));
      },
    });
    this.clubService.GetClubDetails(this.clubId).subscribe({
      next: (respond) => {
        this.club = respond;
        this.club.playerList = this.club.playerList.sort(
          (a, b) => a.playerNumber - b.playerNumber,
        );
        this.IsLoading = false;
      },
      error: (err) => {
        if (err.error == 'Unauthorized') {
          this.ShowAlert = true;
          this.baseAlert.Title = 'Brak autoryzacji';
          this.baseAlert.Message =
            'Zaloguj się żeby uzyskać dostęp do tej treści';
        }
        if (err.error == 'Forbidden') {
          this.ShowAlert = true;
          this.baseAlert.Title = 'Brak dostępu';
          this.baseAlert.Message = 'Nie masz dostępu do tej treści.';
        }
      },
    });
  }
  changeContainer(name: string) {
    this.primary = false;
    this.players = false;
    this.coaches = false;
    this.staffs = false;
    switch (name) {
      case 'primary':
        this.primary = !this.primary;
        break;
      case 'players':
        this.players = !this.primary;
        break;
      case 'coaches':
        this.coaches = !this.primary;
        break;
      case 'staffs':
        this.staffs = !this.primary;
        break;
    }
  }
  CloseAlert() {
    console.log(this.baseAlert);
    if (this.baseAlert.Title == 'Brak autoryzacji')
      this.router.navigateByUrl('/User/login');

    if (this.baseAlert.Title == 'Brak dostępu')
      this.router.navigateByUrl('/User/Club');
  }
}
