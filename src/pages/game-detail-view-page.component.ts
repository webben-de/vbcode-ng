/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterModule } from '@angular/router';
import type { EChartsOption } from 'echarts';
import { countBy, groupBy, sortBy } from 'lodash';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { ActionDTO } from 'src/types/ActionDTO';
import { defaults } from '../components/defaults';
import { grad_options_list, gradePrios } from '../components/grade-options';
import { kindMap, kinds } from '../components/kind-options';
import { ActionsService } from '../services/action.service';
import { SupabaseService } from '../services/supabase.service';
import { ActionGrade } from '../types/ActionGrade';
import { ActionKind } from '../types/ActionKind';
import type { EventDTO } from '../types/EventDTO';
import { hintMap } from '../types/hints';
@Component({
  selector: 'app-game-game-detail-view',
  host: { class: 'flex flex-col p-5 gap-4' },
  standalone: true,
  imports: [CommonModule, RouterModule, NgxEchartsDirective, MatFormFieldModule, MatSelectModule],
  template: `
    <h1 class="!text-sm font-medium truncate">{{ game.title }}</h1>
    <div class="flex flex-col gap-8 ">
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
        @for (stat of groupedByKind; track $index) {
        <div class="stats shadow flex gap-2">
          <a class="stat" [routerLink]="[]" fragment="co-{{ stat[0] }}">
            <div class="stat-figure text-primary"></div>
            <div class="stat-title">{{ kindS.get(stat[0]) }}</div>
            <div class="stat-value text-primary">
              {{ stat[1].length }}
            </div>
            <div class="stat-desc text-primary">
              {{ stat[1].length / actions.length | percent }}
            </div>
          </a>
        </div>
        }
        <div class="flex w-full">
          <div echarts [options]="this.charts.perfectGradeRadar" [initOpts]="{ renderer: 'canvas' }" class="w-full h-full"></div>
        </div>
      </section>
      <section>
        <h6>Alle Kontakt nach Bewertung</h6>
        <div class="stats shadow flex flex-wrap">
          @for (grade of groupedByGrade; track $index) {
          <div class="stat w-1/2">
            <div class="stat-title">{{ grade[0] }}</div>
            <div class="stat-value text-primary">
              {{ grade[1].length }}
            </div>
            <div class="stat-desc text-primary">
              {{ grade[1].length / actions.length | percent }}
            </div>
          </div>
          }
        </div>
        <!-- @if (stat[1].charts?.gradePie; as pie) {
        <div echarts [options]="pie" [initOpts]="{ renderer: 'canvas' }" class="h-40 w-full"></div>
        } -->
      </section>
      <section>
        <h6>Alle Kontakt nach Spieler</h6>
        <div class="stats shadow flex flex-wrap">
          @for (item of groupedByPlayer; track $index) {
          <div class="stat w-1/2">
            <div class="stat-title">{{ item[0] }}</div>
            <div class="stat-value text-primary">
              {{ item[1].length }}
            </div>
            <div class="stat-desc text-primary">
              {{ item[1].length / actions.length | percent }}
            </div>
          </div>
          }
        </div>
        <!-- @if (stat[1].charts?.gradePie; as pie) {
        <div echarts [options]="pie" [initOpts]="{ renderer: 'canvas' }" class="h-40 w-full"></div>
        } -->
      </section>
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
  groupedByKind: [string, ActionDTO[]][] = [];
  groupedByGrade: [string, ActionDTO[]][] = [];
  groupedByKindByPlayer: any;
  groupedByKindByGrade: any;
  groupedByKindByGradeAndPlayer: any;
  groupedByPlayer: [string, ActionDTO[]][] = [];
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
    this.actions = a;
    this.groupedByPlayer = sortBy(Object.entries(groupBy(a, 'player_id.name')), (a) => a[1]).reverse();
    this.groupedByKind = Object.entries(groupBy(a, 'kind'));
    this.groupedByGrade = sortBy(Object.entries(groupBy(a, 'grade')), (a) => {
      return gradePrios.get(a[0]) || 0;
    });
    this.groupedByKindByPlayer = this.groupedByKind.map((e) => [e[0], countBy(e[1], 'player_id.name')]);
    this.groupedByKindByGrade = this.groupedByKind.map((e) => [e[0], countBy(e[1], 'grade')]);
    this.groupedByKindByGradeAndPlayer = Object.entries(
      groupBy(a, (a) => {
        return `${a.kind}_${a.player_id.name}`;
      })
    ).map((e) => [e[0], groupBy(e[1], 'grade')]);
    this.generateGradeRadar();
  }

  generateGradeRadar(a: ActionDTO[] = this.actions) {
    const greatestHits = a.filter((a) => a.grade === ActionGrade['#']);
    const worstHits = a.filter((a) => a.grade === ActionGrade['=']);
    const gCounts = countBy(greatestHits, 'kind');
    const alphaASCGoods = [
      gCounts[ActionKind.Attack],
      gCounts[ActionKind.Block],
      gCounts[ActionKind.Def],
      gCounts[ActionKind.Free],
      gCounts[ActionKind.Serve],
      gCounts[ActionKind.Set],
    ];
    const wCounts = countBy(worstHits, 'kind');
    const alphaASCBads = [
      wCounts[ActionKind.Attack],
      wCounts[ActionKind.Block],
      wCounts[ActionKind.Def],
      wCounts[ActionKind.Free],
      wCounts[ActionKind.Serve],
      wCounts[ActionKind.Set],
    ];

    this.charts.perfectGradeRadar = {
      title: {
        text: 'Perfect/Failures ',
      },
      legend: {
        data: ['Perfect Grade', 'Failures'],
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
              value: alphaASCGoods,
              name: 'Perfect Grade',
              label: {
                show: true,
                formatter: (params: any) => params.value,
              },
            },
            {
              value: alphaASCBads,
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

    // ----
    // const groupedByKindByPlayerByGrade = groupedByKindByPlayerE.map((e) => [e[0], countBy(e[1][1], 'grade')]);
    // const groupedByKindByPlayerE = Object.entries(groupedByKindByPlayer);

    this.stats[kind].total = a.filter((a) => a.kind === kind).length;
    // biome-ignore lint/complexity/noForEach: <explanation>
    a.filter((a) => a.kind === kind)
      .map((a) => a.player_id.name)
      .forEach((player) => {
        const v = this.stats[kind].by_player.get(player);
        if (v) this.stats[kind].by_player.set(player, v + 1);
        else this.stats[kind].by_player.set(player, 1);
      });

    // biome-ignore lint/complexity/noForEach: <explanation>
    grad_options_list.forEach(({ name: grade }) => {
      this.stats[kind].stats[grade] = a.filter((a) => a.grade === grade && a.kind === kind).length;
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
    this.stats = defaults;
    this.updateStats(this.actions, this.game);
  }
  /**
   *
   * @param id
   * @returns
   */
  async deleteAction(id: number) {
    return await this.actionsService.deleteAction(id);
  }
}
