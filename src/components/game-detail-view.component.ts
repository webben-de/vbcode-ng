import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { SupabaseService, type ActionDTO } from '../app/supabase.service';
import { type ActionGrade, grad_options_list } from './grade-options';
import { ActionKind } from './kind-options';

@Component({
  selector: 'app-game-game-detail-view',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  template: `
    <h1 class="h1">{{ game.title }}</h1>
    <div class="flex flex-col gap-8 p-5">
      <section class="flex flex-col gap-2">
        <h3>Hits</h3>
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
      <section>{{ attacks.most_player | json }}</section>

      <hr />
      <section>
        <h2>Log</h2>

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
          <div class="chat-bubble">
            {{ item.kind }} - {{ item.character }} - {{ item.grade }}
          </div>
        </div>
        }
      </section>
    </div>
  `,
})
export class GameDetailViewComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  supabase = inject(SupabaseService);
  grad_options_list = grad_options_list.map((g) => g.name);
  game: any;
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
  ngOnInit() {
    this.activatedRoute.data.subscribe(async ({ game, actions }) => {
      const a = actions as ActionDTO[];
      this.game = game;
      const aces = await this.supabase.getAces(game.id);
      console.log(aces);
      const stats = await this.supabase.getGameStats(game.id);
      console.log(stats);
      this.actions = a;
      this.attacks.total = a.filter((a) => a.kind === ActionKind.Attack).length;
      // biome-ignore lint/complexity/noForEach: <explanation>
      a.filter((a) => a.kind === ActionKind.Attack)
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
      console.log(this.gradePie);
    });
  }
}
