import type { TeamDTO } from '../services/teams.service';

export interface createEventDTO {
  attendees: string[];
  date: Date;
  result_home: number;
  result_away: number;
  home_team: string;
  home_team_start_rotation: { [x: number]: string };
  away_team: string;
  away_team_start_rotation: string[];
  owner: string;
  shared_with: string[];
  title: string;
  visibility: 'Public' | 'Private';
}
export interface EventDTO extends createEventDTO {
  id?: string;
}
export interface EventResponse {
  id: string;
  attendees: string[];
  away_team: TeamDTO;
  away_team_start_rotation: string[];
  setpoint_results_home: number | null;
  setpoint_results_away: number | null;
  date: Date;
  home_team: TeamDTO;
  home_team_start_rotation: { [x: number]: string };
  owner: string;
  result_away: number;
  result_home: number;
  shared_with: string[];
  title: string;
  visibility: 'Public' | 'Private';
}
