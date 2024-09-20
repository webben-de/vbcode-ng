import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NgxEchartsDirective } from 'ngx-echarts';
import { kindMap } from '../../components/kind-options';
import type { ActionDTO } from '../../types/ActionDTO';

@Component({
  selector: 'app-action-by-kind',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterModule, NgxEchartsDirective],
  template: `
    <section>
      <h6>{{ 'after-actions' | transloco }}</h6>
      <div class="stats shadow flex flex-wrap">
        @for (stat of groupedByKind(); track $index) {
        <a class="stat w-1/2" [routerLink]="['kind', stat[0]]">
          <div class="stat-figure text-primary"></div>
          <div class="stat-title">{{ kindMap.get(stat[0]) }}</div>
          <div class="stat-value text-primary">
            {{ stat[1].length }}
          </div>
          <div class="stat-desc text-primary">
            {{ stat[1].length / actions().length | percent }}
          </div>
        </a>
        }
      </div>
      <!-- <div class="flex w-full">
        <div echarts [options]="this.charts.perfectGradeRadar" [initOpts]="{ renderer: 'canvas' }" class="w-full h-full"></div>
      </div> -->
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ActionByKindComponent {
  actions = input.required<ActionDTO[]>();
  groupedByKind = input.required<[string, ActionDTO[]][]>();
  kindMap = kindMap;
  // charts = charts;
}
