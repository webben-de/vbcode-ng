import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import type { ActionDTO } from '../../types/ActionDTO';

@Component({
  selector: 'app-actions-by-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h6>Alle Kontakt nach Spieler</h6>
      <div class="stats shadow flex flex-wrap">
        @for (item of groupedByPlayer(); track $index) {
        <div class="stat w-1/2">
          <div class="stat-title">{{ item[0] }}</div>
          <div class="stat-value text-primary">
            {{ item[1].length }}
          </div>
          <div class="stat-desc text-primary">
            {{ item[1].length / actions().length | percent }}
          </div>
        </div>
        }
      </div>
      <!-- @if (stat[1].charts?.gradePie; as pie) {
        <div echarts [options]="pie" [initOpts]="{ renderer: 'canvas' }" class="h-40 w-full"></div>
        } -->
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ActionsByPlayerComponent {
  actions = input.required<ActionDTO[]>();
  groupedByPlayer = input.required<[string, ActionDTO[]][]>();
}
