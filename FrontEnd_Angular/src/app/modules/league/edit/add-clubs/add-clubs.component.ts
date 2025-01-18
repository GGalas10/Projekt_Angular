import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClubForSelectList } from '../../../../shared/Interfaces/Club';
import { ClubServices } from '../../../core/Services/API/ClubServices';
import { LeagueService } from '../../../core/Services/API/LeagueService';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseAlert } from '../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-add-clubs',
  standalone: false,

  templateUrl: './add-clubs.component.html',
  styleUrl: './add-clubs.component.css',
})
export class AddClubsComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  clubSelectList!: ClubForSelectList[];
  clubsForm = new FormGroup({
    oneClub: new FormArray([new FormControl('')]),
  });
  baseAlert: BaseAlert = { Title: '', Message: '' };
  ShowAlert = false;
  constructor(
    private clubService: ClubServices,
    private leagueService: LeagueService,
  ) {}
  ngOnInit(): void {
    this.clubService.GetClubsForSelectList().subscribe({
      next: (result) => (this.clubSelectList = result),
      error: (err) => {
        console.log(err);
      },
    });
  }
  get oneClub(): FormArray {
    return this.clubsForm.get('oneClub') as FormArray;
  }

  addClub(): void {
    if (this.oneClub.length >= 16) {
      this.ShowAlertFunction(
        'Dużo klubów',
        'W lidze nie może być więcej niż 16 klubow',
      );
      return;
    }
    this.oneClub.push(new FormControl(''));
  }

  removeClub(index: number): void {
    this.oneClub.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.clubsForm.value);
  }
  ShowAlertFunction(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.ShowAlert = true;
  }
}
