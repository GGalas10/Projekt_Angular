import { Component, OnInit } from '@angular/core';
import { LeagueDTO } from '../../../shared/Interfaces/League';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../core/Services/API/LeagueService';

@Component({
  selector: 'app-edit',
  standalone: false,

  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
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
}
