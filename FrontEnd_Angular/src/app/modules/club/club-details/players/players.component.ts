import { Component, Input } from '@angular/core';
import {
  Player,
  GetPlayerPosition,
  PlayerDetailsDTO,
} from '../../../../shared/Interfaces/Player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
  standalone: false,
})
export class PlayersComponent {
  @Input() players!: PlayerDetailsDTO[];
  playerPosition(position: number): string {
    return GetPlayerPosition(position);
  }
}
