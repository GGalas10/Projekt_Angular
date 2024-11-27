import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';
import { ClubEditService } from '../../../../core/Services/API/ClubEditServices';

@Component({
    selector: 'app-rising-edit',
    templateUrl: './rising-edit.component.html',
    styleUrl: './rising-edit.component.css',
    standalone: false
})
export class RisingEditComponent {
  @Output() closeEmit = new EventEmitter<void>();
  @Output() SaveEmit = new EventEmitter<Date>();
  @Input() ClubId!: string;
  newRising = new Date();
  ShowAlert = false;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  closeModal(): void {
    this.closeEmit.emit();
  }
  constructor(private _clubEditService: ClubEditService) {}
  submit() {
    if (new Date(this.newRising) <= new Date('1500-01-01')) {
      this.ShowAlertFunction(
        'Błąd',
        `Uzupełnij poprawnie pole powstania klubu. Data musi być pomiędzy 01.01.1850, a ${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`,
      );
      return;
    }
    this._clubEditService
      .ClubRisingEdit({
        newRising: this.newRising,
        clubId: this.ClubId,
      })
      .subscribe({
        next: () => {
          this.SaveEmit.emit(this.newRising);
        },
        error: (err) => {
          if (err.error.includes('Rising_Cannot_Be_Greater_Than_Today')) {
            this.ShowAlertFunction(
              'Błąd',
              'Data powstania nie może być większa niż dzisiejsza data',
            );
            return;
          }
          if (err.error.includes('ClubId_Cannot_Be_Empty')) {
            this.ShowAlertFunction(
              'Błąd',
              'Błąd podczas wysyłania formularza. Spróbuj ponownie po odświeżeniu strony',
            );
            return;
          }
          if (err.error.includes('Cannot_Find_Club_In_Database')) {
            this.ShowAlertFunction(
              'Błąd',
              'Błąd bazy danych. Spróbuj ponownie później',
            );
            return;
          }
          this.ShowAlertFunction(
            'Błąd',
            'Coś poszło nie tak. Spróbuj ponownie później',
          );
        },
      });
  }
  ShowAlertFunction(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.ShowAlert = true;
  }
}
