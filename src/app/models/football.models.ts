export interface TeamResponseDto {
  id: string;
  name: string;
  countryCode: string;
}

export interface CreateTeamDto {
  name: string;
  countryCode: string;
}

export interface SubmitPollDto {
  teamId: string;
}

export interface PollResultDto {
  teamName: string;
  voteCount: number;
}

export interface VoteDetailDto {
  userName: string;
  teamName: string;
  votedAt: string;
}
