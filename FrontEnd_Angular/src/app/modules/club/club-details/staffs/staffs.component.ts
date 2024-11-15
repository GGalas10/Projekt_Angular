import { Component, Input } from '@angular/core';
import { Staff } from '../../../../shared/Interfaces/Staff';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.css',
})
export class StaffsComponent {
  @Input() staffs!: Staff[];
}
