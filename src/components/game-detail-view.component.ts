import { CommonModule } from '@angular/common';
import { Component, type OnInit, computed, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  type MatSelectChange,
  MatSelectModule,
} from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { ActionDTO } from 'src/types/ActionDTO';
import { ActionsService } from '../services/action.service';
import type { EventDTO } from '../services/events.service';
import { SupabaseService } from '../services/supabase.service';
import { type ActionGrade, grad_options_list } from './grade-options';
import { ActionKind } from './kind-options';

@Component({
  selector: 'app-game-game-detail-view',
  standalone: true,
  imports: [
    CommonModule,
    NgxEchartsDirective,
    MatFormFieldModule,
    MatSelectModule,
  ],
  template: `
    <h1 class="h1">{{ game.title }}</h1>
    <div class="flex flex-col gap-8 p-5">
      <mat-form-field>
        <mat-label>Satz:</mat-label>

        <mat-select
          placeholder="Satz"
          formControlName="game_set"
          [value]="'Alle'"
          (valueChange)="reloadSet($event)"
        >
          <mat-option value="Alle">Alle</mat-option>
          @for (item of sets; track $index) {
          <mat-option [value]="item"> {{ item }} </mat-option>
          }
        </mat-select>
      </mat-form-field>
      <section class="flex flex-col gap-4">
        <div class="collapse collapse-arrow bg-base-200">
          <input type="radio" name="acc-attacks" checked="checked" />
          <div class="collapse-title text-xl font-medium">Attacks</div>
          <div class="collapse-content">
            <section class="flex flex-col gap-2">
              <div class="stats shadow">
                <div class="stat">
                  <div class="stat-figure text-primary"></div>
                  <div class="stat-title">Total Attacks</div>
                  <div class="stat-value text-primary">{{ attacks.total }}</div>
                </div>
              </div>
              <h4>Nach Bewertung</h4>
              <div class="stats shadow">
                @for (item of grad_options_list; track $index) {
                <div class="stat">
                  <div class="stat-title">{{ item }}</div>
                  <div class="stat-value text-primary">
                    {{ attacks.stats[item] }}
                  </div>
                  @if (attacks.stats[item]) {
                  <div class="stat-desc text-primary">
                    {{ attacks.stats[item] / attacks.total | percent }}
                  </div>
                  }
                </div>
                }
              </div>
              <div
                echarts
                [options]="gradePie"
                [initOpts]="{ renderer: 'canvas' }"
                class="h-40 w-full"
              ></div>
              <h4>Nach Spieler</h4>
              <div class="stats shadow">
                @for (item of attacks.most_player|keyvalue; track $index) {
                <div class="stat">
                  <div class="stat-title">{{ item.key }}</div>
                  <div class="stat-value text-primary">{{ item.value }}</div>
                </div>
                }
              </div>
              <div
                echarts
                [options]="playerPie"
                [initOpts]="{ renderer: 'canvas' }"
                class="h-40 w-full"
              ></div>
              <hr />
            </section>
          </div>
        </div>
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
                  <time class="text-xs opacity-50">{{
                    item.created_at | date : 'short'
                  }}</time>
                </div>
                <div class="dropdown w-full">
                  <div class="chat-bubble" role="button" [tabindex]="$index">
                    {{ item.kind }} - {{ item.character }} - {{ item.grade }}
                  </div>
                  <ul
                    [tabindex]="$index"
                    class="dropdown-content menu bg-base-100 rounded-box z-[5000] w-52 p-2 shadow"
                  >
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
  async deleteAction(arg0: number) {
    const arg1 = arg0;
    return await this.actionsService.deleteAction(arg0);
  }
  activatedRoute = inject(ActivatedRoute);
  supabase = inject(SupabaseService);
  actionsService = inject(ActionsService);
  /**
   *
   */
  grad_options_list = grad_options_list.map((g) => g.name);
  game!: EventDTO;
  actions: ActionDTO[] = [];
  attacks: {
    total: number;
    most_player: { [x: string]: number };
    stats: {
      [x in ActionGrade]?: number;
    };
  } = { total: 0, most_player: {}, stats: {} };
  gradePie: EChartsOption = {};
  playerPie: EChartsOption = {};
  sets: number[] = [1];
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
      console.log(a);
      this.reloadSet(this.currentSet);
    });
  }

  private async updateStats(a: ActionDTO[], game: EventDTO) {
    this.game = game;
    // const aces = await this.actionsService.getAcesOfEvent(game.id);
    // const stats = await this.supabase.getGameStats(game.id);
    this.actions = a;
    this.aggregateAttacks(a);
    this.updateCharts();
  }

  private aggregateAttacks(a: ActionDTO[]) {
    this.attacks = { total: 0, most_player: {}, stats: {} };

    this.attacks.total = a.filter((a) => a.kind === ActionKind.Attack).length;

    // biome-ignore lint/complexity/noForEach: <explanation>
    this.actions
      .filter((a) => a.kind === ActionKind.Attack)
      .map((a) => a.player_id.name)
      .forEach((player) => {
        if (this.attacks.most_player[player])
          this.attacks.most_player[player] += 1;
        else this.attacks.most_player[player] = 1;
      });
    this.attacks.most_player = Object.fromEntries(
      Object.entries(this.attacks.most_player).sort((a, b) => a[1] - b[1])
    );

    // biome-ignore lint/complexity/noForEach: <explanation>
    grad_options_list.forEach(({ name }) => {
      this.attacks.stats[name] = a.filter(
        (a) => a.grade === name && a.kind === ActionKind.Attack
      ).length;
    });
  }

  private updateCharts() {
    this.gradePie = { series: [] };
    this.gradePie.series = [
      {
        type: 'pie',
        radius: '50%',
        data: Object.entries(this.attacks.stats).map((v) => ({
          value: v[1],
          name: v[0],
        })),
      },
    ];
    this.playerPie.series = [
      {
        type: 'pie',
        radius: '50%',
        data: Object.entries(this.attacks.most_player).map((v) => ({
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

    if (!$event || $event === 'Alle')
      this.actions = await this.actionsService.getActionsOfEvent(this.game.id);
    else
      this.actions = await this.actionsService.getActionsOfEventOfSet(
        this.game.id,
        $event as number
      );
    this.updateStats(this.actions, this.game);
  }
}
