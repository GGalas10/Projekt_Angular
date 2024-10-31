import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [UserComponent, LoginComponent, RegisterComponent],
  imports: [SharedModule, UserRoutingModule],
  exports: [UserComponent, LoginComponent, RegisterComponent],
})
export class UserModule {}
