import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoachDTO } from '../../../../../shared/Interfaces/Coach';
import { CoachService } from '../../../../core/Services/API/CoachService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-coach',
  standalone: false,
  templateUrl: './edit-coach.component.html',
  styleUrl: './edit-coach.component.css',
  providers: [DatePipe],
})
export class EditCoachComponent implements OnInit {
  coach!: CoachDTO;
  oldCoach!: CoachDTO;
  contractFromString = '';
  contractToString = '';
  @Input() coachId!: string;
  @Output() closeEvent = new EventEmitter<void>();
  constructor(
    private _coachService: CoachService,
    private datePipe: DatePipe,
  ) {}
  ngOnInit(): void {
    this._coachService.GetCoachById(this.coachId).subscribe({
      next: (respond) => {
        this.oldCoach = respond;
        this.coach = { ...this.oldCoach };
        this.contractFromString =
          this.datePipe.transform(this.oldCoach.contractFrom, 'yyyy-MM-dd') ||
          '';
        this.contractToString =
          this.datePipe.transform(this.oldCoach.contractTo, 'yyyy-MM-dd') || '';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
