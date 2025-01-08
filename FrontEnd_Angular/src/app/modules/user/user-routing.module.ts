import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';
import { authActivateGuard } from '../core/guards/auth-activate.guard';
import { UserPanelComponent } from './user-panel/user-panel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'Details',
    component: DetailsComponent,
    canActivate: [authActivateGuard],
  },
  {
    path: 'Panel',
    component: UserPanelComponent,
    canActivate: [authActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
