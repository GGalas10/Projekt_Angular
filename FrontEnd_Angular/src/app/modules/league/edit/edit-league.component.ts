import { Component, OnInit } from '@angular/core';
import { LeagueDTO, GetStatusName } from '../../../shared/Interfaces/League';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../core/Services/API/LeagueService';

@Component({
  selector: 'app-edit',
  standalone: false,

  templateUrl: './edit-league.component.html',
  styleUrl: './edit-league.component.css',
})
export class EditLeagueComponent implements OnInit {
  editNameShow = false;
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
  SaveName(newName: string) {
    this.league.name = newName;
    this.editNameShow = false;
  }
}
