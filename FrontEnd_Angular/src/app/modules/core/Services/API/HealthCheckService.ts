import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class HealthCheckService implements OnDestroy {
  public ApiIsHealth = false;
  apiURL = environment.baseUrl;
  private counter = 0;
  constructor(private http: HttpClient) {
    this.healthCheckAPI();
  }

  private healthCheckAPI(): void {
    this.http.get<boolean>(`${this.apiURL}/HealthCheck`).subscribe({
      next: (response) => {
        this.ApiIsHealth = response;
      },
      error: () => (this.ApiIsHealth = false),
    });
    this.Inter().subscribe({
      next: () => {
        this.http.get<boolean>(`${this.apiURL}/HealthCheck`).subscribe({
          next: (response) => {
            this.ApiIsHealth = response;
          },
          error: () => {
            this.ApiIsHealth = false;
            this.counter++;
            if (this.counter == 20) {
              this.unSub();
            }
          },
        });
      },
    });
  }
  private Inter(): Observable<number> {
    return interval(30 * 60 * 1000);
  }
  ngOnDestroy(): void {
    this.unSub();
  }
  private unSub(): void {
    this.Inter().subscribe().unsubscribe();
  }
}
