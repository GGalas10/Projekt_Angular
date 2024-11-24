import { Component, Input } from '@angular/core';
import { ClubDetails } from '../../../../shared/Interfaces/Club';

@Component({
  selector: 'app-primary-date',
  templateUrl: './primary-date.component.html',
  styleUrl: './primary-date.component.css',
})
export class PrimaryDateComponent {
  nameEdit = false;
  descEdit = false;
  risingEdit = false;

  @Input() club!: ClubDetails;
}
