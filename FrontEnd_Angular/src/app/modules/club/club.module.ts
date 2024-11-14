import { NgModule } from '@angular/core';

import { ClubRoutingModule } from './club-routing.module';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { SharedModule } from '../../shared/shared.module';
import { ClubCreateComponent } from './club-create/club-create.component';
import { WholeClubsComponent } from './whole-clubs/whole-clubs.component';

@NgModule({
  declarations: [ClubDetailsComponent, ClubCreateComponent, WholeClubsComponent],
  imports: [SharedModule, ClubRoutingModule],
  exports: [],
})
export class ClubModule {}
