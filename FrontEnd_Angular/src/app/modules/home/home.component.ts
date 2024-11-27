import { Component, OnInit } from '@angular/core';
import { ClubServices } from '../core/Services/API/ClubServices';
import { HomeClubDTO } from '../../shared/Interfaces/Club';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: false
})
export class HomeComponent implements OnInit {
  constructor(private clubService: ClubServices) {}
  homeClubs!: HomeClubDTO[];
  ngOnInit(): void {
    this.clubService.GetAllClubsForHome().subscribe({
      next: (data) => (this.homeClubs = data.slice(0, 3)),
      error: (err) => console.log(err),
    });
  }
}
