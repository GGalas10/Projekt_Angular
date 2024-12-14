export interface Staff {
  Id: string;
  Status: number;
  CreateAt: Date;
  UpdateAt: Date;
  ContractFrom: Date;
  ContractTo: Date;
  FirstName: string;
  LastName: string;

  JobPosition: string;
  StaffClubId: string;
}
export interface StaffAddCommand {
  ClubId: string;
  ContractFrom: Date;
  ContractTo: Date;
  FirstName: string;
  LastName: string;
  JobPosition: string;
}
