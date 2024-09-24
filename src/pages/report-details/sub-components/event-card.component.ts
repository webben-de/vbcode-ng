import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { SVB_APP_ROUTES } from '../../../app/ROUTES';
import { SessionState } from '../../../app/session.state';
import type { EventResponse } from '../../../types/EventDTO';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, TranslocoModule],
  template: `
    <div class="card bg-base-100 w-96 shadow-xl">
      <!-- <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure> -->
      <div class="card-body">
        @let item = event();
        <span class="card-title text-sm truncate" [routerLink]="[ROUTES.root, ROUTES.report, 'details', item.id]">
          {{ item.title }}
          @if(item.date>currentDate){
          <div class="badge badge-secondary">upcomming</div>
          }
          <div class="badge badge-secondary">{{ item.date }}</div>
        </span>
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
  styles: `
    :host {
      display: block;
    }
  `,
})
export class EventCardComponent {
  ROUTES = SVB_APP_ROUTES;

  event = input.required<EventResponse>();
  currentDate = new Date();
  session = select(SessionState.session);
}
