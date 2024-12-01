/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, Input, OnInit } from '@angular/core';
import {
  GetPlayerPosition,
  PlayerDetailsDTO,
} from '../../../../shared/Interfaces/Player';
import { PlayerService } from '../../../core/Services/API/PlayerService';

@Component({
  selector: 'app-players-edit',
  templateUrl: './players-edit.component.html',
  styleUrl: './players-edit.component.css',
  standalone: false,
})
export class PlayersEditComponent implements OnInit {
  addPlayer = false;
  editPlayer = false;
  detailsPlayer = false;
  selectPlayer!: PlayerDetailsDTO;
  playerList!: PlayerDetailsDTO[];
  @Input() ClubId!: string;

  constructor(private _playerService: PlayerService) {}

  ngOnInit(): void {
    this._playerService.GetAllPlayersFromClub(this.ClubId).subscribe({
      next: (list) => (this.playerList = list),
      error: (err) => {
        console.log(err);
      },
    });
  }

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
    const oldPlayer = this.playerList.findIndex((x) => x.id == player.id);
    this.playerList.splice(oldPlayer, 1);
    this.pushAndSortPlayerList(player);
    this.editPlayer = false;
  }
  private pushAndSortPlayerList(player: PlayerDetailsDTO) {
    this.playerList.push(player);
    this.playerList = this.playerList.sort(
      (a, b) => a.playerNumber - b.playerNumber,
    );
  }
  ShowDetails(player: PlayerDetailsDTO) {
    this.selectPlayer = player;
    this.detailsPlayer = true;
  }
}
