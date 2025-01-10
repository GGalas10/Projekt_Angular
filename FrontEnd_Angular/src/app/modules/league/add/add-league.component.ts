import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LeagueService } from '../../core/Services/API/LeagueServoce';
import { BaseAlert } from '../../../shared/Component/base-alert/BaseAlertInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: false,
  templateUrl: './add-league.component.html',
  styleUrl: './add-league.component.css',
})
export class AddLeagueComponent {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  createLeague = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDate: new FormControl<Date>(new Date(), [Validators.required]),
    endDate: new FormControl<Date>(new Date(), [Validators.required]),
  });
  get formControls() {
    return this.createLeague.controls;
  }
  constructor(
    private leagueService: LeagueService,
    private router: Router,
  ) {}
  OnSubmit() {
    if (this.createLeague.valid) {
      this.leagueService
        .CreateLeague({
          name: this.formControls.name.value ?? '',
          startDate: this.formControls.startDate.value ?? new Date(),
          endDate: this.formControls.endDate.value ?? new Date(),
        })
        .subscribe({
          next: (result) => {
            this.router.navigate([`/League/Details/${result}`]);
            console.log(result);
          },
          error: () => {
            console.log('test');
          },
        });
    } else {
      const errors: string[] = [];
      const endDateValue = this.formControls.endDate.value ?? new Date();
      const startDateValue = this.formControls.startDate.value ?? new Date();
      if (this.formControls.name.invalid)
        errors.push('<p>Uzupełnij Nazwę ligi</p>');
      if (this.formControls.startDate.value == null)
        errors.push('<p>Uzupełnij Początek ligi</p>');
      if (this.formControls.endDate.invalid == null)
        errors.push('<p>Uzupełnij Koniec ligi</p>');
      if (endDateValue <= startDateValue)
        errors.push('<p>Koniec ligi musi być później niż rozpoczęcie</p>');
      if (new Date(startDateValue) <= new Date(1888, 1, 1))
        errors.push(
          '<p>W tych latach nie istniała profesjonalna piłka nożna</p>',
        );
      this.ShowAlert('Błąd', errors.toString().replaceAll(',', ''));
    }
  }
  ShowAlert(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.showAlert = true;
  }
}
