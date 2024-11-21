import { NgModule } from '@angular/core';

import { ClubRoutingModule } from './club-routing.module';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { SharedModule } from '../../shared/shared.module';
import { ClubCreateComponent } from './club-create/club-create.component';
import { WholeClubsComponent } from './whole-clubs/whole-clubs.component';
import { PlayersComponent } from './club-details/players/players.component';
import { CoachesComponent } from './club-details/coaches/coaches.component';
import { StaffsComponent } from './club-details/staffs/staffs.component';
import { UserClubsComponent } from '../user/user-clubs/user-clubs.component';
import { ClubEditComponent } from './club-edit/club-edit.component';

@NgModule({
  declarations: [
    ClubDetailsComponent,
    ClubCreateComponent,
    WholeClubsComponent,
    PlayersComponent,
    CoachesComponent,
    StaffsComponent,
    UserClubsComponent,
    ClubEditComponent,
  ],
  imports: [SharedModule, ClubRoutingModule],
  exports: [],
})
export class ClubModule {}
