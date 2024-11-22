import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeClubDTO } from '../../../shared/Interfaces/Club';
import { UserClubService } from '../../core/Services/API/UserClubService';

@Component({
  selector: 'app-user-clubs',
  templateUrl: './user-clubs.component.html',
  styleUrl: './user-clubs.component.css',
})
export class UserClubsComponent implements OnInit, OnDestroy {
  serviceObservable!: Subscription;
  userClubs!: HomeClubDTO[];
  constructor(
    private userClubService: UserClubService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.serviceObservable = this.userClubService.GetAllUserClubs().subscribe({
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
