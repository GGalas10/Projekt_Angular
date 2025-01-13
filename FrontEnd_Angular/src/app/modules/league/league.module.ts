import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueRoutingModule } from './league-routing.module';
import { IndexComponent } from './index/index.component';
import { AddLeagueComponent } from './add/add-league.component';
import { EditLeagueComponent } from './edit/edit-league.component';
import { DetailsLeagueComponent } from './details/details-league.component';
import { SharedModule } from '../../shared/shared.module';
import { UserLeaguesComponent } from './user-leagues/user-leagues.component';

@NgModule({
  declarations: [
    IndexComponent,
    AddLeagueComponent,
    EditLeagueComponent,
    DetailsLeagueComponent,
    UserLeaguesComponent,
  ],
  imports: [CommonModule, LeagueRoutingModule, SharedModule],
})
export class LeagueModule {}
