import { NgModule } from '@angular/core';

import { ClubRoutingModule } from './club-routing.module';
import { ClubDetailsComponent } from './club-details/club-details.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ClubDetailsComponent],
  imports: [SharedModule, ClubRoutingModule],
  exports: [ClubDetailsComponent],
})
export class ClubModule {}
