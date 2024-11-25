import { Component, Input } from '@angular/core';
import { ClubDetails } from '../../../../shared/Interfaces/Club';
import { BaseAlert } from '../../../../shared/Component/base-alert/BaseAlertInterface';

@Component({
  selector: 'app-primary-date',
  templateUrl: './primary-date.component.html',
  styleUrl: './primary-date.component.css',
})
export class PrimaryDateComponent {
  ShowAlert = false;
  baseAlert: BaseAlert = { Title: '', Message: '' };
  nameEdit = false;
  descEdit = false;
  risingEdit = false;
  @Input() clubId!: string;
  @Input() club!: ClubDetails;

  getNewClubDescription(newDesc: string) {
    this.ShowAlertFunction('Udało się!', 'Zmiana opisu klubu powiodła się');
    this.club.description = newDesc;
    this.descEdit = false;
  }

  getNewClubName(newName: string) {
    this.ShowAlertFunction('Udało się!', 'Zmiana nazwy klubu powiodła się');
    this.club.name = newName;
    this.nameEdit = false;
  }

  getNewClubRising(rising: Date) {
    this.ShowAlertFunction('Udało się!', 'Zmiana powstania klubu powiodła się');
    this.club.rising = rising;
    this.risingEdit = false;
  }

  ShowAlertFunction(title: string, message: string) {
    this.baseAlert.Title = title;
    this.baseAlert.Message = message;
    this.ShowAlert = true;
  }
}
