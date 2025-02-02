import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../core/Services/API/MatchService';
import { MatchDTOForWeekList } from '../../../shared/Interfaces/Match';

@Component({
  selector: 'app-index',
  standalone: false,

  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  matches!: MatchDTOForWeekList[];
  constructor(private matchService: MatchService) {}
  ngOnInit(): void {
    this.matchService.GetNextWeekMatches().subscribe({
      next: (result) => {
        this.matches = result;
      },
      error: (err) => console.log(err),
    });
  }
}
