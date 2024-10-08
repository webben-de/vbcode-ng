import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SVB_APP_ROUTES } from '../app/ROUTES';

@Component({
  selector: 'app-buttom-nav',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  template: `
    <div class="btm-nav z-20">
      <button class="text-primary" [routerLink]="[ROUTES.root + ROUTES.report]" [routerLinkActive]="'active'">
        <mat-icon>leaderboard</mat-icon>
      </button>
      <button class="text-primary" [routerLink]="[ROUTES.root + ROUTES.dataentry]" [routerLinkActive]="'active'">
        <mat-icon>note_add</mat-icon>
      </button>
      <button class="text-primary" [routerLink]="[ROUTES.root, ROUTES.games, ROUTES.create]" [routerLinkActive]="'active'">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </button>
    </div>
  `,
})
export class ButtomNavComponent {
  ROUTES = SVB_APP_ROUTES;
}
