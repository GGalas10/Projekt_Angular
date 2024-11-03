import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { ClubCreateComponent } from './club-create/club-create.component';

const routes: Routes = [
  {
    path: 'Club/Details/:clubId',
    component: ClubDetailsComponent,
    title: 'Szczegóły',
  },
  {
    path: 'Club/Create',
    component: ClubCreateComponent,
    title: 'Tworzenie klubu',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
