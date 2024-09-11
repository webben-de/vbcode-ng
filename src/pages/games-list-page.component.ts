import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-game-list-page',
  standalone: true,
  imports: [MatListModule, CommonModule],
  template: `
    <h2>Your Events</h2>
    <div class="flex flex-col">
      <mat-list>
        @for (item of events|async; track $index) {
        <mat-list-item>{{ item.title }}</mat-list-item>
        }
      </mat-list>
    </div>
  `,
})
export class GamesListPageComponent implements OnInit {
  eventsService = inject(EventsService);
  events = this.eventsService.getEvents();
  ngOnInit(): void {}
}
