import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { ROUTES } from 'src/app/ROUTES';
import { SessionState } from '../app/session.state';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-game-list-page',
  standalone: true,
  host: { class: 'flex flex-col p-5' },
  imports: [MatListModule, CommonModule, RouterLink, MatIconModule, TranslocoModule],
  template: `
    <span class="text-2xl font-bold">Your Events</span>
    <div class="flex flex-col items-center gap-4">
      @for (item of events|async; track $index) {

      <div class="card bg-base-100 w-96 shadow-xl">
        <!-- <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure> -->
        <div class="card-body">
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
            <div class="badge badge-outline">{{ item.visibility }}</div>
            @if (item.owner === session()?.user?.id) {

            <a [routerLink]="[ROUTES.root, ROUTES.editGame, item.id]" class="btn btn-primary btn-xs">
              <mat-icon>edit</mat-icon>
            </a>
            }
          </div>
        </div>
      </div>
      } @if (session()?.user) {
      <a [routerLink]="[ROUTES.root, ROUTES.games, ROUTES.create]" class="btn btn-secondary">
        {{ 'create-a-new-game' | transloco }}
      </a>
      }
    </div>
  `,
})
export class GamesListPageComponent {
  session = select(SessionState.session);
  currentDate = new Date();
  eventsService = inject(EventsService);
  events = this.eventsService.getEvents();
  ROUTES = ROUTES;
}
