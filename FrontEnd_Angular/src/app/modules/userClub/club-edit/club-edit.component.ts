import { Component, OnInit } from '@angular/core';
import { ClubServices } from '../../core/Services/API/ClubServices';
import { ActivatedRoute } from '@angular/router';
import { ClubDetails } from '../../../shared/Interfaces/Club';

@Component({
  selector: 'app-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrl: './club-edit.component.css',
})
export class ClubEditComponent implements OnInit {
  IsLoading = true;
  clubId!: string;
  club!: ClubDetails;
  primary = false;
  players = false;
  coaches = false;
  staffs = false;
  constructor(
    private clubService: ClubServices,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.clubId = String(params.get('clubId'));
      },
    });
    this.clubService.GetClubDetails(this.clubId).subscribe({
      next: (respond) => {
        this.club = respond;
        this.IsLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.IsLoading = false;
      },
    });
  }
  changeContainer(name: string) {
    this.primary = false;
    this.players = false;
    this.coaches = false;
    this.staffs = false;
    switch (name) {
      case 'primary':
        this.primary = !this.primary;
        break;
      case 'players':
        this.players = !this.primary;
        break;
      case 'coaches':
        this.coaches = !this.primary;
        break;
      case 'staffs':
        this.staffs = !this.primary;
        break;
    }
  }
}
