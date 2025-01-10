import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AddLeagueComponent } from './add/add-league.component';
import { authActivateGuard } from '../core/guards/auth-activate.guard';
import { DetailsLeagueComponent } from './details/details-league.component';

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  {
    path: 'Add',
    component: AddLeagueComponent,
    canActivate: [authActivateGuard],
  },
  { path: 'Details/:LeagueId', component: DetailsLeagueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
