import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserClubsComponent } from './user-clubs/user-clubs.component';
import { authCanMatchGuard } from '../core/guards/Auth-CanMatch.guard';
import { ClubCreateComponent } from './club-create/club-create.component';
import { ClubEditComponent } from './club-edit/club-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserClubsComponent,
    title: 'Twoje zespoły',
    canMatch: [authCanMatchGuard],
  },
  {
    path: 'Create',
    component: ClubCreateComponent,
    title: 'Tworzenie klubu',
    canMatch: [authCanMatchGuard],
  },
  {
    path: 'Edit/:clubId',
    component: ClubEditComponent,
    title: 'Edycja',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserclubRoutingModule {}
