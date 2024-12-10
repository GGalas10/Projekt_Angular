import { Component, Input, OnInit } from '@angular/core';
import { Coach } from '../../../../shared/Interfaces/Coach';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.css',
  standalone: false,
})
export class CoachesComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.coaches);
  }
  @Input() coaches!: Coach[];
}
