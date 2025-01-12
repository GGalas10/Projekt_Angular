import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LeagueService } from '../../core/Services/API/LeagueService';
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
  errors: string[] = [];
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
    if (this.CheckValid()) {
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
          error: (err) => {
            if (
              err.error.includes('Command_Cannot_Be_Null') ||
              err.error.includes('League_Cannot_Be_Null')
            ) {
              this.ShowAlert(
                'Błąd',
                '<p>Poszło coś nie tak</p>Uzupełnij wszystkie pola poprawnie i spróbuj jeszcze raz',
              );
            }
            if (err.error.includes('League_Is_Already_Exist')) {
              this.ShowAlert(
                'Błąd',
                'Liga o takiej samej nazwie i takim samym starcie już istnieje',
              );
            } else {
              this.ShowAlert(
                'Coś nie tak',
                'Coś poszło nie tak. Spróbuj ponownie później',
              );
            }
          },
        });
    } else {
      this.ShowAlert('Błąd', this.errors.toString().replaceAll(',', ''));
      this.errors = [];
    }
  }
  ShowAlert(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.showAlert = true;
  }
  CheckValid() {
    const endDateValue = this.formControls.endDate.value ?? new Date();
    const startDateValue = this.formControls.startDate.value ?? new Date();
    if (this.formControls.name.invalid)
      this.errors.push('<p>Uzupełnij Nazwę ligi</p>');
    if (this.formControls.startDate.invalid == null)
      this.errors.push('<p>Uzupełnij Początek ligi</p>');
    if (this.formControls.endDate.invalid == null)
      this.errors.push('<p>Uzupełnij Koniec ligi</p>');
    if (!this.formControls.endDate.value)
      this.errors.push('<p>Uzupełnij poprawnie datę końcową</p>');
    if (!this.formControls.startDate.value)
      this.errors.push('<p>Uzupełnij poprawnie datę początkową</p>');
    if (
      endDateValue <= startDateValue &&
      this.formControls.endDate.value &&
      this.formControls.startDate.value
    )
      this.errors.push('<p>Koniec ligi musi być później niż rozpoczęcie</p>');
    if (new Date(startDateValue) <= new Date(1888, 1, 1))
      this.errors.push(
        '<p>W tych latach nie istniała profesjonalna piłka nożna</p>',
      );
    if (this.errors.length > 0) return false;
    else return true;
  }
}
