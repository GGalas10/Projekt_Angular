import { Component, OnInit } from '@angular/core';
import { ClubServices } from '../../core/Services/API/ClubServices';
import { HomeClubDTO } from '../../../shared/Interfaces/Club';

@Component({
  selector: 'app-whole-clubs',
  templateUrl: './whole-clubs.component.html',
  styleUrl: './whole-clubs.component.css',
})
export class WholeClubsComponent implements OnInit {
  homeClubs!: HomeClubDTO[];
  constructor(private clubService: ClubServices) {}
  ngOnInit(): void {
    this.clubService.GetAllClub().subscribe({
      next: (data) => (this.homeClubs = data),
    });
  }
}
