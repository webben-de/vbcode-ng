export interface createEventDTO {
  title: string;
  date: Date;
  attendees: string[];
}
export interface EventDTO extends createEventDTO {
  id: string;
}
