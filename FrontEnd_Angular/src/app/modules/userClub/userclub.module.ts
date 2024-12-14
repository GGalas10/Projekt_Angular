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
import { PlayersEditComponent } from './club-edit/players-edit/players-edit.component';
import { CoachesEditComponent } from './club-edit/coaches-edit/coaches-edit.component';
import { StaffsEditComponent } from './club-edit/staffs-edit/staffs-edit.component';
import { EditPlayerComponent } from './club-edit/players-edit/edit-player/edit-player.component';
import { AddPlayerComponent } from './club-edit/players-edit/add-player/add-player.component';
import { DetailsPlayerComponent } from './club-edit/players-edit/details-player/details-player.component';
import { EditCoachComponent } from './club-edit/coaches-edit/edit-coach/edit-coach.component';
import { AddCoachComponent } from './club-edit/coaches-edit/add-coach/add-coach.component';
import { DetailsCoachComponent } from './club-edit/coaches-edit/details-coach/details-coach.component';
import { AddStaffComponent } from './club-edit/staffs-edit/add-staff/add-staff.component';
import { DetailsStaffComponent } from './club-edit/staffs-edit/details-staff/details-staff.component';
import { EditStaffComponent } from './club-edit/staffs-edit/edit-staff/edit-staff.component';

@NgModule({
  declarations: [
    UserClubsComponent,
    ClubEditComponent,
    ClubCreateComponent,
    NameEditComponent,
    DescriptionEditComponent,
    RisingEditComponent,
    PrimaryDateComponent,
    PlayersEditComponent,
    CoachesEditComponent,
    StaffsEditComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    DetailsPlayerComponent,
    EditCoachComponent,
    AddCoachComponent,
    DetailsCoachComponent,
    AddStaffComponent,
    DetailsStaffComponent,
    EditStaffComponent,
  ],
  imports: [SharedModule, CommonModule, UserclubRoutingModule, FormsModule],
})
export class UserclubModule {}
