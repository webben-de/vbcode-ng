import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import type { ActionDTO } from '../../types/ActionDTO';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { groupBy, sortBy } from 'lodash';

@Component({
  selector: 'app-actions-by-player',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section>
      <h6>Alle Kontakt nach Spieler</h6>
      <div class="stats shadow flex flex-wrap">
        @for (item of groupedByPlayer; track $index) {
        <a [routerLink]="['player', item[0]]" routerLinkActive="router-link-active" class="stat w-1/2">
          <div class="stat-title">{{ userMap.get(item[0]) }}</div>
          <div class="stat-value text-primary">
            {{ item[1].length }}
          </div>
          <div class="stat-desc text-primary">
            {{ item[1].length / actions().length | percent }}
          </div>
        </a>
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
export class ActionsByPlayerComponent implements OnInit {
  route = inject(ActivatedRoute);
  actions = input.required<ActionDTO[]>();
  groupedByPlayer: [string, ActionDTO[]][] = [];
  // a user id->name map from unique items from actions
  userMap = new Map<string, string>();

  ngOnInit(): void {
    this.groupedByPlayer = sortBy(Object.entries(groupBy(this.actions(), 'player_id.id')), (a) => a[1]).reverse();
    this.actions()?.forEach((a) => this.userMap.set(a.player_id.id, a.player_id.name));
  }
}
