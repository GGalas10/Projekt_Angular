import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { WholeClubsComponent } from './whole-clubs/whole-clubs.component';

const routes: Routes = [
  {
    path: 'Details/:clubId',
    component: ClubDetailsComponent,
    title: 'Szczegóły',
  },
  { path: '', component: WholeClubsComponent, title: 'Wszystkie kluby' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
