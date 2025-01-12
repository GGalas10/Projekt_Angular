import { ClubStatisticDTO } from './ClubStatistic';
import { MatchDTO } from './Match';

export interface LeagueDTO {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: number;
  matches: MatchDTO[];
  clubs: ClubStatisticDTO[];
}
export interface CreateLeagueCommand {
  name: string;
  startDate: Date;
  endDate: Date;
}
export interface LeagueListDTO {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: number;
}
export function GetStatusName(status: number) {
  switch (status) {
    case 0:
      return 'Aktywny sezon';
    case 1:
      return 'Przed ligą';
    case 2:
      return 'Po lidze';
    default:
      return 'Brak statusu';
  }
}
