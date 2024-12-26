export interface CreateCommand {
  name: string;
  description: string;
  rising: Date;
}
import { Coach } from './Coach';
import { PlayerDetailsDTO } from './Player';
import { StaffDTO } from './Staff';

export interface ClubDetails {
  id: string;
  name: string;
  description: string;
  rising: Date;
  playerList: PlayerDetailsDTO[];
  coachList: Coach[];
  staffList: StaffDTO[];
}
export interface HomeClubDTO {
  clubId: string;
  clubName: string;
  rising: Date;
}
