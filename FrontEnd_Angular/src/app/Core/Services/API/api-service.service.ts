import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginCommand } from '../../../shared/Interfaces/LoginCommand';
import { HealthCheckService } from './HealthCheckService';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private http:HttpClient, private _health : HealthCheckService){}
  Login(command:LoginCommand) : Observable<any>{
    if(this._health.ApiIsHealth){
      let headers : HttpHeaders = new HttpHeaders().append("Fc_header","");
        headers.append("Content-type","application/json")
        return this.http.post("https://localhost:7137/Login/Login",command,{headers: headers})
    }else{
      return new Observable<any>();
    }
  }
}
