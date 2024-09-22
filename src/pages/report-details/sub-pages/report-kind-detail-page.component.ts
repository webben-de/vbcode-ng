import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { groupBy, sortBy } from 'lodash';
import { gradePrios } from '../../../components/grade-options';
import { kindMap } from '../../../components/kind-options';
import type { ActionDTO } from '../../../types/ActionDTO';
import { ActionKind } from '../../../types/ActionKind';
import { ActionByKindComponent } from '../action-by-kind.component';
import { ActionsByGradeComponent } from '../actions-by-grade.component';
import { ActionsByPlayerComponent } from '../actions-by-player.component';

@Component({
  selector: 'app-report-kind-detail-page',
  standalone: true,
  host: { class: 'flex flex-col gap-4 p-5 relative' },
  imports: [CommonModule, ActionByKindComponent, ActionsByPlayerComponent, ActionsByGradeComponent, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <div class="flex">
      <button mat-fab class="btn fixed bottom-2 left-1">
        <a [routerLink]="['..', '..', '..']">
          <mat-icon>arrow_back_ios</mat-icon>
        </a>
      </button>
    </div>
    <span class="text-lg">{{ kindMap.get(kind) }}</span>
    <app-action-by-kind [actions]="actions" [groupedByKind]="groupedByKind" />
    <app-actions-by-player [actions]="actions" />
    <app-actions-by-grade [actions]="actions" />
  `,
  styles: `
    :host {
      display: flex;
    }
  `,
})
export class ReportKindDetailPageComponent implements OnInit {
  kindMap = kindMap;
  /**
   *
   */
  route = inject(ActivatedRoute);
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
    this.update();
  }
}
