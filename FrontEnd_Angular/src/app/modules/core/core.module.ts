import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ClubServices } from './Services/API/ClubServices';
import { HealthCheckService } from './Services/API/HealthCheckService';
import { LoginService } from './Services/API/LoginService';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
  providers: [ClubServices, HealthCheckService, LoginService],
})
export class CoreModule {}
