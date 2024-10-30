import { Component, EventEmitter, Output } from '@angular/core';
import { LoginCommand } from '../../../../shared/Interfaces/LoginCommand';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  @Output() loginCommand = new EventEmitter<LoginCommand>();
  @Output() IsRegister = new EventEmitter<boolean>();

  login = '';
  password = '';

  onSubmit() {
    this.loginCommand.emit({
      login: this.login,
      password: this.password,
    });
  }
  EmitRegister() {
    this.IsRegister.emit(false);
  }
}
