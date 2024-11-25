import { Component, Input } from '@angular/core';
import { Staff } from '../../../../shared/Interfaces/Staff';

@Component({
  selector: 'app-staffs-edit',
  templateUrl: './staffs-edit.component.html',
  styleUrl: './staffs-edit.component.css',
})
export class StaffsEditComponent {
  @Input() ClubId!: string;
  @Input() staffs!: Staff[];
}
