import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubDetailsComponent } from './club-details/club-details.component';

const routes: Routes = [
  {
    path: 'Club/Details/:clubId',
    component: ClubDetailsComponent,
    title: 'Szczegóły',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubRoutingModule {}
