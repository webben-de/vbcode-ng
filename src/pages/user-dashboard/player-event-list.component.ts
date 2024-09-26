import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { groupBy } from 'lodash';
import { SessionState } from '../../app/session.state';
import { EventsService } from '../../services/events.service';
import type { EventResponse } from '../../types/EventDTO';
import type { groupEvent } from '../groupEvent';
import { EventCardComponent } from '../report-details/sub-components/event-card.component';

@Component({
  selector: 'app-player-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 my-4">
      <h2 class="text-2xl font-bold mb-4">Meine Spiele</h2>
      <p>Hier werden deine Spiele angezeigt, an denen du teilgenommen hast.</p>
      <ul class="list-disc flex gap-4 max-w-full overflow-scroll">
        @for (item of groupedEventyByTime.past; track $index) {
        <app-event-card [event]="item" />
        }@empty {
        <li>Keine Spiele erfasst</li>
        }
      </ul>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class PlayerEventListComponent implements OnInit {
  eventService = inject(EventsService);
  store = inject(Store);
  session = this.store.select(SessionState.session);
  groupedEventyByTime: groupEvent = {
    upcomming: [],
    past: [],
  };
  events: EventResponse[] = [];
  currentDate: Date = new Date();
  async ngOnInit(): Promise<void> {
    this.session.subscribe(async (s) => {
      this.events = await this.eventService.getEventsOfPlayer();
      this.groupedEventyByTime = groupBy(this.events, (event: EventResponse) => (new Date(event.date) > this.currentDate ? 'upcomming' : 'past')) as groupEvent;
    });
  }
}
