import { Component, EventEmitter, Output } from '@angular/core';
import { RegisterUser } from '../../../../shared/Interfaces/RegisterCommand';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  login = '';
  password = '';

  @Output() register = new EventEmitter<RegisterUser>();
  @Output() loginEmit = new EventEmitter<boolean>();

  onSubmit() {
    this.register.emit({
      Name: this.login,
      Password: this.password,
    });
  }
  EmitRegister() {
    this.loginEmit.emit(true);
  }
}
