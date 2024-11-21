import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClubServices } from '../../core/Services/API/ClubServices';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeClubDTO } from '../../../shared/Interfaces/Club';

@Component({
  selector: 'app-user-clubs',
  templateUrl: './user-clubs.component.html',
  styleUrl: './user-clubs.component.css',
})
export class UserClubsComponent implements OnInit, OnDestroy {
  serviceObservable!: Subscription;
  userClubs!: HomeClubDTO[];
  constructor(
    private clubService: ClubServices,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.serviceObservable = this.clubService.GetAllUserClubs().subscribe({
      next: (data) => {
        this.userClubs = data;
      },
      error: (err) => console.log('Something wrong', err),
    });
  }
  ngOnDestroy(): void {
    this.serviceObservable.unsubscribe();
  }
}
