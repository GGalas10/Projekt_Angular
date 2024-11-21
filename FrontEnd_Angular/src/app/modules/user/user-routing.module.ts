import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';
import { authActivateGuard } from '../core/guards/auth-activate.guard';
import { UserClubsComponent } from './user-clubs/user-clubs.component';
import { authCanMatchGuard } from '../core/guards/Auth-CanMatch.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'Details',
    component: DetailsComponent,
    canActivate: [authActivateGuard],
  },
  {
    path: 'Clubs',
    component: UserClubsComponent,
    title: 'Twoje zespoły',
    canMatch: [authCanMatchGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
