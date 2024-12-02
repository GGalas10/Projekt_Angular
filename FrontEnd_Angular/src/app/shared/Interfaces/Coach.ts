export interface Coach {
  Id: string;
  Status: number;
  CreateAt: Date;
  UpdateAt: Date;
  ContractFrom: Date;
  ContractTo: Date;
  FirstName: string;
  LastName: string;

  WhatTrains: string;
  CoachClubId: string;
}
export interface CoachDTO {
  Id: string;
  ContractFrom: Date;
  ContractTo: Date;
  FirstName: string;
  LastName: string;
  WhatTrains: string;
}
