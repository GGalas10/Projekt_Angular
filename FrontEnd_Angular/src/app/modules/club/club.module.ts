import { NgModule } from '@angular/core';

import { ClubRoutingModule } from './club-routing.module';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { SharedModule } from '../../shared/shared.module';
import { ClubCreateComponent } from './club-create/club-create.component';

@NgModule({
  declarations: [ClubDetailsComponent, ClubCreateComponent],
  imports: [SharedModule, ClubRoutingModule],
  exports: [],
})
export class ClubModule {}
