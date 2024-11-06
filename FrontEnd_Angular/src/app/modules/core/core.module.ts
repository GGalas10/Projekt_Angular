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

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
  providers: [
    AuthService,
    ClubServices,
    HealthCheckService,
    LoginService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
