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
  constructor(
    private datePipe: DatePipe,
    private _playerService: PlayerService,
  ) {}
  contractFromString: string = '';
  contractToString: string = '';
  player!: PlayerDetailsDTO;
  ngOnInit(): void {
    this.player = { ...this.OldPlayers };
    this.contractFromString =
      this.datePipe.transform(this.OldPlayers.contractFrom, 'yyyy-MM-dd') || '';
    this.contractToString =
      this.datePipe.transform(this.OldPlayers.contractTo, 'yyyy-MM-dd') || '';
  }
  @Input() OldPlayers!: PlayerDetailsDTO;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() editlayerEvent = new EventEmitter<PlayerDetailsDTO>();
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
