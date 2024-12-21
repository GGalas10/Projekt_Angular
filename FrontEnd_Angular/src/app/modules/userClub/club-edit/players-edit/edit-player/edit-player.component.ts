import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  mapPlayerDetailsToEditPlayerCommand,
  PlayerDetailsDTO,
} from '../../../../../shared/Interfaces/Player';
import { DatePipe } from '@angular/common';
import { PlayerService } from '../../../../core/Services/API/PlayerService';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.css',
  standalone: false,
  providers: [DatePipe],
})
export class EditPlayerComponent implements OnInit {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  contractFromString = '';
  contractToString = '';
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
        if (err.error.includes('Cannot_Edit_Player_With_Null_Command')) {
          this.ShowAlert('Błąd', 'Dodaj wszystkie pola prawidłowo');
        }
        if (err.error.includes('Cannot_Edit_Null_Player')) {
          this.ShowAlert('Błąd', 'Odśwież stronę i spróbuj ponownie później.');
        }
        if (err.error.includes('Player_Doesnt_Exist')) {
          this.ShowAlert(
            'Błąd',
            'Coś poszło nie tak, spróbuj ponownie później',
          );
        }
        this.ShowAlert(
          'Coś poszło nie tak',
          'Odśwież stronę i spróbuj ponownie',
        );
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
