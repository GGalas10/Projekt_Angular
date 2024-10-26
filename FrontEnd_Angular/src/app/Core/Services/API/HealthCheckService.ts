import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { interval, Observable } from "rxjs";
@Injectable()
export class HealthCheckService implements OnDestroy{
    public ApiIsHealth = false;
    
    constructor
    (
        private http:HttpClient
    ){
        this.healthCheckAPI();
    }
    
    private healthCheckAPI(): void{
        this.Inter().subscribe({
           next: () => {this.http.get<any>("https://localhost:7137/HealthCheck").subscribe({
            next: response => {this.ApiIsHealth = response;console.log(response) },
            error: err => this.ApiIsHealth = false, 
        })}
        });
      }
    private Inter():Observable<any>{
        return interval(5000);
    }
      ngOnDestroy(): void {
        this.Inter().subscribe().unsubscribe();
    }
}