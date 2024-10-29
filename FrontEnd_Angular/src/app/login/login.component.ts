import { Component } from '@angular/core';
import { LoginCommand } from '../shared/Interfaces/LoginCommand';
import { ApiServiceService } from '../Core/Services/API/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _apiService:ApiServiceService){}


  onSubmit(command:LoginCommand){
    
  }
}
