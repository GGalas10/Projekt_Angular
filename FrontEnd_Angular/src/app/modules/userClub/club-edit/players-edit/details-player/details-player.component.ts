import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PlayerDetailsDTO } from '../../../../../shared/Interfaces/Player';
import { DatePipe } from '@angular/common';
import { PlayerService } from '../../../../core/Services/API/PlayerService';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-details-player',
  standalone: false,
  templateUrl: './details-player.component.html',
  styleUrl: './details-player.component.css',
  providers: [DatePipe],
})
export class DetailsPlayerComponent implements OnInit {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  constructor(
    private datePipe: DatePipe,
    private _playerService: PlayerService,
  ) {}
  contractFromString = '';
  contractToString = '';
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
        if (err.error.includes('PlayerId_Cannot_Be_Empty')) {
          this.ShowAlert('Błąd', 'Odśwież stronę i spróbuj ponownie');
        }
        if (err.error.includes('Cannot_Find_Player_GetPlayerDetails')) {
          this.ShowAlert(
            'Błąd',
            'Coś poszło nie tak. Spróbuj ponownie później',
          );
        }
        this.ShowAlert(
          'Błąd aplikacji',
          'Spróbuj ponownie później. Jeśli nadal problem będzie występował napisz do administratora',
        );
      },
    });
  }
  CloseAlert() {
    this.showAlert = false;
  }
  ShowAlert(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.showAlert = true;
  }
  @HostListener('document:keydown.escape', ['$event'])
  onEscKeydown(): void {
    this.closeEvent.emit();
  }
}
