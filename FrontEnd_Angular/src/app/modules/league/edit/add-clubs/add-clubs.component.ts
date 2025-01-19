import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClubForSelectList } from '../../../../shared/Interfaces/Club';
import { ClubServices } from '../../../core/Services/API/ClubServices';
import { LeagueService } from '../../../core/Services/API/LeagueService';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseAlert } from '../../../../shared/Component/base-alert/BaseAlertInterface';
import {} from '@ng-select/ng-select';

@Component({
  selector: 'app-add-clubs',
  standalone: false,

  templateUrl: './add-clubs.component.html',
  styleUrl: './add-clubs.component.css',
})
export class AddClubsComponent implements OnInit {
  @Input() leagueId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  clubSelectList!: ClubForSelectList[];
  leagueClubsCount = 0;
  leagueMaxCount = 0;
  filteredClubSelectList: ClubForSelectList[] = [];
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
      next: (result) => {
        this.clubSelectList = result;
        this.filteredClubSelectList = this.clubSelectList.slice(0, 4);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.leagueService.GetClubsCount(this.leagueId).subscribe({
      next: (result) => {
        this.leagueClubsCount = result.ClubsCount;
        this.leagueMaxCount = result.MaxClubs;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  get oneClub(): FormArray {
    return this.clubsForm.get('oneClub') as FormArray;
  }

  addClub(): void {
    if (this.leagueClubsCount + this.oneClub.length >= this.leagueMaxCount) {
      this.ShowAlertFunction(
        'Dużo klubów',
        'W lidze nie może być więcej niż 16 klubow',
      );
      return;
    }
    this.oneClub.push(new FormControl(''));
  }
  onSearch(query: string): void {
    this.filteredClubSelectList = this.clubSelectList
      .filter((club) =>
        club.clubName.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, 4);
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
