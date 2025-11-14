/* eslint-disable @typescript-eslint/no-non-null-assertion */

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
import { SVB_APP_ROUTES } from '../../app/ROUTES';
import { defaults } from '../../components/defaults';
import { gradDescriptionMap, grad_options_list } from '../../components/grade-options';
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
import { ActionDTO } from '../../types/ActionDTO';
@Component({
  selector: 'app-game-game-detail-view',
  host: { class: 'flex flex-col p-5 gap-4' },
  standalone: true,
  imports: [
    ActionByKindComponent,
    ActionsByGradeComponent,
    ActionsByPlayerComponent,
    ActionHorizontalTimelineComponent,
    RouterModule,
    NgxEchartsDirective,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    TranslocoModule
],
  template: `
    <div class="flex justify-between items-center">
      <h1 class="!text-sm font-medium truncate">{{ event.title }}</h1>
      <div class="fixed bottom-2 right-2 flex flex-col gap-2">
        <button mat-fab [routerLink]="[ROUTES.root, ROUTES.dataentry, event.id]"><mat-icon>add</mat-icon></button>
        <button mat-fab [routerLink]="[ROUTES.root, ROUTES.editGame, event.id]"><mat-icon>edit</mat-icon></button>
        @if(event.owner && event.id){
        <button mat-fab (click)="deleteEvent(event.id)"><mat-icon>delete</mat-icon></button>
        }
      </div>
    </div>
    <div class="flex w-full justify-between ">
      <a [routerLink]="[ROUTES.root, ROUTES.roationPlaner, event.id]" class="btn btn-outline-primary">{{ 'rotation-planer' | transloco }}</a>
      <ul class="flex gap-2">
        @for (item of event.media_links; track $index) {
        <li class="flex items-center justify-center">
          <a class="btn btn-xs w-12 h-12" [href]="item" target="_blank"
            >@if (item.includes('youtube')) {
            <svg width="48" height="48" viewBox="0 0 48 48">
              <title>youtube</title>
              <path
                class="fill-[#FF0000]"
                d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
              />
            </svg>
            }@else {
            <svg width="48" height="48">
              <title>video-outline</title>
              <path d="M15,8V16H5V8H15M16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5V7A1,1 0 0,0 16,6Z" />
            </svg>
            }
          </a>
        </li>
        }
      </ul>
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
  event!: EventDTO;
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
    this.event = game;
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
    if (!this.event?.id) return;
    if (!$event || $event === 'Alle') this.actions = await this.actionsService.getActionsOfEvent(this.event.id);
    else this.actions = await this.actionsService.getActionsOfEventOfSet(this.event.id, $event as number);
    this.stats = defaults;
    this.updateStats(this.actions, this.event);
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
