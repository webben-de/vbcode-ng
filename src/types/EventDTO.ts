export interface createEventDTO {
  attendees: string[];
  date: Date;
  home_team: string;
  away_team: string;
  owner: string;
  shared_with: string[];
  title: string;
  visibility: 'Public' | 'Private';
}
export interface EventDTO extends createEventDTO {
  id?: string;
}
