import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';
import { ClubEditService } from '../../../../core/Services/API/ClubEditServices';

@Component({
    selector: 'app-name-edit',
    templateUrl: './name-edit.component.html',
    styleUrl: './name-edit.component.css',
    standalone: false
})
export class NameEditComponent {
  @Output() closeEmit = new EventEmitter<void>();
  @Output() SaveEmit = new EventEmitter<string>();
  @Input() ClubId!: string;
  newName = '';
  ShowAlert = false;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  closeModal(): void {
    this.closeEmit.emit();
  }
  constructor(private _clubEditService: ClubEditService) {}
  submit() {
    if (this.newName == '') {
      this.ShowAlertFunction('Błąd', 'Uzupełnij pole nowej nazwy');
      return;
    }
    this._clubEditService
      .ClubNameEdit({
        newName: this.newName,
        clubId: this.ClubId,
      })
      .subscribe({
        next: () => {
          this.SaveEmit.emit(this.newName);
        },
        error: (err) => {
          if (err.error.includes('NewClubName_Cannot_Be_Null_Or_Empty')) {
            this.ShowAlertFunction('Błąd', 'Nazwa klubu nie może być pusta');
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
