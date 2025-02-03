import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../core/Services/API/MatchService';
import { ActivatedRoute } from '@angular/router';
import { MatchByIdDTO } from '../../../shared/Interfaces/Match';

@Component({
  selector: 'app-details',
  standalone: false,

  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  match!: MatchByIdDTO;
  matchId!: string;
  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (result) => {
        this.matchId = result.get('matchId') ?? '';
        this.matchService.GetMatchById(this.matchId).subscribe({
          next: (result) => (this.match = result),
        });
      },
    });
  }
}
