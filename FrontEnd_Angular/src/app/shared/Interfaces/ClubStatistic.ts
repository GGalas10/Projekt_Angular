export interface ClubStatisticDTO {
  id: string;
  clubId: string;
  clubName: string;
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
