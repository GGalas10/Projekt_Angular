import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/Services/API/UserService';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrl: './details.component.css',
    standalone: false
})
export class DetailsComponent implements OnInit {
  userName!: string;
  newLogin = '';
  newPassword = '';
  changePassword = false;
  changeLogin = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .DetailsUser()
      .subscribe({ next: (value) => (this.userName = value.name) });
  }
  clickLoginChange() {
    this.changeLogin = !this.changeLogin;
  }
  clickPasswordChange() {
    this.changePassword = !this.changePassword;
  }
  changeLoginAPI() {
    if (this.newLogin == '') {
      alert('Uzupełnij pole nowego loginu');
      return;
    }
    this.userService.ChangeLogin(this.newLogin).subscribe({
      next: () => {
        alert('Login zmieniony');
        window.location.reload();
      },
      error: (error) => {
        alert('Coś poszło nie tak');
        console.log(error);
      },
    });
    this.changeLogin = false;
  }

  changePasswordAPI() {
    if (this.newPassword == '') {
      alert('Uzupełnij pole nowego hasła');
      return;
    }
    this.userService.ChangePassword(this.newPassword).subscribe({
      next: () => {
        alert('Hasło zmienione');
        window.location.reload();
      },
      error: (error) => {
        alert('Coś poszło nie tak');
        console.log(error);
      },
    });
    this.changePassword = false;
  }
}
