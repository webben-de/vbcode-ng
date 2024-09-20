import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { gradDescriptionMap } from '../../components/grade-options';
import type { ActionDTO } from '../../types/ActionDTO';

@Component({
  selector: 'app-actions-by-grade',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  template: ` <section>
    <h6>{{ 'all-action-after-grade' | transloco }}</h6>
    <div class="stats shadow flex flex-wrap">
      @for (grade of groupedByGrade(); track $index) {
      <div class="stat w-1/2">
        <div class="stat-title">{{ gradDescriptionMap.get(grade[0]) }}</div>
        <div class="stat-value text-primary">
          {{ grade[1].length }}
        </div>
        <div class="stat-desc text-primary">
          {{ grade[1].length / actions().length | percent }}
        </div>
      </div>
      }
    </div>
    <!-- @if (stat[1].charts?.gradePie; as pie) {
        <div echarts [options]="pie" [initOpts]="{ renderer: 'canvas' }" class="h-40 w-full"></div>
        } -->
  </section>`,
})
export class ActionsByGradeComponent {
  gradDescriptionMap = gradDescriptionMap;
  actions = input.required<ActionDTO[]>();
  groupedByGrade = input.required<[string, ActionDTO[]][]>();
}
