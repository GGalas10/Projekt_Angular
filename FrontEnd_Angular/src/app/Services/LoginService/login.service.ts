import { Injectable } from '@angular/core';
import { LoginCommand } from '../../shared/Interfaces/LoginCommand';
import { ApiServiceService } from '../../Core/Services/API/api-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _api:ApiServiceService) { }
  LoginUser(command:LoginCommand) :void {
    let checker : boolean = true;
    if(command.login == ""){
        checker = false
    }
    if(command.password == ""){
      checker = false;
    }
    if(checker){
      this._api.Login(command).subscribe({
        next: req => console.log(req),
        error: err => {
          if(String(err.error).includes("Cannot_Find_User_FindById")){
            alert("Błędne dane logowania");
          }
        }
        
      });
    }else{
      alert ("Nie udało się zalogować")
    }
  }
}
