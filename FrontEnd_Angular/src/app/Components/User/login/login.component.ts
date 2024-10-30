import { Component } from '@angular/core';
import { LoginCommand } from '../../../shared/Interfaces/LoginCommand';
import { LoginService } from '../../../Core/Services/API/LoginService';
import { RegisterUser } from '../../../shared/Interfaces/RegisterCommand';
import { BaseAlert } from '../../../shared/Component/base-alert/BaseAlertInterface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  IsLogin = true;
  ShowAlert = false;
  baseAlert:BaseAlert = {Title:"",Message:""}
  constructor(private _apiService:LoginService,private route:Router){}



  Login(command:LoginCommand){
    this._apiService.LoginUser(command).subscribe({
      next: token => {
        console.log(token);
        this.ShowAlertFunction("Sukces","Udało się zalogować");
        this.route.navigateByUrl("/home");
      },
      error: err => {
        if(err.error.includes("Wrong_Credentials_Login")){
          this.ShowAlertFunction("Błąd logowania","Błędne dane logowania");
          return;
        }
        this.ShowAlertFunction("Błąd aplikacji","Coś poszło nie tak. Spróbuj ponownie później");
      }
    })
  }

  Register(command:RegisterUser){
    this._apiService.RegisterUser(command).subscribe({
      next: () => 
        {
          this.IsLogin=true;
          this.ShowAlertFunction("WSZYSTKO SIĘ UDAŁO","Udało się stworzyć konto. Teraz możesz się do niego zalogować");
        },
      error: err =>
        {
          if(err.error.includes("Command_Cannot_Be_Null_CreateUser")){
            this.ShowAlertFunction("Błąd rejestracji","Musisz uzupełnić wszystkie pola");
            return;
          }
          if(err.error.includes("User_Cannot_Be_null_CreateUser")){
            this.ShowAlertFunction("Błąd rejestracji","Błąd aplikacji. Spróbuj ponownie później");
            return;
          }
          if(err.error.includes("User_With_Login_Already_Exist")){
            this.ShowAlertFunction("Błąd rejestracji","Podany login już istnieje w bazie");
            return;
          }
          this.ShowAlertFunction("Błąd aplikacji","Coś poszło nie tak. Spróbuj ponownie później");
        } 
    })
  }
  
  ChangeToRegister(value:boolean) {
    this.IsLogin = value;
    }
  private ShowAlertFunction(Title:string,Message:string){
    this.ShowAlert = true;
    this.baseAlert.Title = Title;
    this.baseAlert.Message = Message;
  }
}
