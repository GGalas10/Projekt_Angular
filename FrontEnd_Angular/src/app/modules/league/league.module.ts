import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueRoutingModule } from './league-routing.module';
import { IndexComponent } from './index/index.component';
import { AddLeagueComponent } from './add/add-league.component';
import { EditComponent } from './edit/edit.component';
import { DetailsLeagueComponent } from './details/details-league.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    IndexComponent,
    AddLeagueComponent,
    EditComponent,
    DetailsLeagueComponent,
  ],
  imports: [CommonModule, LeagueRoutingModule, SharedModule],
})
export class LeagueModule {}
