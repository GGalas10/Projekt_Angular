import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './shared/Component/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HealthCheckService } from './Core/Services/API/HealthCheckService';
import { ClubServices } from './Core/Services/API/ClubServices';
import { HomeComponent } from './Components/home/home.component';
import { ClubDetailsComponent } from './Components/Club/club-details/club-details.component';
import { ClubEditComponent } from './Components/Club/club-edit/club-edit.component';
import { LoginComponent } from './Components/User/login/login.component';
import { LoginFormComponent } from './Components/User/login/login-form/login-form.component';
import { NotFound404Component } from './Components/Errors/not-found-404/not-found-404.component';
import { BaseAlertComponent } from './shared/Component/base-alert/base-alert.component';
import { RegisterComponent } from './Components/User/login/register/register.component';
import { LoginService } from './Core/Services/API/LoginService';
import { CoreModule } from './modules/core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    ModalComponent,
    HomeComponent,
    NotFound404Component,
    ClubDetailsComponent,
    ClubEditComponent,
    BaseAlertComponent,
    RegisterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
  ],
  providers: [ClubServices, HealthCheckService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {
  IsLogin = false;

  constructor(private _service: HealthCheckService) {}
}
