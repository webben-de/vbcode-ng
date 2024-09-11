/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import type { EChartsOption } from 'echarts';
import { countBy, groupBy } from 'lodash';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { ActionDTO } from 'src/types/ActionDTO';
import { defaults } from '../components/defaults';
import { grad_options_list } from '../components/grade-options';
import { kindMap, kinds } from '../components/kind-options';
import { ActionsService } from '../services/action.service';
import { SupabaseService } from '../services/supabase.service';
import { ActionGrade } from '../types/ActionGrade';
import { ActionKind } from '../types/ActionKind';
import type { EventDTO } from '../types/EventDTO';
import { hintMap } from '../types/hints';
@Component({
  selector: 'app-game-game-detail-view',
  host: { class: 'flex flex-col p-2' },
  standalone: true,
  imports: [CommonModule, RouterModule, NgxEchartsDirective, MatFormFieldModule, MatSelectModule],
  template: `
    <h1 class="text-sm truncate">{{ game.title }}</h1>
    <div class="flex flex-col gap-8 p-5">
      <mat-form-field>
        <mat-label>Satz:</mat-label>

        <mat-select placeholder="Satz" formControlName="game_set" [value]="'Alle'" (valueChange)="reloadSet($event)">
          <mat-option value="Alle">Alle</mat-option>
          @for (item of sets; track $index) {
          <mat-option [value]="item"> {{ item }} </mat-option>
          }
        </mat-select>
      </mat-form-field>
      <section class="flex flex-wrap gap-16">
        @for (stat of stats|keyvalue; track $index) {
        <div class="stats shadow flex gap-2">
          <a class="stat" [routerLink]="[]" fragment="co-{{ stat.key }}">
            <div class="stat-figure text-primary"></div>
            <div class="stat-title">{{ kindS.get(stat.key) }}</div>
            <div class="stat-value text-primary">
              {{ stat.value.total }}
            </div>
            <div class="stat-desc text-primary">
              {{ stat.value.total / actions.length | percent }}
            </div>
          </a>
        </div>
        }
        <div class="flex w-full">
          <div echarts [options]="this.charts.perfectGradeRadar" [initOpts]="{ renderer: 'canvas' }" class="w-full h-full"></div>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        @for (stat of stats|keyvalue; track $index) {
        <h5 class="">{{ kindS.get(stat.key) }}</h5>
        <div class="stats stats-vertical  shadow">
          <div class="stat">
            <div class="stat-figure text-primary"></div>
            <div class="stat-title">Total {{ kindS.get(stat.key) }}</div>
            <div class="stat-value text-primary">
              {{ stat.value.total }}
            </div>
          </div>
        </div>

        <h6>Nach Bewertung</h6>
        <div class="stats stats-vertical  shadow">
          @for (grade of grad_options_list; track $index) {
          <div class="stat">
            <div class="stat-title">{{ hintMap.get(stat.key)?.get(grade) }}</div>
            <div class="stat-value text-primary">
              {{ stat.value.stats[grade] }}
            </div>
            @if (stat.value.stats[grade]) {
            <div class="stat-desc text-primary">
              {{ stat.value.stats[grade] / stat.value.total | percent }}
            </div>
            }
          </div>
          }
        </div>
        @if (stat.value.charts?.gradePie; as pie) {
        <div echarts [options]="pie" [initOpts]="{ renderer: 'canvas' }" class="h-40 w-full"></div>
        }
        <h6>Anzahl nach Spieler</h6>
        <div class="stats stats-vertical shadow">
          @for (item of convertPlayerCountMapToArray(stat.value.by_player); track $index) {
          <div class="stat">
            <div class="stat-title">{{ item[0] }}</div>
            <div class="stat-value text-primary">{{ item[1] }}</div>
          </div>
          }
        </div>
        @if (stat.value.charts?.playerPie; as pie) {
        <div echarts [options]="pie" [initOpts]="{ renderer: 'canvas' }" class="h-40 w-full"></div>
        } }
        <div class="collapse collapse-arrow bg-base-200">
          <input type="radio" name="acc-attacks" checked="checked" />
          <div class="collapse-title text-xl font-medium">Log</div>
          <div class="collapse-content !pb-20">
            <section>
              @for (item of actions; track $index) {

              <div class="chat chat-start">
                <div class="chat-image avatar">
                  <div class="w-10 rounded-full"></div>
                </div>
                <div class="chat-header">
                  {{ item.player_id.name }}
                  <time class="text-xs opacity-50">{{ item.created_at | date : 'short' }}</time>
                </div>
                <div class="dropdown w-full">
                  <div class="chat-bubble" role="button" [tabindex]="$index">{{ item.kind }} - {{ item.character }} - {{ item.grade }}</div>
                  <ul [tabindex]="$index" class="dropdown-content menu bg-base-100 rounded-box z-[5000] w-52 p-2 shadow">
                    <li (click)="deleteAction(item.id)"><a>Delete this</a></li>
                  </ul>
                </div>
              </div>
              }
            </section>
          </div>
        </div>
      </section>

      <hr />
    </div>
  `,
})
export class GameDetailViewComponent implements OnInit {
  currentSet: string | number | undefined;
  stats = defaults;
  kindS = kindMap;
  charts: {
    perfectGradeRadar: EChartsOption;
    worstGradeRadar: EChartsOption;
  } = {
    perfectGradeRadar: {},
    worstGradeRadar: {},
  };
  activatedRoute = inject(ActivatedRoute);
  supabase = inject(SupabaseService);
  actionsService = inject(ActionsService);
  /**
   *
   */
  grad_options_list = grad_options_list.map((g) => g.name);
  game!: EventDTO;
  actions: ActionDTO[] = [];

