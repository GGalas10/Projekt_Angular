/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerDetailsDTO } from '../../../../../shared/Interfaces/Player';
import { DatePipe } from '@angular/common';
import { PlayerService } from '../../../../core/Services/API/PlayerService';

@Component({
  selector: 'app-details-player',
  standalone: false,
  templateUrl: './details-player.component.html',
  styleUrl: './details-player.component.css',
  providers: [DatePipe],
})
export class DetailsPlayerComponent implements OnInit {
  constructor(
    private datePipe: DatePipe,
    private _playerService: PlayerService,
  ) {}
  contractFromString: string = '';
  contractToString: string = '';
  player!: PlayerDetailsDTO;
  OldPlayers!: PlayerDetailsDTO;
  @Input() playerId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  ngOnInit(): void {
    this._playerService.GetPlayerById(this.playerId).subscribe({
      next: (player) => {
        this.OldPlayers = player;
        this.player = { ...this.OldPlayers };
        this.contractFromString =
          this.datePipe.transform(this.OldPlayers.contractFrom, 'yyyy-MM-dd') ||
          '';
        this.contractToString =
          this.datePipe.transform(this.OldPlayers.contractTo, 'yyyy-MM-dd') ||
          '';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
