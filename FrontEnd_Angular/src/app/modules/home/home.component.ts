import { Component, OnInit } from '@angular/core';
import { ClubServices } from '../core/Services/API/ClubServices';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private clubService: ClubServices) {}

  ngOnInit(): void {
    this.clubService.GetAllClub().subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
    });
  }
}
