import { Component, OnInit } from '@angular/core';
import {
  LeagueDTO,
  GetStatusName,
  LeagueListDTO,
} from '../../../shared/Interfaces/League';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../core/Services/API/LeagueService';
import { BaseAlert } from '../../../shared/Component/base-alert/BaseAlertInterface';
import { MatchService } from '../../core/Services/API/MatchService';

@Component({
  selector: 'app-edit',
  standalone: false,

  templateUrl: './edit-league.component.html',
  styleUrl: './edit-league.component.css',
})
export class EditLeagueComponent implements OnInit {
  editNameShow = false;
  editDateShow = false;
  editQuantityShow = false;
  addClubsShow = false;
  modalShow = false;
  canEditClub = true;
  leagueId = '';
  league!: LeagueDTO;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  ShowAlert = false;
  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
    private matchService: MatchService,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (result) => {
        this.leagueId = result.get('LeagueId') ?? '';
        this.leagueService.GetClubById(this.leagueId).subscribe({
          next: (result) => {
            this.league = result;
            this.canEditClub = this.league.matches.length <= 0;
            console.log(this.canEditClub);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }

  GetLeagueStatus(status: number) {
    return GetStatusName(status);
  }
  SaveName(newName: string) {
    this.league.name = newName;
    this.editNameShow = false;
    this.ShowAlertFunction('Sukces!', 'Udało się zmienić nazwę ligi');
  }
  SaveDate(editModel: LeagueListDTO) {
    this.league.startAt = editModel.startAt;
    this.league.endAt = editModel.endAt;
    this.editDateShow = false;
    this.ShowAlertFunction('Sukces!', 'Udało się zmienić datę ligi');
  }
  SaveQuantity(newQuantity: number) {
    this.league.maxClubsInLeague = newQuantity;
    this.editQuantityShow = false;
    this.ShowAlertFunction('Sukces!', 'Udało się zmienić ilość klubów');
  }
  ShowAlertFunction(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.ShowAlert = true;
  }
  SaveAddClubs(errors: string[]) {
    if (errors.length <= 0)
      this.ShowAlertFunction('Sukces', 'Udało się zapisać wszystkie kluby');
    else {
      let message = '<p>Nie udało się zapisać wszystkich klubów:</p>';
      errors.forEach((oneError) => {
        message += `<p>${oneError}</p>`;
      });
      this.ShowAlertFunction('Błąd', message);
    }
    this.addClubsShow = false;
    this.leagueService.GetClubById(this.leagueId).subscribe({
      next: (result) => {
        this.league = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  DeleteClubFromLeague(clubId: string) {
    this.leagueService.DeleteClubFromLeague(this.leagueId, clubId).subscribe({
      next: () => {
        this.league.clubStatistics = this.league.clubStatistics.filter(
          (x) => x.clubId != clubId,
        );
        this.ShowAlertFunction('Sukces', 'Udało się usunąć klub z ligi');
      },
      error: (err) => {
        this.ShowAlertFunction(
          'Błąd',
          'Coś poszło nie tak. Spróbuj ponownie później',
        );
        console.log(err.message);
      },
    });
  }
  GenerateAllMatches() {
    this.matchService.GenerateAllMatches(this.leagueId).subscribe({
      next: () => {
        this.ShowAlertFunction(
          'Sukces',
          'Wszystkie mecze zostały wygenerowane, a klubów już nie można zmienić',
        );
        this.canEditClub = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
