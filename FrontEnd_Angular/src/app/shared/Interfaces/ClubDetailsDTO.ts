import { Coach } from "./Coach";
import { Player } from "./Player";
import { Staff } from "./Staff";

export interface ClubDetails{
    name:string;
    description:string;
    rising:Date;
    playerList:Player[];
    coachList:Coach[];
    staffList:Staff[];
}