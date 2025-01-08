import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { UserPanelComponent } from './user-panel/user-panel.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, DetailsComponent, UserPanelComponent],
  imports: [SharedModule, UserRoutingModule, FormsModule],
  exports: [],
})
export class UserModule {}
