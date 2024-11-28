import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlayerService } from '../../../../core/Services/API/PlayerService';
import { CreateCommand } from '../../../../../shared/Interfaces/Player';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css',
  standalone: false,
})
export class AddPlayerComponent {
  constructor(private playerService: PlayerService) {}
  @Input() clubId!: string;
  @Output() closeEvent = new EventEmitter<void>();
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
    console.log(this.getPlayerData());
    this.playerService.AddPlayerToClub(this.getPlayerData()).subscribe({
      next: () => {
        console.log('Tak!!!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  setPosition(number: number) {
    this.newPlayerForm.value.playerPosition = number;
  }
  getPlayerData(): CreateCommand {
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
}
