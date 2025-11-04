import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { endOfDay, startOfDay } from 'date-fns';
import { groupBy } from 'lodash';
import { SVB_APP_ROUTES } from 'src/app/ROUTES';
import { SessionState } from '../app/session.state';
import { EventsService } from '../services/events.service';
import type { EventResponse } from '../types/EventDTO';
import type { groupEvent } from './groupEvent';
import { EventCardComponent } from './report-details/sub-components/event-card.component';

/**
 * Component representing the list of games.
 */
@Component({
  selector: 'app-game-list-page',
  standalone: true,
  host: { class: 'w-full' },
  imports: [MatListModule, CommonModule, RouterLink, MatIconModule, TranslocoModule, EventCardComponent],
  template: `
    <div class="max-w-7xl mx-auto w-full p-6">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ 'your-events' | transloco }}</h1>
            <p class="text-gray-600">Verwalten Sie Ihre Volleyball-Events</p>
          </div>

          @if (session()?.user) {
          <a
            [routerLink]="[ROUTES.root, ROUTES.games, ROUTES.create]"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg font-medium"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ 'create-a-new-game' | transloco }}
          </a>
          }
        </div>

        <!-- Stats Summary -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 text-sm font-medium mb-1">Kommende Events</p>
                <p class="text-3xl font-bold">{{ upcomingEvents.upcomming.length || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg p-6 text-white shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-100 text-sm font-medium mb-1">Vergangene Events</p>
                <p class="text-3xl font-bold">{{ upcomingEvents.past.length || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 text-sm font-medium mb-1">Gesamt Events</p>
                <p class="text-3xl font-bold">{{ (upcomingEvents.upcomming.length || 0) + (upcomingEvents.past.length || 0) }}</p>
              </div>
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events Section -->
      <div class="mb-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">{{ 'upcomming-events' | transloco }}</h2>
          <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {{ upcomingEvents.upcomming.length || 0 }}
          </span>
        </div>

        @if (upcomingEvents.upcomming && upcomingEvents.upcomming.length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (item of upcomingEvents.upcomming; track $index) {
          <app-event-card [event]="item" />
          }
        </div>
        } @else {
        <div class="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Keine kommenden Events</h3>
          <p class="text-gray-500 mb-4">Erstellen Sie Ihr erstes Event, um loszulegen!</p>
          @if (session()?.user) {
          <a
            [routerLink]="[ROUTES.root, ROUTES.games, ROUTES.create]"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Event erstellen
          </a>
          }
        </div>
        }
      </div>

      <!-- Divider -->
      <div class="relative mb-10">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-4 bg-gray-50 text-sm text-gray-500 font-medium">Archiv</span>
        </div>
      </div>

      <!-- Past Events Section -->
      <div>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">{{ 'past-events' | transloco }}</h2>
          <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {{ upcomingEvents.past.length || 0 }}
          </span>
        </div>

        @if (upcomingEvents.past && upcomingEvents.past.length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (item of upcomingEvents.past; track $index) {
          <app-event-card [event]="item" />
          }
        </div>
        } @else {
        <div class="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Keine vergangenen Events</h3>
          <p class="text-gray-500">Vergangene Events werden hier angezeigt</p>
        </div>
        }
      </div>
    </div>
  `,
})
export class GamesListPageComponent implements OnInit {
  /**
   * Service to fetch events.
   */
  eventsService = inject(EventsService);
  /**
   * Application routes.
   */
  ROUTES = SVB_APP_ROUTES;
  /**
   * Signal for the current session state.
   */
  session = select(SessionState.session);
  /**
   * Grouped events categorized as upcoming and past.
   */
  upcomingEvents: groupEvent = {
    upcomming: [],
    past: [],
  };
  /**
   * The current date.
   */
  currentDate = new Date();
  /**
   * Observable for the list of events.
   */
  events = this.eventsService.getEvents();
  /**
   * Initializes the component and groups events into upcoming and past categories.
   */
  async ngOnInit() {
    const events = await this.events;
    const grouped = groupBy(events, (event: EventResponse) =>
      endOfDay(new Date(event.date)) > startOfDay(this.currentDate) ? 'upcomming' : 'past'
    ) as groupEvent;

    // Ensure both arrays exist even if empty
    this.upcomingEvents = {
      upcomming: grouped.upcomming || [],
      past: grouped.past || [],
    };
  }
}
