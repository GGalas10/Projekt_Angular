import { ClubListDTO } from './Club';

export interface ClubStatisticDTO {
  id: string;
  club: ClubListDTO;
  goalsFor: number;
  goalsAganist: number;
  goalsDifferences: number;
  clubAssists: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}
