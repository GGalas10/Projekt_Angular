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
  id: string;
  contractFrom: Date;
  contractTo: Date;
  firstName: string;
  lastName: string;
  whatTrains: string;
}
export interface CoachAddCommand {
  ClubId: string;
  ContractFrom: Date;
  ContractTo: Date;
  FirstName: string;
  LastName: string;
  WhatTrains: string;
}
export interface CoachEditCommand {
  CoachId: string;
  ContractFrom: Date;
  ContractTo: Date;
  FirstName: string;
  LastName: string;
  WhatTrains: string;
}
