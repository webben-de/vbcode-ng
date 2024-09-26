import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { groupBy } from 'lodash';
import { SVB_APP_ROUTES } from 'src/app/ROUTES';
import { SessionState } from '../app/session.state';
import { EventsService } from '../services/events.service';
import type { EventResponse } from '../types/EventDTO';
import type { groupEvent } from './groupEvent';
import { EventCardComponent } from './report-details/sub-components/event-card.component';

@Component({
  selector: 'app-game-list-page',
  standalone: true,
  host: { class: 'flex flex-col p-5' },
  imports: [MatListModule, CommonModule, RouterLink, MatIconModule, TranslocoModule, EventCardComponent],
  template: `
    <span class="text-2xl font-bold">{{ 'your-events' | transloco }}</span>
    <div class="flex flex-col  gap-4">
      <div class="text-lg">{{ 'upcomming-events' | transloco }}</div>
      <div class="flex md:flex-row gap-4">
        @for (item of this.upcomingEvents.upcomming; track $index) {
        <app-event-card [event]="item" />
        }
      </div>
      <hr />
      <div class="text-lg">{{ 'past-events' | transloco }}</div>
      <div class="flex md:flex-row gap-4">
        @for (item of this.upcomingEvents.past; track $index) {
        <app-event-card [event]="item" />
        }
      </div>
      @if (session()?.user) {

      <a [routerLink]="[ROUTES.root, ROUTES.games, ROUTES.create]" class="btn btn-secondary">
        {{ 'create-a-new-game' | transloco }}
      </a>
      }
    </div>
  `,
})
export class GamesListPageComponent implements OnInit {
  upcomingEvents: groupEvent = {
    upcomming: [],
    past: [],
  };
  session = select(SessionState.session);
  currentDate = new Date();
  eventsService = inject(EventsService);
  events = this.eventsService.getEvents();

  ROUTES = SVB_APP_ROUTES;
  async ngOnInit() {
    const events = await this.events;
    this.upcomingEvents = groupBy(events, (event: EventResponse) => (new Date(event.date) > this.currentDate ? 'upcomming' : 'past')) as groupEvent;
  }
}
