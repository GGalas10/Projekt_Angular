import { ClubListDTO } from './Club';

export interface MatchDTO {
  id: string;
  HomeClub: ClubListDTO;
  AwayClub: ClubListDTO;
  startAt: Date;
  homeClubGoals: number;
  awayClubGoals: number;
  status: number;
}
export interface MatchByIdDTO {
  id: string;
  HomeClub: ClubListDTO;
  AwayClub: ClubListDTO;
  homeClubGoals: number;
  awayClubGoals: number;
  status: number;
}
export interface MatchDTOForWeekList {
  id: string;
  HomeClubName: string;
  AwayClubName: string;
  HomeClubId: string;
  AwayClubId: string;
  StartDate: Date;
}
export function GetMatchStatus(status: number) {
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
