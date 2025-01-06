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
