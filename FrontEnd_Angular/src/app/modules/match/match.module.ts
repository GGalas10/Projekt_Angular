import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { IndexComponent } from './index/index.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [IndexComponent, DetailsComponent],
  imports: [CommonModule, MatchRoutingModule, CoreModule, SharedModule],
})
export class MatchModule {}
