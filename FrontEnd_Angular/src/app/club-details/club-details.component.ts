import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubServices } from '../Core/Services/API/ClubServices';
import { Observable, Subscription } from 'rxjs';
import { ClubDetails } from '../shared/Interfaces/ClubDetailsDTO';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrl: './club-details.component.css'
})
export class ClubDetailsComponent implements OnInit,OnDestroy {
    
  observable:Subscription = new Subscription;
  club!:ClubDetails;
  id!:string;
    constructor(
      private clubService:ClubServices,
      private router:Router,
      private route:ActivatedRoute
    ){}
  


  ngOnInit(): void {
    this.observable = this.clubService.GetClubDetails(this.id).subscribe({
      next: club => this.club = club,
      error: err => console.log(err)
    });
  }  

  ngOnDestroy(): void {
    this.observable.unsubscribe();
  }
}
