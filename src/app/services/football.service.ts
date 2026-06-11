import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTeamDto, PollResultDto, SubmitPollDto, TeamResponseDto, VoteDetailDto } from '../models/football.models';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private userApiUrl = '/api/user';
  private adminApiUrl = '/api/admin';

  constructor(private http: HttpClient) {}

  // User Endpoints
  getTeams(): Observable<TeamResponseDto[]> {
    return this.http.get<TeamResponseDto[]>(`${this.userApiUrl}/teams`);
  }

  submitPoll(request: SubmitPollDto): Observable<any> {
    return this.http.post(`${this.userApiUrl}/poll`, request);
  }

  getResults(): Observable<PollResultDto[]> {
    return this.http.get<PollResultDto[]>(`${this.userApiUrl}/results`);
  }

  // Admin Endpoints
  addTeam(request: CreateTeamDto): Observable<TeamResponseDto> {
    return this.http.post<TeamResponseDto>(`${this.adminApiUrl}/teams`, request);
  }

  revealResults(): Observable<any> {
    return this.http.post(`${this.adminApiUrl}/reveal-results`, {});
  }

  resetPoll(): Observable<any> {
    return this.http.post(`${this.adminApiUrl}/reset-poll`, {});
  }

  getVoteDetails(): Observable<VoteDetailDto[]> {
    return this.http.get<VoteDetailDto[]>(`${this.adminApiUrl}/votes`);
  }

  getAdminResults(): Observable<PollResultDto[]> {
    return this.http.get<PollResultDto[]>(`${this.adminApiUrl}/results`);
  }
}
