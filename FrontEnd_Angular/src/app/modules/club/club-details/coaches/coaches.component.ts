import { Component, Input } from '@angular/core';
import { Coach } from '../../../../shared/Interfaces/Coach';

@Component({
    selector: 'app-coaches',
    templateUrl: './coaches.component.html',
    styleUrl: './coaches.component.css',
    standalone: false
})
export class CoachesComponent {
  @Input() coaches!: Coach[];
}
