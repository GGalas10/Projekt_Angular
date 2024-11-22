import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserclubRoutingModule } from './userclub-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserClubsComponent } from './user-clubs/user-clubs.component';
import { ClubEditComponent } from './club-edit/club-edit.component';
import { ClubCreateComponent } from './club-create/club-create.component';

@NgModule({
  declarations: [UserClubsComponent, ClubEditComponent, ClubCreateComponent],
  imports: [SharedModule, CommonModule, UserclubRoutingModule, FormsModule],
})
export class UserclubModule {}
