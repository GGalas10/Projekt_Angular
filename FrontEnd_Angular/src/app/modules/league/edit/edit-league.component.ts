import { Component, OnInit } from '@angular/core';
import {
  LeagueDTO,
  GetStatusName,
  LeagueListDTO,
} from '../../../shared/Interfaces/League';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../core/Services/API/LeagueService';
import { BaseAlert } from '../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-edit',
  standalone: false,

  templateUrl: './edit-league.component.html',
  styleUrl: './edit-league.component.css',
})
export class EditLeagueComponent implements OnInit {
  editNameShow = false;
  editDateShow = false;
  leagueId = '';
  league!: LeagueDTO;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  ShowAlert = false;
  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (result) => {
        this.leagueId = result.get('LeagueId') ?? '';
        this.leagueService.GetClubById(this.leagueId).subscribe({
          next: (result) => {
            this.league = result;
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
  ShowAlertFunction(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.ShowAlert = true;
  }
}
