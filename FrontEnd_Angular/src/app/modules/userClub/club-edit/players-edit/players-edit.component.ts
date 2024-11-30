import { Component, Input, OnInit } from '@angular/core';
import {
  GetPlayerPosition,
  PlayerDetailsDTO,
} from '../../../../shared/Interfaces/Player';

@Component({
  selector: 'app-players-edit',
  templateUrl: './players-edit.component.html',
  styleUrl: './players-edit.component.css',
  standalone: false,
})
export class PlayersEditComponent {
  addPlayer = false;
  editPlayer = false;
  detailsPlayer = false;
  selectPlayer!: PlayerDetailsDTO;
  @Input() ClubId!: string;
  @Input() players!: PlayerDetailsDTO[];
  GetPlayerPosition(position: number): string {
    return GetPlayerPosition(position);
  }
  GetNewPlayer(player: PlayerDetailsDTO) {
    this.pushAndSortPlayerList(player);
    this.addPlayer = false;
  }
  ShowEdit(player: PlayerDetailsDTO) {
    this.selectPlayer = player;
    this.editPlayer = true;
  }
  GetEditPlayer(player: PlayerDetailsDTO) {
    var oldPlayer = this.players.findIndex((x) => x.id == player.id);
    this.players.splice(oldPlayer, 1);
    this.pushAndSortPlayerList(player);
    this.editPlayer = false;
  }
  private pushAndSortPlayerList(player: PlayerDetailsDTO) {
    this.players.push(player);
    this.players = this.players.sort((a, b) => a.playerNumber - b.playerNumber);
  }
  ShowDetails(player: PlayerDetailsDTO) {
    this.selectPlayer = player;
    this.detailsPlayer = true;
  }
}
