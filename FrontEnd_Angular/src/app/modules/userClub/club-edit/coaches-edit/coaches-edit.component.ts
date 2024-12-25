import { Component, Input, OnInit } from '@angular/core';
import { CoachDTO } from '../../../../shared/Interfaces/Coach';
import { CoachService } from '../../../core/Services/API/CoachService';
import { BaseAlert } from '../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-coaches-edit',
  templateUrl: './coaches-edit.component.html',
  styleUrl: './coaches-edit.component.css',
  standalone: false,
})
export class CoachesEditComponent implements OnInit {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
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
      },
      error: (err) => {
        if (err.error.includes('ClubId_Cannot_Be_Empty')) {
          this.ShowAlert(
            'Błąd',
            'Coś poszło nie tak. Spróbuj ponownie później',
          );
        }
        this.ShowAlert(
          'Coś poszło nie tak',
          'Odśwież stronę i spróbuj ponownie',
        );
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
  GetEditCoach(coach: CoachDTO) {
    this.editForm = false;
    this.pushAndSortCoachList(coach);
  }
  SelectCoach(coachId: string) {
    this.SelectedCoachId = coachId;
    this.editForm = true;
  }
  ShowAlert(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.showAlert = true;
  }
  SelectCoachForDetails(coachId: string) {
    this.SelectedCoachId = coachId;
    this.details = true;
  }
  DeleteSelectedCoach(coachId: string) {
    this._coachService.DeleteCoach(coachId).subscribe({
      next: () => {
        this.ShowAlert('Powodzenie', 'Udało się usunąć trenera');
      },
      error: () => {
        this.ShowAlert('Błąd', 'Coś poszło nie tak. Spróbuj ponownie później');
      },
    });
  }
}
