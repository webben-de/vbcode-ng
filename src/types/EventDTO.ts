export interface createEventDTO {
  title: string;
  date: Date;
  attendees: string[];
  opponent: string;
  owner: string;
  visibility: 'Public' | 'Private';
}
export interface EventDTO extends createEventDTO {
  id: string;
}
