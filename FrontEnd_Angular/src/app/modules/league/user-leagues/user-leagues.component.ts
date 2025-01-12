import { Component } from '@angular/core';
import {
  GetStatusName,
  LeagueListDTO,
} from '../../../shared/Interfaces/League';
import { LeagueService } from '../../core/Services/API/LeagueService';

@Component({
  selector: 'app-user-leagues',
  standalone: false,

  templateUrl: './user-leagues.component.html',
  styleUrl: './user-leagues.component.css',
})
export class UserLeaguesComponent {
  leagues!: LeagueListDTO[];
  constructor(private leagueService: LeagueService) {
    leagueService.GetAllUserLeagues().subscribe({
      next: (result) => {
        this.leagues = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  GetLeagueStatus(status: number) {
    return GetStatusName(status);
  }
}
