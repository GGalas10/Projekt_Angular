import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ClubServices } from './Services/API/ClubServices';
import { HealthCheckService } from './Services/API/HealthCheckService';
import { LoginService } from './Services/API/LoginService';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthService } from './Services/AuthService';
import { authInterceptor } from './interceptors/auth-interceptor.interceptor';
import { errorCatchInterceptor } from './interceptors/error-catch.interceptor';
import { UserService } from './Services/API/UserService';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
  providers: [
    AuthService,
    ClubServices,
    HealthCheckService,
    LoginService,
    UserService,
    provideHttpClient(withInterceptorsFromDi()),
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: authInterceptor,
        multi: true,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: errorCatchInterceptor,
        multi: true,
      },
    ],
  ],
})
export class CoreModule {}
