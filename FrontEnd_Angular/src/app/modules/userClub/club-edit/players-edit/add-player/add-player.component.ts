import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlayerService } from '../../../../core/Services/API/PlayerService';
import {
  CreatePlayerCommand,
  PlayerDetailsDTO,
} from '../../../../../shared/Interfaces/Player';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css',
  standalone: false,
})
export class AddPlayerComponent {
  showAlert = false;
  baseAlert: BaseAlert = {
    Title: '',
    Message: '',
  };
  constructor(private playerService: PlayerService) {}
  @Input() clubId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() newPlayerEvent = new EventEmitter<PlayerDetailsDTO>();
  newPlayerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    contractFrom: new FormControl(new Date()),
    contractTo: new FormControl(new Date()),
    hasInjury: new FormControl(false),
    playedMinute: new FormControl(0),
    yellowCards: new FormControl(0),
    redCards: new FormControl(0),
    goals: new FormControl(0),
    assists: new FormControl(0),
    playedMatches: new FormControl(0),
    playerPosition: new FormControl(10),
    playerNumber: new FormControl(1),
  });
  get GetControls() {
    return this.newPlayerForm.controls;
  }
  closeModal() {
    this.closeEvent.emit();
  }
  createPlayer() {
    const player = this.getPlayerData();
    this.playerService.AddPlayerToClub(player).subscribe({
      next: (value) => {
        this.newPlayerEvent.emit(this.getPlayerDTO(player, value));
      },
      error: (err) => {
        if (err.error.includes('Cannot_Create_Player_With_Null_Command')) {
          this.ShowAlert('Błąd', 'Dodaj wszystkie pola prawidłowo');
        }
        if (err.error.includes('Cannot_Add_Null_Player')) {
          this.ShowAlert('Błąd', 'Odśwież stronę i spróbuj ponownie później.');
        }
        if (err.error.includes('The_Club_Doesnt_Exist')) {
          this.ShowAlert(
            'Błąd',
            'Coś poszło nie tak, spróbuj ponownie później',
          );
        }
        console.log(err);
      },
    });
  }
  setPosition(number: number) {
    this.newPlayerForm.value.playerPosition = number;
  }
  getPlayerData(): CreatePlayerCommand {
    const formValues = this.newPlayerForm.value;

    return {
      clubId: this.clubId,
      contractFrom: formValues.contractFrom ?? new Date(),
      contractTo: formValues.contractTo ?? new Date(),
      firstName: formValues.firstName ?? '',
      lastName: formValues.lastName ?? '',
      position: formValues.playerPosition ?? 0,
      hasInjury: formValues.hasInjury ?? false,
      playedMinutes: formValues.playedMinute ?? 0,
      yellowCards: formValues.yellowCards ?? 0,
      redCards: formValues.redCards ?? 0,
      goals: formValues.goals ?? 0,
      assists: formValues.assists ?? 0,
      playedMatches: formValues.playedMatches ?? 0,
      playerNumber: formValues.playerNumber ?? 0,
    };
  }
  getPlayerDTO(
    player: CreatePlayerCommand,
    newPlayerId: string,
  ): PlayerDetailsDTO {
    return {
      id: newPlayerId,
      clubName: '',
      firstName: player.firstName,
      lastName: player.lastName,
      contractFrom: player.contractFrom,
      contractTo: player.contractTo,
      hasInjury: player.hasInjury,
      playedMinutes: player.playedMinutes,
      yellowCards: player.yellowCards,
      redCards: player.redCards,
      goals: player.goals,
      assists: player.assists,
      playedMatches: player.playedMatches,
      position: player.position,
      playerNumber: player.playerNumber,
    };
  }
  CloseAlert() {
    this.showAlert = false;
  }
  ShowAlert(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.showAlert = true;
  }
}
