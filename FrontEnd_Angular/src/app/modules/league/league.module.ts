import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueRoutingModule } from './league-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    EditComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    LeagueRoutingModule
  ]
})
export class LeagueModule { }
