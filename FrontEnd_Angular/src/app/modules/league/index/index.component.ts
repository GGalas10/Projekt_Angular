import { Component, OnInit } from '@angular/core';
import { LeagueDTO } from '../../../shared/Interfaces/League';
import { LeagueService } from '../../core/Services/API/LeagueService';

@Component({
  selector: 'app-index',
  standalone: false,

  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  leagues!: LeagueDTO[];
  constructor(private leagueService: LeagueService) {}
  ngOnInit(): void {
    this.leagueService.GetAllLeagues().subscribe({
      next: (result) => (this.leagues = result),
      error: (err) => console.log(err),
    });
  }
}
