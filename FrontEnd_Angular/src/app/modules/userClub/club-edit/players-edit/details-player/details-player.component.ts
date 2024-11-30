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
  ngOnInit(): void {
    this.player = { ...this.OldPlayers };
    this.contractFromString =
      this.datePipe.transform(this.OldPlayers.contractFrom, 'yyyy-MM-dd') || '';
    this.contractToString =
      this.datePipe.transform(this.OldPlayers.contractTo, 'yyyy-MM-dd') || '';
  }
  @Input() OldPlayers!: PlayerDetailsDTO;
  @Output() closeEvent = new EventEmitter<void>();
}
