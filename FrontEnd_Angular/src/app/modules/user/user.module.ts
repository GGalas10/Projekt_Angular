import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, DetailsComponent],
  imports: [SharedModule, UserRoutingModule],
  exports: [],
})
export class UserModule {}
