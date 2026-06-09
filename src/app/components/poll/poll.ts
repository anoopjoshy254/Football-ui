import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballService } from '../../services/football.service';
import { TeamResponseDto } from '../../models/football.models';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poll.html',
  styleUrls: ['./poll.css']
})
export class PollComponent implements OnInit {
  teams: TeamResponseDto[] = [];
  errorMessage = '';
  successMessage = '';

  constructor(private footballService: FootballService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.footballService.getTeams().subscribe({
      next: (data: TeamResponseDto[]) => this.teams = data,
      error: (err: any) => this.errorMessage = 'Failed to load teams.'
    });
  }

  vote(teamId: string) {
    this.errorMessage = '';
    this.successMessage = '';
    this.footballService.submitPoll({ teamId }).subscribe({
      next: (res: any) => this.successMessage = res.message || 'Vote submitted successfully!',
      error: (err: any) => this.errorMessage = err.error?.message || 'Failed to submit vote.'
    });
  }
}
