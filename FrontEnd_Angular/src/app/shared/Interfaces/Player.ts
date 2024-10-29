export interface Player{
    Id:string;
    Status:number;
    CreateAt:Date;
    UpdateAt:Date;
    ContractFrom:Date;
    ContractTo:Date;
    FirstName:string;
    LastName:string;

    position:number;
    hasInjury:boolean;
    PlayedMinutes:number;
    YellowCards:number;
    RedCards:number;
    Goals:number;
    Assists:number;
    PlayedMatches:number;
    CoachClubId:string;
}