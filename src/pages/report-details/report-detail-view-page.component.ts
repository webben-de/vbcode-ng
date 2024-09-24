/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule, translate } from '@jsverse/transloco';
import type { EChartsOption, TitleComponentOption } from 'echarts';
import { countBy, groupBy, sortBy } from 'lodash';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { ActionDTO } from 'src/types/ActionDTO';
import { SVB_APP_ROUTES } from '../../app/ROUTES';
import { defaults } from '../../components/defaults';
import { gradDescriptionMap, grad_options_list, gradePrios } from '../../components/grade-options';
import { kindMap, kinds } from '../../components/kind-options';
import { ActionsService } from '../../services/action.service';
import { EventsService } from '../../services/events.service';
import { SupabaseService } from '../../services/supabase.service';
import { ActionGrade, ActionGradeColorMap } from '../../types/ActionGrade';
import { ActionKind } from '../../types/ActionKind';
import type { EventDTO } from '../../types/EventDTO';
import { hintMap } from '../../types/hints';
import { ActionByKindComponent } from './action-by-kind.component';
import { ActionHorizontalTimelineComponent } from './action-horizontal-timeline.component';
import { ActionsByGradeComponent } from './actions-by-grade.component';
import { ActionsByPlayerComponent } from './actions-by-player.component';
@Component({
  selector: 'app-game-game-detail-view',
  host: { class: 'flex flex-col p-5 gap-4' },
  standalone: true,
  imports: [
    ActionByKindComponent,
    ActionsByGradeComponent,
    ActionsByPlayerComponent,
    ActionHorizontalTimelineComponent,
    CommonModule,
    RouterModule,
    NgxEchartsDirective,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    TranslocoModule,
  ],
  template: `
    <div class="flex justify-between items-center">
      <h1 class="!text-sm font-medium truncate">{{ game.title }}</h1>
      <div class="fixed bottom-2 right-2 flex flex-col gap-2">
        <button mat-fab [routerLink]="[ROUTES.root, ROUTES.dataentry, game.id]"><mat-icon>add</mat-icon></button>
        @if(game.owner && game.id){
        <button mat-fab (click)="deleteEvent(game.id)"><mat-icon>delete</mat-icon></button>
        }
      </div>
    </div>
    <div class="flex flex-col gap-8 " id="export">
      <mat-form-field>
        <mat-label>{{ 'set' | transloco }}:</mat-label>

        <mat-select formControlName="game_set" [value]="'Alle'" (valueChange)="reloadSet($event)">
          <mat-option value="Alle">Alle</mat-option>
          @for (item of sets; track $index) {
          <mat-option [value]="item"> {{ item }} </mat-option>
          }
        </mat-select>
      </mat-form-field>
      <app-actions-by-kind [actions]="actions" />
      <app-actions-by-grade [actions]="actions" />
      <app-actions-by-player [actions]="actions" />
      <app-action-horizontal-timeline [actions]="actions" />
    </div>
  `,
})
export class ReportDetailViewComponent implements OnInit {
  ROUTES = SVB_APP_ROUTES;
  /**
   * create a pdf of the current view
   */
  async export() {
    // const pdf = new jsPDF();
    // const element = document.getElementById('export');
    // if (element) {
    //   const pdfexport = await pdf.html(element?.innerHTML).save('test.pdf');
    //   console.log(pdfexport);
    // }
  }
  activatedRoute = inject(ActivatedRoute);
  supabase = inject(SupabaseService);
  actionsService = inject(ActionsService);
  eventService = inject(EventsService);
  router = inject(Router);
  snack = inject(MatSnackBar);
  /**
   *
   */
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
  // groupedByKindByGrade: [ActionKind | string, { [x in ActionGrade]: number }][] = [];
  groupedByKindByGrade: any[] = [];
  groupedByKindByGradeAndPlayer: any;
  groupedByPlayer: [string, ActionDTO[]][] = [];
  gradDescriptionMap = gradDescriptionMap;
  groupedByGradeByKind: any;
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

    this.groupedByKindByPlayer = this.groupedByKind.map((e) => [e[0], countBy(e[1], 'player_id.name')]);
    this.groupedByKindByGrade = this.groupedByKind.map((e) => [e[0], countBy(e[1], 'grade')]);
    this.groupedByGradeByKind = this.groupedByGrade.map((e) => [e[0], countBy(e[1], 'kind')]);
    this.groupedByKindByGradeAndPlayer = Object.entries(
      groupBy(a, (a) => {
        return `${a.kind}_${a.player_id?.name}`;
      })
    ).map((e) => [e[0], groupBy(e[1], 'grade')]);
    this.generateGradeRadar();
  }

  generateGradeRadar(a: ActionDTO[] = this.actions) {
    const greatestHits = a.filter((a) => a.grade === ActionGrade['#']);
    const worstHits = a.filter((a) => a.grade === ActionGrade['=']);
    const gCounts = countBy(greatestHits, 'kind');
    const dataSeries = this.groupedByGradeByKind.map((e: any) => {
      return {
        value: [
          e[1][ActionKind.Attack],
          e[1][ActionKind.Block],
          e[1][ActionKind.Def],
          e[1][ActionKind.Free],
          e[1][ActionKind.Recieve],
          e[1][ActionKind.Serve],
          e[1][ActionKind.Set],
        ],
        name: gradDescriptionMap.get(e[0]),
        lineStyle: {
          color: ActionGradeColorMap.get(e[0]),
        },
        itemStyle: {
          color: ActionGradeColorMap.get(e[0]),
        },
      };
    });

    const wCounts = countBy(worstHits, 'kind');

    this.charts.perfectGradeRadar = {
      title: {
        text: 'Perfect/Failures ',
        show: false,
      } as TitleComponentOption,
      legend: {
        data: [
          gradDescriptionMap.get(ActionGrade['#']),
          gradDescriptionMap.get(ActionGrade['!']),
          gradDescriptionMap.get(ActionGrade['+']),
          gradDescriptionMap.get(ActionGrade['/']),
          gradDescriptionMap.get(ActionGrade['-']),
          gradDescriptionMap.get(ActionGrade['=']),
        ],
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
          data: [...dataSeries],
        },
      ],
    } as any;
  }
  /**
   *
   * @param map
   * @returns
   */
  convertPlayerCountMapToArray(map: Map<any, number>) {
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }
  /**
   *
   * @param kind
   */
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
    if (!this.game?.id) return;
    if (!$event || $event === 'Alle') this.actions = await this.actionsService.getActionsOfEvent(this.game.id);
    else this.actions = await this.actionsService.getActionsOfEventOfSet(this.game.id, $event as number);
    this.stats = defaults;
    this.updateStats(this.actions, this.game);
  }

  /**
   *
   * @param id
   */
  async deleteEvent(id: string) {
    try {
      await this.eventService.deleteEvent(id);
      this.router.navigate([SVB_APP_ROUTES.root, SVB_APP_ROUTES.games]);
    } catch (error) {
      this.snack.open(translate('error-deleteing-event'));
    }
  }
}
