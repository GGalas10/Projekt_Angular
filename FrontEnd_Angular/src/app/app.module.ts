import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './shared/Component/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './modules/core/core.module';
import { UserModule } from './modules/user/user.module';
import { HomeModule } from './modules/home/home.module';
import { HealthCheckService } from './modules/core/Services/API/HealthCheckService';
import { ClubModule } from './modules/club/club.module';
import { ErrorsModule } from './modules/errors/errors.module';

@NgModule({
  declarations: [AppComponent, ModalComponent],
  imports: [
    HomeModule,
    UserModule,
    ClubModule,
    ErrorsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {
  IsLogin = false;

  constructor(private _service: HealthCheckService) {}
}
