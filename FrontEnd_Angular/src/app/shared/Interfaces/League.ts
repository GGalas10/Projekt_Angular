import { ClubStatisticDTO } from './ClubStatistic';
import { MatchDTO } from './Match';

export interface LeagueDTO {
  id: string;
  name: string;
  maxClubsInLeague: number;
  startAt: Date;
  endAt: Date;
  status: number;
  matches: MatchDTO[];
  clubStatistics: ClubStatisticDTO[];
}
export interface CreateLeagueCommand {
  name: string;
  maxClubsInLeague: number;
  startDate: Date;
  endDate: Date;
}
export interface LeagueListDTO {
  id: string;
  name: string;
  maxClubsInLeague: number;
  startAt: Date;
  endAt: Date;
  status: number;
}
export interface EditLeagueCommand {
  leagueId: string;
  name: string | null;
  maxClubsInLeague: number | null;
  startAt: Date | null;
  endAt: Date | null;
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
