import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { gradDescriptionMap, gradePrios } from '../../components/grade-options';
import type { ActionDTO } from '../../types/ActionDTO';
import { groupBy, sortBy } from 'lodash';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-actions-by-grade',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterModule],
  template: ` <section>
    <h6>{{ 'all-action-after-grade' | transloco }}</h6>
    <div class="stats shadow flex flex-wrap">
      @for (actionsItems of groupedByGrade; track $index) {
      <a [routerLink]="['grade', actionsItems[0]]" class="stat w-1/2">
        <div class="stat-title">{{ gradDescriptionMap.get(actionsItems[0]) }}</div>
        <div class="stat-value text-primary">
          {{ actionsItems[1].length }}
        </div>
        <div class="stat-desc text-primary">
          {{ actionsItems[1].length / actions().length | percent }}
        </div>
      </a>
      }
    </div>
    <!-- @if (stat[1].charts?.gradePie; as pie) {
        <div echarts [options]="pie" [initOpts]="{ renderer: 'canvas' }" class="h-40 w-full"></div>
        } -->
  </section>`,
})
export class ActionsByGradeComponent implements OnInit {
  actions = input.required<ActionDTO[]>();
  groupedByGrade: [string, ActionDTO[]][] = [];
  ngOnInit(): void {
    this.groupedByGrade = sortBy(Object.entries(groupBy(this.actions(), 'grade')), (a) => {
      return gradePrios.get(a[0]) || 0;
    });
  }
  gradDescriptionMap = gradDescriptionMap;
}
