import { Component } from '@angular/core';
import { LoginCommand } from '../shared/Interfaces/LoginCommand';
import { LoginService } from '../Services/LoginService/login.service';
import { ApiServiceService } from '../Core/Services/API/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _loginService:LoginService, private _apiService:ApiServiceService){}


  onSubmit(command:LoginCommand){
    this._loginService.LoginUser(command);
  }
}
