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
  @Input() ClubId!: string;
  @Input() players!: PlayerDetailsDTO[];
  GetPlayerPosition(position: number): string {
    return GetPlayerPosition(position);
  }
}
