import { Component, Input } from '@angular/core';
import { Coach } from '../../../../shared/Interfaces/Coach';

@Component({
    selector: 'app-coaches-edit',
    templateUrl: './coaches-edit.component.html',
    styleUrl: './coaches-edit.component.css',
    standalone: false
})
export class CoachesEditComponent {
  @Input() ClubId!: string;
  @Input() coeaches!: Coach[];
}
