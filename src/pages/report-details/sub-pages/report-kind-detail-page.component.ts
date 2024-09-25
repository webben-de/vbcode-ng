import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { groupBy } from 'lodash';
import { SVB_APP_ROUTES } from '../../../app/ROUTES';
import { kindMap } from '../../../components/kind-options';
import type { ActionDTO } from '../../../types/ActionDTO';
import { ActionKind } from '../../../types/ActionKind';
import { ActionByKindComponent } from '../action-by-kind.component';
import { ActionsByGradeComponent } from '../actions-by-grade.component';
import { ActionsByPlayerComponent } from '../actions-by-player.component';
import { DetailBreadcrumbsComponent } from '../sub-components/detail-breadcrumbs.component';
import { DetailPageBackButtonComponent } from '../sub-components/detail-page-back-button.component';

@Component({
  selector: 'app-report-kind-detail-page',
  standalone: true,
  host: { class: 'flex flex-col gap-4 p-5 relative' },
  imports: [
    CommonModule,
    ActionByKindComponent,
    ActionsByPlayerComponent,
    ActionsByGradeComponent,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    DetailPageBackButtonComponent,
    DetailBreadcrumbsComponent,
  ],
  template: `
    <div class="flex w-full justify-between">
      <app-detail-page-back-button />
      <app-detail-breadcrumbs />
    </div>

    <span class="text-lg">{{ kindMap.get(kind) }}</span>
    <app-actions-by-kind [actions]="actions" />
    <app-actions-by-player [actions]="actions" />
    <app-actions-by-grade [actions]="actions" />
  `,
})
export class ReportKindDetailPageComponent implements OnInit {
  kindMap = kindMap;
  /**
   *
   */
  route = inject(ActivatedRoute);
  ROUTES = SVB_APP_ROUTES;
  /**
   *
   */
  actions: ActionDTO[] = [];
  kind: ActionKind = ActionKind.UNKNOWN;
  /**
   *
   */
  groupedByKind: [string, ActionDTO[]][] = [];
  groupedByPlayer: [string, ActionDTO[]][] = [];
  groupedByGrade: [string, ActionDTO[]][] = [];
  eventId?: string;
  /**
   *
   */
  update() {
    this.groupedByKind = Object.entries(groupBy(this.actions, 'kind'));
  }
  ngOnInit(): void {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    this.actions = this.route.snapshot.data['actions'];
    this.kind = this.route.snapshot.paramMap.get('kind') as ActionKind;
    this.eventId = this.route.snapshot.paramMap.get('id') as string;
    this.update();
  }
}
