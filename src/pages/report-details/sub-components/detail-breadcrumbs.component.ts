import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SVB_APP_ROUTES } from '../../../app/ROUTES';
import { gradDescriptionMap } from '../../../components/grade-options';
import { kindMap } from '../../../components/kind-options';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-detail-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoModule],
  template: `
    <div class="breadcrumbs text-sm">
      <ul>
        <li>
          <a [routerLink]="[ROUTES.root, ROUTES.report, 'details', eventId]">{{ (event | async)?.title }}</a>
        </li>
        @if (kind) {
        <li>
          <a [routerLink]="[ROUTES.root, ROUTES.report, 'details', eventId, 'kinds', grade]">{{ 'kind' | transloco }} {{ kindMap.get(kind) }} </a>
        </li>
        }
        <li>
          <a [routerLink]="[ROUTES.root, ROUTES.report, 'details', eventId, 'grade', grade]">{{ 'grade' | transloco }} {{ grade }} </a>
        </li>
      </ul>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class DetailBreadcrumbsComponent {
  route = inject(ActivatedRoute);
  eventService = inject(EventsService);
  ROUTES = SVB_APP_ROUTES;
  kindMap = kindMap;
  gradDescriptionMap = gradDescriptionMap;
  grade = this.route.snapshot.params['grade'];
  kind = this.route.snapshot.params['kind'];
  readonly eventId = this.route.snapshot.params['id'];

  event = this.eventService.getEvent(this.eventId);
}
