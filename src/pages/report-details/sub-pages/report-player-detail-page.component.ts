
import { Component, type OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { kindMap } from '../../../components/kind-options';
import type { ActionDTO } from '../../../types/ActionDTO';
import { ActionByKindComponent } from '../action-by-kind.component';
import { ActionsByGradeComponent } from '../actions-by-grade.component';
import { DetailBreadcrumbsComponent } from '../sub-components/detail-breadcrumbs.component';
import { DetailPageBackButtonComponent } from '../sub-components/detail-page-back-button.component';

@Component({
  host: { class: 'flex flex-col gap-4 p-5 relative' },
  selector: 'app-report-player-detail-page',
  standalone: true,
  imports: [
    ActionsByGradeComponent,
    RouterModule,
    MatIconModule,
    DetailPageBackButtonComponent,
    TranslocoModule,
    ActionByKindComponent,
    DetailBreadcrumbsComponent
],
  template: `
    <div class="flex w-full justify-between">
      <app-detail-page-back-button />
      <app-detail-breadcrumbs />
    </div>
    <br />
    <p class="flex gap-2">
      @if (kind) {
      <span>{{ 'filtered-type' | transloco }}: {{ kindMap.get(kind) }}</span>
      } @if(player){
      <span>{{ 'from' | transloco }} {{ player.name }}</span>
      }
    </p>
    <app-actions-by-grade [actions]="actions" />
    <app-actions-by-kind [actions]="actions" />
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ReportPlayerDetailPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  actions: ActionDTO[] = [];
  player = this.route.snapshot.data['player'];
  kind = this.route.snapshot.params['kind'];
  kindMap = kindMap;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.actions = this.route.snapshot.data['actions'] as ActionDTO[];
  }
}
