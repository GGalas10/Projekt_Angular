import { Component, Input } from '@angular/core';
import {
  Player,
  GetPlayerPosition,
} from '../../../../shared/Interfaces/Player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
})
export class PlayersComponent {
  @Input() players!: Player[];
  playerPosition(position: number): string {
    return GetPlayerPosition(position);
  }
}
