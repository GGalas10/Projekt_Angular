import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserclubRoutingModule } from './userclub-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserClubsComponent } from './user-clubs/user-clubs.component';
import { ClubEditComponent } from './club-edit/club-edit.component';
import { ClubCreateComponent } from './club-create/club-create.component';
import { DescriptionEditComponent } from './club-edit/primary-date/description-edit/description-edit.component';
import { RisingEditComponent } from './club-edit/primary-date/rising-edit/rising-edit.component';
import { NameEditComponent } from './club-edit/primary-date/name-edit/name-edit.component';
import { PrimaryDateComponent } from './club-edit/primary-date/primary-date.component';

@NgModule({
  declarations: [
    UserClubsComponent,
    ClubEditComponent,
    ClubCreateComponent,
    NameEditComponent,
    DescriptionEditComponent,
    RisingEditComponent,
    PrimaryDateComponent,
  ],
  imports: [SharedModule, CommonModule, UserclubRoutingModule, FormsModule],
})
export class UserclubModule {}
