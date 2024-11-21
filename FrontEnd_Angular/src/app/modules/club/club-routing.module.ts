import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { ClubCreateComponent } from './club-create/club-create.component';
import { WholeClubsComponent } from './whole-clubs/whole-clubs.component';
import { ClubEditComponent } from './club-edit/club-edit.component';

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
  {
    path: 'Edit/:clubId',
    component: ClubEditComponent,
    title: 'Edycja',
  },
  { path: '', component: WholeClubsComponent, title: 'Wszystkie kluby' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