  gradePie: EChartsOption = {};
  playerPie: EChartsOption = {};
  sets: number[] = [1];
  hintMap = hintMap;
  /**
   *
   */
  ngOnInit() {
    this.activatedRoute.data.subscribe(async ({ game, actions }) => {
      const a = actions as ActionDTO[];

      await this.updateStats(actions, game);
      this.sets = Array.from(new Set(a.map((a) => a.game_set)));
    });
    this.actionsService.actions$.subscribe((a) => {
      this.reloadSet(this.currentSet);
    });
  }

  private async updateStats(a: ActionDTO[], game: EventDTO) {
    this.game = game;
    // const aces = await this.actionsService.getAcesOfEvent(game.id);
    // const stats = await this.supabase.getGameStats(game.id);
    this.actions = a;
    // this.sets = Array.from(new Set(a.map((a) => a.game_set)));

    this.generateStats(a, ActionKind.Attack);
    this.generateStats(a, ActionKind.Set);
    this.generateStats(a, ActionKind.Block);
    this.generateStats(a, ActionKind.Def);
    this.generateStats(a, ActionKind.Free);
    this.generateStats(a, ActionKind.Recieve);
    this.generateStats(a, ActionKind.Serve);
    this.aggregateGrade(a);
    this.generateGradeRadar();
  }
  aggregateGrade(a: ActionDTO[]) {
    return {
      best_actions: a.filter((a) => a.grade === ActionGrade['#']),
      worst_actions: a.filter((a) => a.grade === ActionGrade['=']),
    };
  }
  generateGradeRadar(a: ActionDTO[] = this.actions) {
    const greatesHits = a.filter((a) => a.grade === ActionGrade['#']);
    const worstHits = a.filter((a) => a.grade === ActionGrade['=']);
    const gCounts = countBy(greatesHits, 'kind');
    const wCounts = countBy(worstHits, 'kind');
    this.charts.perfectGradeRadar = {
      title: {
        text: 'Perfect/Failures ',
      },
      legend: {
        data: ['Perfect', 'Worst'],
      },
      radar: {
        // shape: 'circle',
        indicator: kinds.map((k) => ({
          name: this.kindS.get(k.abbr),
          max: Math.max(...Object.values(gCounts), ...Object.values(wCounts)),
        })),
      },
      series: [
        {
          name: 'Perfect vs Worst',
          type: 'radar',

          data: [
            {
              value: Object.values(gCounts),
              name: 'Perfect Grade',
              label: {
                show: true,
                formatter: (params: any) => params.value,
              },
            },
            {
              value: Object.values(wCounts),
              name: 'Failures',
              itemStyle: { color: 'red' },
              lineStyle: {
                color: 'red',
              },
              label: {
                show: true,
                formatter: (params: any) => params.value,
              },
            },
          ],
        },
      ],
    } as any;
  }

  private generateStats(a: ActionDTO[], kind: ActionKind) {
    if (!this.stats[kind]) return;
    this.stats[kind].total = a.filter((a) => a.kind === kind).length;

    // biome-ignore lint/complexity/noForEach: <explanation>
    this.actions
      .filter((a) => a.kind === kind)
      .map((a) => a.player_id.name)
      .forEach((player) => {
        const v = this.stats[kind].by_player.get(player);
        if (v) this.stats[kind].by_player.set(player, v + 1);
        else this.stats[kind].by_player.set(player, 1);
      });

    // biome-ignore lint/complexity/noForEach: <explanation>
    grad_options_list.forEach(({ name }) => {
      this.stats[kind].stats[name] = a.filter((a) => a.grade === name && a.kind === kind).length;
    });
    this.updateCharts(kind);
  }
  convertPlayerCountMapToArray(map: Map<any, number>) {
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }
  private updateCharts(kind: ActionKind) {
    if (!this.stats[kind].charts)
      this.stats[kind].charts = {
        gradePie: {},
        playerPie: {},
      };
    this.stats[kind].charts.gradePie = { series: [] };
    this.stats[kind].charts.gradePie.series = [
      {
        type: 'pie',
        radius: '50%',
        data: Object.entries(this.stats[kind].stats).map((v) => ({
          value: v[1],
          name: v[0],
        })),
      },
    ];
    this.stats[kind].charts.playerPie = { series: [] };
    this.stats[kind].charts.playerPie.series = [
      {
        type: 'pie',
        radius: '50%',
        data: Object.entries(this.stats[kind].by_player).map((v) => ({
          value: v[1],
          name: v[0],
        })),
      },
    ];
  }
  /**
   *
   * @param $event
   */
  async reloadSet($event?: number | string) {
    this.currentSet = $event;

    if (!$event || $event === 'Alle') this.actions = await this.actionsService.getActionsOfEvent(this.game.id);
    else this.actions = await this.actionsService.getActionsOfEventOfSet(this.game.id, $event as number);
    this.updateStats(this.actions, this.game);
  }
  async deleteAction(arg0: number) {
    const arg1 = arg0;
    return await this.actionsService.deleteAction(arg0);
  }
}
