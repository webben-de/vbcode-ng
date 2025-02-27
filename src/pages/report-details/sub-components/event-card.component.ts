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
    <div class="card bg-base-100 shadow-xl w-full">
      <!-- <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure> -->
      <div class="card-body">
        @let item = event();
        <span class="card-title text-primary text-sm truncate" [routerLink]="[ROUTES.root, ROUTES.report, 'details', item.id]">
          {{ item.title }}
          @if(item.date>currentDate){
          <div class="badge badge-secondary">upcomming</div>
          }
          <div class="badge badge-secondary">{{ item.date }}</div>
        </span>
        <div class="badge badge-outline flex justify-between">
          <mat-icon>data_usage</mat-icon>
          {{ actions.length }}
        </div>
        <p>{{ item.home_team.name }} vs {{ item.away_team?.name || 'TBD' }}</p>
        @if (item.result_home && item.result_away) {
        <p class="bg-green">{{ item.result_home }} - {{ item.result_away }}</p>
        }
        <div class="card-actions justify-end">
          @if (item.result_home && item.result_away) {
          <div class="badge badge-outline">{{ 'finished' | transloco }}</div>
          }
          <div class="badge badge-outline">{{ item.visibility }}</div>
          @if (item.owner === session()?.user?.id) {

          <a [routerLink]="[ROUTES.root, ROUTES.editGame, item.id]" class="btn btn-primary btn-xs">
            <mat-icon>edit</mat-icon>
          </a>
          }
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
  actions?: any | number;

  /** Current date */
  currentDate = new Date();

  /** Session state selector */
  session = select(SessionState.session);

  /**
   * OnInit lifecycle hook to fetch actions count for the event
   */
  async ngOnInit() {
    this.actions = (await this.actionService.getActionsCount(this.event().id)).data || 0;
  }
}
