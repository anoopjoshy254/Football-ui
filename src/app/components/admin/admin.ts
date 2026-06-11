import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FootballService } from '../../services/football.service';
import { SignalrService } from '../../services/signalr.service';
import { PollResultDto, VoteDetailDto } from '../../models/football.models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  teamName = '';
  countryCode = '';
  errorMessage = '';
  successMessage = '';
  
  voteDetails: VoteDetailDto[] = [];
  pollResults: PollResultDto[] = [];

  constructor(
    private footballService: FootballService,
    private signalrService: SignalrService
  ) {}

  ngOnInit() {
    this.loadData();
    this.signalrService.startConnection();
    this.signalrService.addPollUpdateListener();
    this.signalrService.pollUpdateReceived$.subscribe(() => {
      // Reload data whenever a poll update event is received from SignalR
      this.loadData();
    });
  }

  loadData() {
    this.footballService.getVoteDetails().subscribe({
      next: (data) => this.voteDetails = data,
      error: (err: any) => console.error('Failed to load vote details', err)
    });
    this.footballService.getAdminResults().subscribe({
      next: (data) => this.pollResults = data,
      error: (err: any) => console.error('Failed to load poll results', err)
    });
  }

  addTeam() {
    this.errorMessage = '';
    this.successMessage = '';
    this.footballService.addTeam({ name: this.teamName, countryCode: this.countryCode }).subscribe({
      next: () => {
        this.successMessage = 'Team added successfully!';
        this.teamName = '';
        this.countryCode = '';
      },
      error: (err: any) => this.errorMessage = err.error?.message || 'Failed to add team.'
    });
  }

  revealResults() {
    this.errorMessage = '';
    this.successMessage = '';
    this.footballService.revealResults().subscribe({
      next: () => this.successMessage = 'Results revealed successfully!',
      error: (err: any) => this.errorMessage = err.error?.message || 'Failed to reveal results.'
    });
  }

  resetPoll() {
    if (confirm('Are you sure you want to reset the poll? All votes will be lost.')) {
      this.errorMessage = '';
      this.successMessage = '';
      this.footballService.resetPoll().subscribe({
        next: () => this.successMessage = 'Poll reset successfully!',
        error: (err: any) => this.errorMessage = err.error?.message || 'Failed to reset poll.'
      });
    }
  }
}
