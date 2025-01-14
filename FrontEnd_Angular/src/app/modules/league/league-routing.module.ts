import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AddLeagueComponent } from './add/add-league.component';
import { authActivateGuard } from '../core/guards/auth-activate.guard';
import { DetailsLeagueComponent } from './details/details-league.component';
import { EditLeagueComponent } from './edit/edit-league.component';
import { UserLeaguesComponent } from './user-leagues/user-leagues.component';

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  {
    path: 'Add',
    component: AddLeagueComponent,
    canActivate: [authActivateGuard],
  },
  { path: 'Details/:LeagueId', component: DetailsLeagueComponent },
  { path: 'Edit/:LeagueId', component: EditLeagueComponent },
  {
    path: 'UserLeagues',
    component: UserLeaguesComponent,
    canActivate: [authActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
