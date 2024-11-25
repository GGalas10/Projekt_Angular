import { Component, Input } from '@angular/core';
import { Player } from '../../../../shared/Interfaces/Player';

@Component({
  selector: 'app-players-edit',
  templateUrl: './players-edit.component.html',
  styleUrl: './players-edit.component.css',
})
export class PlayersEditComponent {
  @Input() ClubId!: string;
  @Input() players!: Player[];
}
