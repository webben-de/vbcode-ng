import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { SVB_APP_ROUTES } from '../../../app/ROUTES';
import { SessionState } from '../../../app/session.state';
import { EventsService } from '../../../services/events.service';
import type { EventResponse } from '../../../types/EventDTO';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, TranslocoModule],
  template: `
    @let item = event();
    <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col h-full">
      <!-- Status Banner -->
      @if(isUpcoming(item.date)) {
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 flex items-center justify-between">
        <span class="text-white text-xs font-semibold uppercase tracking-wide flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Kommend
        </span>
        <span class="text-white text-xs font-medium">{{ item.date | date : 'dd.MM.yyyy' }}</span>
      </div>
      } @else {
      <div class="bg-gradient-to-r from-gray-500 to-gray-600 px-4 py-2 flex items-center justify-between">
        <span class="text-white text-xs font-semibold uppercase tracking-wide flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Vergangen
        </span>
        <span class="text-white text-xs font-medium">{{ item.date | date : 'dd.MM.yyyy' }}</span>
      </div>
      }

      <!-- Card Content -->
      <div class="p-5 flex-1 flex flex-col">
        <!-- Title -->
        <h3
          [routerLink]="[ROUTES.root + ROUTES.report, 'details', item.id]"
          class="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2"
        >
          {{ item.title }}
        </h3>

        <!-- Teams -->
        <div class="mb-4 flex-1">
          <div class="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div class="flex-1 text-center">
              <p class="text-sm font-semibold text-gray-800">{{ item.home_team?.name }}</p>
              @if (item.result_home !== null && item.result_home !== undefined) {
              <p class="text-2xl font-bold text-blue-600 mt-1">{{ item.result_home }}</p>
              }
            </div>

            <div class="px-3">
              <span class="text-gray-400 font-bold text-lg">vs</span>
            </div>

            <div class="flex-1 text-center">
              <p class="text-sm font-semibold text-gray-800">{{ item.away_team?.name || 'TBD' }}</p>
              @if (item.result_away !== null && item.result_away !== undefined) {
              <p class="text-2xl font-bold text-blue-600 mt-1">{{ item.result_away }}</p>
              }
            </div>
          </div>
        </div>

        <!-- Stats & Actions -->
        <div class="space-y-3">
          <!-- Actions Count -->
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Aktionen
            </span>
            <span class="font-semibold text-gray-900">{{ actions || 0 }}</span>
          </div>

          <!-- Badges -->
          <div class="flex items-center gap-2 flex-wrap">
            @if (item.result_home !== null && item.result_home !== undefined && item.result_away !== null && item.result_away !== undefined) {
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ 'finished' | transloco }}
            </span>
            } @if (item.visibility === 'Public') {
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Öffentlich
            </span>
            } @else {
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Privat
            </span>
            }
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 pt-3 border-t border-gray-200">
            <a
              [routerLink]="[ROUTES.root + ROUTES.report, 'details', item.id]"
              class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Details
            </a>

            @if (item.owner === session()?.user?.id) {
            <a
              [routerLink]="[ROUTES.root + ROUTES.editGame, item.id]"
              class="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              title="Bearbeiten"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full' },
})
export class EventCardComponent implements OnInit {
  /** Application routes */
  ROUTES = SVB_APP_ROUTES;

  /** Service to fetch event actions */
  actionService = inject(EventsService);

  /** Event data input */
  event = input<EventResponse>({} as EventResponse);

  /** Number of actions related to the event */
  actions?: number;

  /** Current date */
  currentDate = new Date();

  /** Session state selector */
  session = select(SessionState.session);

  /**
   * Check if the event date is in the future
   */
  isUpcoming(eventDate: string | Date): boolean {
    const dateToCompare = typeof eventDate === 'string' ? new Date(eventDate) : eventDate;
    return dateToCompare > this.currentDate;
  }

  /**
   * OnInit lifecycle hook to fetch actions count for the event
   */
  async ngOnInit() {
    const result = await this.actionService.getActionsCount(this.event().id);
    this.actions = result.count || 0;
  }
}
