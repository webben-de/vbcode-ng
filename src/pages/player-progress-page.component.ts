import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { SessionState } from '../app/session.state';
import { ActionsService } from '../services/action.service';
import { EventsService } from '../services/events.service';
import { PlayerService } from '../services/player.service';
import type { ActionDTO } from '../types/ActionDTO';
import type { EventResponse } from '../types/EventDTO';
import type { PlayerDTO } from '../types/PlayerDTO';

interface PlayerStats {
  totalActions: number;
  serves: number;
  receives: number;
  attacks: number;
  blocks: number;
  defenses: number;
  sets: number;
  aces: number;
  errors: number;
  perfectActions: number;
  goodActions: number;
}

interface EventStats {
  event: EventResponse;
  stats: PlayerStats;
  actions: ActionDTO[];
}

@Component({
  selector: 'app-player-progress',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    TranslocoModule,
  ],
  template: `
    <div class="flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 class="text-2xl md:text-3xl font-bold">{{ 'player-progress' | transloco }}</h1>
        @if (selectedPlayer) {
        <div class="flex items-center gap-3">
          <span class="text-lg font-semibold">{{ selectedPlayer.name }}</span>
          <span class="badge badge-lg">{{ selectedPlayer.trikot }}</span>
        </div>
        }
      </div>

      <!-- Player Selection -->
      <div class="mb-6">
        <mat-form-field class="w-full md:w-1/2">
          <mat-label>{{ 'select-player' | transloco }}</mat-label>
          <mat-select [(value)]="selectedPlayer" (valueChange)="onPlayerChange($event)">
            @for (player of players; track player.id) {
            <mat-option [value]="player"> {{ player.name }} ({{ player.trikot }}) </mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>

      @if (selectedPlayer && eventStats.length > 0) {
      <!-- Overall Statistics -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">{{ 'overall-statistics' | transloco }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="stat bg-base-200 rounded-lg p-4">
            <div class="stat-title">{{ 'total-actions' | transloco }}</div>
            <div class="stat-value text-primary">{{ overallStats.totalActions }}</div>
          </div>
          <div class="stat bg-base-200 rounded-lg p-4">
            <div class="stat-title">{{ 'aces' | transloco }}</div>
            <div class="stat-value text-success">{{ overallStats.aces }}</div>
          </div>
          <div class="stat bg-base-200 rounded-lg p-4">
            <div class="stat-title">{{ 'perfect-actions' | transloco }}</div>
            <div class="stat-value text-success">{{ overallStats.perfectActions }}</div>
          </div>
          <div class="stat bg-base-200 rounded-lg p-4">
            <div class="stat-title">{{ 'errors' | transloco }}</div>
            <div class="stat-value text-error">{{ overallStats.errors }}</div>
          </div>
        </div>
      </div>

      <!-- Event Type Tabs -->
      <mat-tab-group class="mb-6">
        <mat-tab [label]="'all-events' | transloco">
          <div class="py-4 space-y-4">
            @for (eventStat of eventStats; track eventStat.event.id) {
            <mat-card class="p-4">
              <mat-card-header>
                <mat-card-title class="flex items-center gap-2">
                  <span>{{ eventStat.event.title }}</span>
                  <span
                    class="badge text-xs"
                    [class.badge-primary]="eventStat.event.event_type === 'game'"
                    [class.badge-success]="eventStat.event.event_type === 'training'"
                  >
                    {{ eventStat.event.event_type === 'training' ? ('training' | transloco) : ('game' | transloco) }}
                  </span>
                </mat-card-title>
                <mat-card-subtitle>{{ eventStat.event.date | date : 'short' }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="grid grid-cols-3 gap-2 mt-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold">{{ eventStat.stats.totalActions }}</div>
                    <div class="text-sm text-gray-600">{{ 'actions' | transloco }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-success">{{ eventStat.stats.aces }}</div>
                    <div class="text-sm text-gray-600">{{ 'aces' | transloco }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-error">{{ eventStat.stats.errors }}</div>
                    <div class="text-sm text-gray-600">{{ 'errors' | transloco }}</div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
            }
          </div>
        </mat-tab>
        <mat-tab [label]="'games' | transloco">
          <div class="py-4 space-y-4">
            @for (eventStat of gameStats; track eventStat.event.id) {
            <mat-card class="p-4">
              <mat-card-header>
                <mat-card-title>{{ eventStat.event.title }}</mat-card-title>
                <mat-card-subtitle>{{ eventStat.event.date | date : 'short' }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="grid grid-cols-3 gap-2 mt-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold">{{ eventStat.stats.totalActions }}</div>
                    <div class="text-sm text-gray-600">{{ 'actions' | transloco }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-success">{{ eventStat.stats.aces }}</div>
                    <div class="text-sm text-gray-600">{{ 'aces' | transloco }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-error">{{ eventStat.stats.errors }}</div>
                    <div class="text-sm text-gray-600">{{ 'errors' | transloco }}</div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
            }
          </div>
        </mat-tab>
        <mat-tab [label]="'training-sessions' | transloco">
          <div class="py-4 space-y-4">
            @for (eventStat of trainingStats; track eventStat.event.id) {
            <mat-card class="p-4">
              <mat-card-header>
                <mat-card-title>{{ eventStat.event.title }}</mat-card-title>
                <mat-card-subtitle>{{ eventStat.event.date | date : 'short' }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="grid grid-cols-3 gap-2 mt-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold">{{ eventStat.stats.totalActions }}</div>
                    <div class="text-sm text-gray-600">{{ 'actions' | transloco }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-success">{{ eventStat.stats.aces }}</div>
                    <div class="text-sm text-gray-600">{{ 'aces' | transloco }}</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-error">{{ eventStat.stats.errors }}</div>
                    <div class="text-sm text-gray-600">{{ 'errors' | transloco }}</div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
            }
          </div>
        </mat-tab>
      </mat-tab-group>

      <!-- Performance Over Time -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">{{ 'performance-over-time' | transloco }}</h2>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>{{ 'date' | transloco }}</th>
                <th>{{ 'event' | transloco }}</th>
                <th>{{ 'event-type' | transloco }}</th>
                <th>{{ 'actions' | transloco }}</th>
                <th>{{ 'aces' | transloco }}</th>
                <th>{{ 'errors' | transloco }}</th>
                <th>{{ 'efficiency' | transloco }}</th>
              </tr>
            </thead>
            <tbody>
              @for (eventStat of eventStats; track eventStat.event.id) {
              <tr class="hover">
                <td>{{ eventStat.event.date | date : 'short' }}</td>
                <td>{{ eventStat.event.title }}</td>
                <td>
                  <span
                    class="badge"
                    [class.badge-primary]="eventStat.event.event_type === 'game'"
                    [class.badge-success]="eventStat.event.event_type === 'training'"
                  >
                    {{ eventStat.event.event_type === 'training' ? ('training' | transloco) : ('game' | transloco) }}
                  </span>
                </td>
                <td>{{ eventStat.stats.totalActions }}</td>
                <td>{{ eventStat.stats.aces }}</td>
                <td>{{ eventStat.stats.errors }}</td>
                <td>{{ calculateEfficiency(eventStat.stats) }}%</td>
              </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      } @else if (selectedPlayer) {
      <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ 'no-data-available' | transloco }}</span>
      </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class PlayerProgressPageComponent implements OnInit {
  playerService = inject(PlayerService);
  eventsService = inject(EventsService);
  actionsService = inject(ActionsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  user_player = select(SessionState.user_player);

  players: PlayerDTO[] = [];
  selectedPlayer?: PlayerDTO;
  eventStats: EventStats[] = [];
  overallStats: PlayerStats = {
    totalActions: 0,
    serves: 0,
    receives: 0,
    attacks: 0,
    blocks: 0,
    defenses: 0,
    sets: 0,
    aces: 0,
    errors: 0,
    perfectActions: 0,
    goodActions: 0,
  };

  get gameStats(): EventStats[] {
    return this.eventStats.filter((es) => es.event.event_type === 'game');
  }

  get trainingStats(): EventStats[] {
    return this.eventStats.filter((es) => es.event.event_type === 'training');
  }

  async ngOnInit() {
    // Get all players or just the logged-in player
    const myPlayer = this.user_player();
    if (myPlayer) {
      this.selectedPlayer = myPlayer;
      this.players = [myPlayer];
    } else {
      this.players = await this.playerService.getPlayers();
      if (this.players.length > 0) {
        this.selectedPlayer = this.players[0];
      }
    }

    if (this.selectedPlayer) {
      await this.loadPlayerStats();
    }
  }

  async onPlayerChange(player: PlayerDTO) {
    this.selectedPlayer = player;
    await this.loadPlayerStats();
  }

  async loadPlayerStats() {
    if (!this.selectedPlayer) return;

    // Get all events where the player participated
    const events = await this.eventsService.getEvents();
    const playerId = this.selectedPlayer.id;
    const playerEvents = events.filter((event) => event.attendees.includes(playerId));

    // Get actions for each event
    this.eventStats = [];
    this.resetOverallStats();

    for (const event of playerEvents) {
      const actions = await this.actionsService.getActionsOfEvent(event.id);
      const playerActions = actions.filter((action) => action.player_id.id === playerId);

      const stats = this.calculateStats(playerActions);
      this.eventStats.push({
        event,
        stats,
        actions: playerActions,
      });

      // Add to overall stats
      this.addToOverallStats(stats);
    }

    // Sort by date (most recent first)
    this.eventStats.sort((a, b) => new Date(b.event.date).getTime() - new Date(a.event.date).getTime());
  }

  private calculateStats(actions: ActionDTO[]): PlayerStats {
    const stats: PlayerStats = {
      totalActions: actions.length,
      serves: 0,
      receives: 0,
      attacks: 0,
      blocks: 0,
      defenses: 0,
      sets: 0,
      aces: 0,
      errors: 0,
      perfectActions: 0,
      goodActions: 0,
    };

    for (const action of actions) {
      switch (action.kind) {
        case 'S':
          stats.serves++;
          break;
        case 'R':
          stats.receives++;
          break;
        case 'A':
          stats.attacks++;
          break;
        case 'B':
          stats.blocks++;
          break;
        case 'D':
          stats.defenses++;
          break;
        case 'E':
          stats.sets++;
          break;
      }

      switch (action.grade) {
        case '#':
          stats.aces++;
          stats.perfectActions++;
          break;
        case '!':
        case '+':
          stats.goodActions++;
          break;
        case '=':
          stats.errors++;
          break;
      }
    }

    return stats;
  }

  private resetOverallStats() {
    this.overallStats = {
      totalActions: 0,
      serves: 0,
      receives: 0,
      attacks: 0,
      blocks: 0,
      defenses: 0,
      sets: 0,
      aces: 0,
      errors: 0,
      perfectActions: 0,
      goodActions: 0,
    };
  }

  private addToOverallStats(stats: PlayerStats) {
    this.overallStats.totalActions += stats.totalActions;
    this.overallStats.serves += stats.serves;
    this.overallStats.receives += stats.receives;
    this.overallStats.attacks += stats.attacks;
    this.overallStats.blocks += stats.blocks;
    this.overallStats.defenses += stats.defenses;
    this.overallStats.sets += stats.sets;
    this.overallStats.aces += stats.aces;
    this.overallStats.errors += stats.errors;
    this.overallStats.perfectActions += stats.perfectActions;
    this.overallStats.goodActions += stats.goodActions;
  }

  calculateEfficiency(stats: PlayerStats): number {
    if (stats.totalActions === 0) return 0;
    const positive = stats.perfectActions + stats.goodActions;
    return Math.round((positive / stats.totalActions) * 100);
  }
}
