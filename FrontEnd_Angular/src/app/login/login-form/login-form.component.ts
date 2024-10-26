import { Component, EventEmitter, Output } from '@angular/core';
import { LoginCommand } from '../../shared/Interfaces/LoginCommand';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent {

  @Output() test = new EventEmitter<LoginCommand>;

    login:string = "";
    password:string = "";

    onSubmit(){
      let command : LoginCommand = {
        login : this.login,
        password : this.password
      }
      this.test.emit(command);
    }
  }
