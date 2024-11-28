export interface CreateCommand {
  name: string;
  description: string;
  rising: Date;
}
import { Coach } from './Coach';
import { PlayerDetailsDTO } from './Player';
import { Staff } from './Staff';

export interface ClubDetails {
  name: string;
  description: string;
  rising: Date;
  playerList: PlayerDetailsDTO[];
  coachList: Coach[];
  staffList: Staff[];
}
export interface HomeClubDTO {
  clubId: string;
  clubName: string;
  rising: Date;
}
