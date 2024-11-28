import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseAlert } from '../../../shared/Component/base-alert/BaseAlertInterface';
import { LoginService } from '../../core/Services/API/LoginService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false,
})
export class RegisterComponent {
  registerUser = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
    secondPassword: new FormControl(''),
  });
  ShowAlert = false;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  IsClick = false;
  GetValue() {
    return this.registerUser.value;
  }
  constructor(
    private _apiService: LoginService,
    private router: Router,
  ) {}

  onSubmit() {
    this.IsClick = true;
    if (this.GetValue().password != this.GetValue().secondPassword) {
      this.ShowAlertFunction('Błąd', 'Hasłą muszą być identyczne');
      return;
    }
    this._apiService
      .RegisterUser({
        Name: String(this.GetValue().login),
        Password: String(this.GetValue().password),
      })
      .subscribe({
        next: () => {
          this.IsClick = false;
          this.ShowAlertFunction(
            'WSZYSTKO SIĘ UDAŁO',
            'Udało się stworzyć konto. Teraz możesz się do niego zalogować',
          );
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.IsClick = false;
          if (err.status == 0) {
            this.ShowAlertFunction(
              'Błąd rejestracji',
              'Musisz uzupełnić wszystkie pola',
            );
            return;
          }
          if (err.error.includes('Command_Cannot_Be_Null_CreateUser')) {
            this.ShowAlertFunction(
              'Błąd rejestracji',
              'Musisz uzupełnić wszystkie pola',
            );
            return;
          }
          if (err.error.includes('User_Cannot_Be_null_CreateUser')) {
            this.ShowAlertFunction(
              'Błąd rejestracji',
              'Błąd aplikacji. Spróbuj ponownie później',
            );
            return;
          }
          if (err.error.includes('User_With_Login_Already_Exist')) {
            this.ShowAlertFunction(
              'Błąd rejestracji',
              'Podany login już istnieje w bazie',
            );
            return;
          }
          this.ShowAlertFunction(
            'Błąd aplikacji',
            'Coś poszło nie tak. Spróbuj ponownie później',
          );
        },
      });
  }
  private ShowAlertFunction(Title: string, Message: string) {
    this.ShowAlert = true;
    this.baseAlert.Title = Title;
    this.baseAlert.Message = Message;
  }
}
