import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClubEditService } from '../../../../core/Services/API/ClubEditService';
import { BaseAlert } from '../../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-description-edit',
  templateUrl: './description-edit.component.html',
  styleUrl: './description-edit.component.css',
  standalone: false,
})
export class DescriptionEditComponent {
  newDescirption = '';
  @Input() ClubId!: string;
  @Output() closeEmit = new EventEmitter<void>();
  @Output() SaveEmit = new EventEmitter<string>();
  ShowAlert = false;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  closeModal(): void {
    this.closeEmit.emit();
  }
  constructor(private _clubEditService: ClubEditService) {}
  submit() {
    if (this.newDescirption == '') {
      this.ShowAlertFunction('Błąd', 'Uzupełnij pole nowego opisu');
      return;
    }
    this._clubEditService
      .ClubDescriptionEdit({
        newDescription: this.newDescirption,
        clubId: this.ClubId,
      })
      .subscribe({
        next: () => {
          this.SaveEmit.emit(this.newDescirption);
        },
        error: (err) => {
          if (
            err.error.includes('NewClubDescription_Cannot_Be_Null_Or_Empty')
          ) {
            this.ShowAlertFunction('Błąd', 'Opis klubu nie może być pusty');
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
