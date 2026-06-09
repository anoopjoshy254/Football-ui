import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballService } from '../../../services/football.service';
import { PollResultDto } from '../../../models/football.models';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.html',
  styleUrls: ['./results.css']
})
export class ResultsComponent implements OnInit {
  results: PollResultDto[] = [];
  errorMessage = '';

  constructor(private footballService: FootballService) {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults() {
    this.footballService.getResults().subscribe({
      next: (data: PollResultDto[]) => this.results = data,
      error: (err: any) => {
        if (err.status === 403) {
          this.errorMessage = 'Results are not yet revealed by the Admin.';
        } else {
          this.errorMessage = 'Failed to load results.';
        }
      }
    });
  }

  getMaxVotes(): number {
    if (this.results.length === 0) return 1;
    return Math.max(...this.results.map(r => r.voteCount));
  }
}
