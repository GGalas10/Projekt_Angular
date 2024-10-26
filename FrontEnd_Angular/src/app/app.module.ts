import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './shared/Component/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';
import { LoginService } from './Services/LoginService/login.service';
import { ApiServiceService } from './Core/Services/API/api-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HealthCheckService } from './Core/Services/API/HealthCheckService';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoginFormComponent,
    ModalComponent,
    HomeComponent,
    NotFound404Component
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,   
    FormsModule
  ],
  providers: [
    HealthCheckService,
    LoginService,
    ApiServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
