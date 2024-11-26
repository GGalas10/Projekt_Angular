import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css',
})
export class AddPlayerComponent {
  @Input() clubId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  newPlayerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    contractFrom: new FormControl(new Date()),
    contractTo: new FormControl(new Date()),
    hasInjur: new FormControl(false),
    playedMinute: new FormControl(0),
    yellowCards: new FormControl(0),
    redCards: new FormControl(0),
    goals: new FormControl(0),
    assists: new FormControl(0),
    playedMatches: new FormControl(0),
    playerClubId: new FormControl(this.clubId),
    playerPosition: new FormControl(10),
  });

  closeModal() {
    this.closeEvent.emit();
  }
  setPosition(number: number) {
    this.newPlayerForm.value.playerPosition = number;
  }
}
