import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseAlert } from '../../../shared/Component/base-alert/BaseAlertInterface';
import { Router } from '@angular/router';
import { LoginService } from '../../core/Services/API/LoginService';
import { AuthService } from '../../core/Services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userLogin = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
  ShowAlert = false;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  IsClick = false;

  constructor(
    private _apiService: LoginService,
    private route: Router,
    private authService: AuthService,
  ) {}

  onSubmit() {
    this.IsClick = true;
    this._apiService
      .LoginUser({
        login: String(this.userLogin.value.login),
        password: String(this.userLogin.value.password),
      })
      .subscribe({
        next: (token) => {
          this.authService.LoginUser(token);
          this.ShowAlertFunction('Sukces', 'Udało się zalogować');
          this.route.navigateByUrl('/');
          this.IsClick = false;
        },
        error: (err) => {
          this.IsClick = false;
          console.log(err);
          if (err.status == 0) {
            this.ShowAlertFunction(
              'Błąd aplikacji',
              'Spróbuj ponownie później',
            );
            return;
          }
          if (err.error.includes('Wrong_Credentials_Login')) {
            this.ShowAlertFunction('Błąd logowania', 'Błędne dane logowania');
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
