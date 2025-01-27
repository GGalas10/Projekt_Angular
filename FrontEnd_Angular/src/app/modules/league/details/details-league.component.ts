import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../core/Services/API/LeagueService';
import { GetStatusName, LeagueDTO } from '../../../shared/Interfaces/League';

@Component({
  selector: 'app-details',
  standalone: false,

  templateUrl: './details-league.component.html',
  styleUrl: './details-league.component.css',
})
export class DetailsLeagueComponent implements OnInit {
  leagueId = '';
  league!: LeagueDTO;
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
            console.log(this.league);
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
}
