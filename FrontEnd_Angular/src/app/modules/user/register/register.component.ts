import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseAlert } from '../../../shared/Component/base-alert/BaseAlertInterface';
import { LoginService } from '../../core/Services/API/LoginService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerUser = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
  ShowAlert = false;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  IsClick = false;

  constructor(private _apiService: LoginService) {}

  onSubmit() {
    this.IsClick = true;
    this._apiService
      .RegisterUser({
        Name: String(this.registerUser.value.login),
        Password: String(this.registerUser.value.password),
      })
      .subscribe({
        next: () => {
          this.IsClick = false;
          this.ShowAlertFunction(
            'WSZYSTKO SIĘ UDAŁO',
            'Udało się stworzyć konto. Teraz możesz się do niego zalogować',
          );
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
