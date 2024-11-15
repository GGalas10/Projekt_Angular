import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { ClubCreateComponent } from './club-create/club-create.component';
import { WholeClubsComponent } from './whole-clubs/whole-clubs.component';
import { UserClubsComponent } from './user-clubs/user-clubs.component';
import { authCanMatchGuard } from '../core/guards/Auth-CanMatch.guard';

const routes: Routes = [
  {
    path: 'Details/:clubId',
    component: ClubDetailsComponent,
    title: 'Szczegóły',
  },
  {
    path: 'Create',
    component: ClubCreateComponent,
    title: 'Tworzenie klubu',
  },
  { path: '', component: WholeClubsComponent, title: 'Wszystkie kluby' },
  {
    path: 'UserClubs',
    component: UserClubsComponent,
    title: 'Twoje zespoły',
    canMatch: [authCanMatchGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
