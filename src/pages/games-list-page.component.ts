import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { EventsService } from '../services/events.service';
import { ROUTES } from '../app/app.routes';

@Component({
  selector: 'app-game-list-page',
  standalone: true,
  imports: [MatListModule, CommonModule, RouterLink, MatIconModule],
  template: `
    <h2>Your Events</h2>
    <div class="flex flex-col">
      <mat-list>
        @for (item of events|async; track $index) {
        <mat-list-item>
          <h6 matListItemTitle [routerLink]="['/report', 'details', item.id]" class="text-sm">{{ item.title }}</h6>
          <p matListItemLine class="flex justify-evenly w-full">
            @if(item.attendees){
            <span>{{ item.attendees.length }} <mat-icon>people</mat-icon></span>
            } @if(item.visibility==="Public"){
            <mat-icon>public</mat-icon>
            }@else if(item.visibility === "Private"){
            <mat-icon>lock</mat-icon>
            }
          </p>
          <a mat-icon-button [routerLink]="['/edit-game', item.id]"><mat-icon>edit</mat-icon></a>
        </mat-list-item>
        }
        <mat-list-item>
          <button mat-flat-button [routerLink]="['/games', 'create']">Create a new Game</button>
        </mat-list-item>
      </mat-list>
    </div>
  `,
})
export class GamesListPageComponent {
  eventsService = inject(EventsService);
  events = this.eventsService.getEvents();
  ROUTES = ROUTES;
}
