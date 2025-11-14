
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SVB_APP_ROUTES } from '../../../app/ROUTES';

@Component({
  selector: 'app-detail-page-back-button',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule],
  template: `
    <div class="flex">
      <button mat-fab class="btn  ">
        <a [routerLink]="[ROUTES.root, ROUTES.report, 'details', eventId]">
          <mat-icon>arrow_back_ios</mat-icon>
        </a>
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class DetailPageBackButtonComponent {
  ROUTES = SVB_APP_ROUTES;
  route = inject(ActivatedRoute);
  eventId = this.route.snapshot.params['id'];
}
