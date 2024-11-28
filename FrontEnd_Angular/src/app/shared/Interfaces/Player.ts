export interface Player {
  Id: string;
  Status: number;
  CreateAt: Date;
  UpdateAt: Date;
  ContractFrom: Date;
  ContractTo: Date;
  FirstName: string;
  LastName: string;

  position: number;
  hasInjury: boolean;
  PlayedMinutes: number;
  YellowCards: number;
  RedCards: number;
  Goals: number;
  Assists: number;
  PlayedMatches: number;
  PlayerClubId: string;
  PlayerNumber: number;
}
export interface PlayerDetailsDTO {
  firstName: string;
  lastName: string;
  contractFrom: Date;
  contractTo: Date;
  clubName: string;
  hasInjury: boolean;
  playedMinutes: number;
  yellowCards: number;
  redCards: number;
  goals: number;
  assists: number;
  playedMatches: number;
  position: number;
  playerNumber: number;
}
export interface CreateCommand {
  clubId: string;
  contractFrom: Date;
  contractTo: Date;
  firstName: string;
  lastName: string;

  position: number;
  hasInjury: boolean;
  playedMinutes: number;
  yellowCards: number;
  redCards: number;
  goals: number;
  assists: number;
  playedMatches: number;
  playerNumber: number;
}
export function GetPlayerPosition(position: number): string {
  switch (position) {
    case 0:
      return 'Bramkarz';
    case 1:
      return 'Środkowy obrońca';
    case 2:
      return 'Prawy obrońca';
    case 3:
      return 'Lewy obrońca';
    case 4:
      return 'Środkowy pomocnik';
    case 5:
      return 'Prawy pomocnik';
    case 6:
      return 'Lewy pomocnik';
    case 7:
      return 'Środkowy napastnik';
    case 8:
      return 'Prawy napastnik';
    case 9:
      return 'Lewy napastnik';
    default:
      return 'Nieustalona';
  }
}
