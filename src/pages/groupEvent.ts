import type { EventResponse } from '../types/EventDTO';

export type groupEvent = {
  upcomming: EventResponse[];
  past: EventResponse[];
};
