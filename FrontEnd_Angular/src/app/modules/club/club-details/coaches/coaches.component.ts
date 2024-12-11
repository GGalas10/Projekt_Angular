import { Component, Input, OnInit } from '@angular/core';
import { CoachDTO } from '../../../../shared/Interfaces/Coach';
import { CoachService } from '../../../core/Services/API/CoachService';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.css',
  standalone: false,
})
export class CoachesComponent implements OnInit {
  constructor(private coachService: CoachService) {}
  ngOnInit(): void {
    this.coachService.GetAllCoachesFromClub(this.clubId).subscribe({
      next: (responde) => (this.coaches = responde),
      error: (err) => console.log(err),
    });
  }
  coaches!: CoachDTO[];
  @Input() clubId!: string;
}
