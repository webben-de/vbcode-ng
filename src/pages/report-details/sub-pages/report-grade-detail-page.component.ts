import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SVB_APP_ROUTES } from '../../../app/ROUTES';
import { gradDescriptionMap } from '../../../components/grade-options';
import { kindMap } from '../../../components/kind-options';
import { EventsService } from '../../../services/events.service';
import type { ActionDTO } from '../../../types/ActionDTO';
import { ActionByKindComponent } from '../action-by-kind.component';
import { ActionsByPlayerComponent } from '../actions-by-player.component';
import { DetailBreadcrumbsComponent } from '../sub-components/detail-breadcrumbs.component';
import { DetailPageBackButtonComponent } from '../sub-components/detail-page-back-button.component';

@Component({
  selector: 'app-report-grade-detail-page',
  host: { class: 'flex flex-col gap-4 p-5 relative' },
  standalone: true,
  imports: [
    CommonModule,
    ActionsByPlayerComponent,
    ActionByKindComponent,
    RouterModule,
    MatIconModule,
    TranslocoModule,
    MatButtonModule,
    DetailPageBackButtonComponent,
    DetailBreadcrumbsComponent,
  ],
  template: `
    <div class="flex w-full justify-between">
      <app-detail-page-back-button />
      <app-detail-breadcrumbs />
    </div>
    <div class="flex flex-col gap-4 p-5 relative">
      <span class="text-lg">{{ 'filtered-after-grade' | transloco }}: {{ grade }} - {{ gradDescriptionMap.get(grade) }}</span>
      <app-actions-by-player [actions]="actions" />
      <app-actions-by-kind [actions]="actions" />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ReportGradeDetailPageComponent {
  route = inject(ActivatedRoute);
  eventsService = inject(EventsService);
  ROUTES = SVB_APP_ROUTES;
  actions = this.route.snapshot.data['actions'] as ActionDTO[];
  eventId = this.route.snapshot.params['id'];
  grade = this.route.snapshot.params['grade'];
  kind = this.route.snapshot.params['kind'];
  gradDescriptionMap = gradDescriptionMap;
  kindMap = kindMap;
  event = this.eventsService.getEvent(this.eventId);
}
