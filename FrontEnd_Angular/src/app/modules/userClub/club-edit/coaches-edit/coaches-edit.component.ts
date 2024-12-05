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
  addForm = false;
  editForm = false;
  details = false;
  SelectedCoachId = '';
  @Input() ClubId!: string;
  @Input() coaches!: CoachDTO[];
  constructor(private _coachService: CoachService) {}

  ngOnInit(): void {
    this._coachService.GetAllCoachesFromClub(this.ClubId).subscribe({
      next: (result) => {
        this.coaches = result;
        console.log(this.coaches);
      },
      error: (err) => {
        console.log('Coś poszło nie tak', err);
      },
    });
  }
  GetNewCoach(coach: CoachDTO) {
    if (coach) this.pushAndSortCoachList(coach);
    this.addForm = false;
  }
  private pushAndSortCoachList(coach: CoachDTO) {
    this.coaches.push(coach);
    this.coaches = this.coaches.sort((a, b) => {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
        return -1;
      }
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }
  SelectCoach(coachId: string) {
    this.SelectedCoachId = coachId;
    console.log(this.SelectedCoachId);
    this.editForm = true;
  }
}
