/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, Input, OnInit } from '@angular/core';
import { CoachDTO } from '../../../../shared/Interfaces/Coach';
import { CoachService } from '../../../core/Services/API/CoachService';

@Component({
  selector: 'app-coaches-edit',
  templateUrl: './coaches-edit.component.html',
  styleUrl: './coaches-edit.component.css',
  standalone: false,
})
export class CoachesEditComponent implements OnInit {
  @Input() ClubId!: string;
  @Input() coeaches!: CoachDTO[];
  constructor(private _coachService: CoachService) {}

  ngOnInit(): void {
    this._coachService.GetAllCoachesFromClub(this.ClubId).subscribe({
      next: (coaches) => {
        this.coeaches = coaches;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
