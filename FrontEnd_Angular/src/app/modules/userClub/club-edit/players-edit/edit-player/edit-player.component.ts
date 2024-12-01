/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  mapPlayerDetailsToEditPlayerCommand,
  PlayerDetailsDTO,
} from '../../../../../shared/Interfaces/Player';
import { DatePipe } from '@angular/common';
import { PlayerService } from '../../../../core/Services/API/PlayerService';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.css',
  standalone: false,
  providers: [DatePipe],
})
export class EditPlayerComponent implements OnInit {
  contractFromString: string = '';
  contractToString: string = '';
  player!: PlayerDetailsDTO;
  OldPlayers!: PlayerDetailsDTO;
  @Input() playerId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() editlayerEvent = new EventEmitter<PlayerDetailsDTO>();

  constructor(
    private datePipe: DatePipe,
    private _playerService: PlayerService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this._playerService.GetPlayerById(this.playerId).subscribe({
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

  setPosition(number: number) {
    this.player.position = number;
  }
  SendEditRequest() {
    this._playerService
      .EditPlayer(mapPlayerDetailsToEditPlayerCommand(this.player))
      .subscribe({
        next: () => {
          this.editlayerEvent.emit(this.player);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
