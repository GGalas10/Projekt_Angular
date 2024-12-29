import { Component, OnInit } from '@angular/core';
import { ClubServices } from '../../core/Services/API/ClubServices';
import { HomeClubDTO } from '../../../shared/Interfaces/Club';

@Component({
  selector: 'app-whole-clubs',
  templateUrl: './whole-clubs.component.html',
  styleUrl: './whole-clubs.component.css',
  standalone: false,
})
export class WholeClubsComponent implements OnInit {
  homeClubs!: HomeClubDTO[];
  page = 0;
  isAll = false;
  constructor(private clubService: ClubServices) {}
  ngOnInit(): void {
    this.clubService.GetAllClubsWithPagination(40, this.page).subscribe({
      next: (data) => {
        this.homeClubs = data.ClubList;
        this.isAll = data.IsAllLoading;
      },
    });
  }
}
