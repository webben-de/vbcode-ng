import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { ActionsService } from '../services/action.service';
import { EventsService } from '../services/events.service';
import { PlayerService } from '../services/player.service';
import type { ActionDTO } from '../types/ActionDTO';
import type { EventResponse } from '../types/EventDTO';
import type { PlayerDTO } from '../types/PlayerDTO';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface ActionStats {
  serves: number;
  receives: number;
  attacks: number;
  blocks: number;
  defenses: number;
  sets: number;
}

interface GradeStats {
  aces: number;
  excellent: number;
  good: number;
  ok: number;
  poor: number;
  errors: number;
}

interface ActionGradeBreakdown {
  serve: { aces: number; excellent: number; good: number; ok: number; poor: number; errors: number };
  receive: { aces: number; excellent: number; good: number; ok: number; poor: number; errors: number };
  attack: { aces: number; excellent: number; good: number; ok: number; poor: number; errors: number };
  block: { aces: number; excellent: number; good: number; ok: number; poor: number; errors: number };
  defense: { aces: number; excellent: number; good: number; ok: number; poor: number; errors: number };
  set: { aces: number; excellent: number; good: number; ok: number; poor: number; errors: number };
}

interface EventPerformance {
  event: EventResponse;
  actions: ActionDTO[];
  actionStats: ActionStats;
  gradeStats: GradeStats;
  actionGradeBreakdown: ActionGradeBreakdown;
  totalActions: number;
  efficiency: number;
  serveEfficiency: number;
  receiveEfficiency: number;
  attackEfficiency: number;
  blockEfficiency: number;
  defenseEfficiency: number;
  setEfficiency: number;
}

@Component({
  selector: 'app-player-detail-stats',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    TranslocoModule,
    NgxEchartsDirective,
  ],
  providers: [provideEcharts()],
  template: `
    <div class="flex flex-col p-4 md:p-6 max-w-7xl mx-auto w-full">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div class="flex items-center gap-4">
          <button mat-icon-button [routerLink]="[ROUTES.root, ROUTES.teams]">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold">{{ player?.name }}</h1>
            <div class="flex items-center gap-2 mt-1">
              <span class="badge badge-lg">{{ 'jersey-number' | transloco }}: {{ player?.trikot }}</span>
              @if (player && player.roles && player.roles.length > 0) {
              <span class="text-sm text-gray-600">{{ player.roles.join(', ') }}</span>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      @if (!isLoading && performances.length > 0) {
      <mat-card class="mb-6">
        <mat-card-content>
          <div class="flex flex-col md:flex-row gap-4 items-end">
            <!-- Event Type Filter -->
            <mat-form-field class="flex-1">
              <mat-label>{{ 'event-type' | transloco }}</mat-label>
              <mat-select [formControl]="eventTypeFilter">
                <mat-option value="all">{{ 'all-events' | transloco }}</mat-option>
                <mat-option value="game">{{ 'games' | transloco }}</mat-option>
                <mat-option value="training">{{ 'training-sessions' | transloco }}</mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Date Range Preset -->
            <mat-form-field class="flex-1">
              <mat-label>{{ 'time-period' | transloco }}</mat-label>
              <mat-select [formControl]="dateRangePreset" (selectionChange)="onDateRangePresetChange()">
                <mat-option value="all">{{ 'all-time' | transloco }}</mat-option>
                <mat-option value="last-7">{{ 'last-7-days' | transloco }}</mat-option>
                <mat-option value="last-30">{{ 'last-30-days' | transloco }}</mat-option>
                <mat-option value="last-90">{{ 'last-90-days' | transloco }}</mat-option>
                <mat-option value="last-6-months">{{ 'last-6-months' | transloco }}</mat-option>
                <mat-option value="last-year">{{ 'last-year' | transloco }}</mat-option>
                <mat-option value="custom">{{ 'custom-range' | transloco }}</mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Custom Date Range -->
            @if (dateRangePreset.value === 'custom') {
            <mat-form-field class="flex-1">
              <mat-label>{{ 'start-date' | transloco }}</mat-label>
              <input matInput [matDatepicker]="startPicker" [formControl]="startDateControl" (dateChange)="onCustomDateChange()" />
              <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
              <mat-datepicker #startPicker></mat-datepicker>
            </mat-form-field>

            <mat-form-field class="flex-1">
              <mat-label>{{ 'end-date' | transloco }}</mat-label>
              <input matInput [matDatepicker]="endPicker" [formControl]="endDateControl" (dateChange)="onCustomDateChange()" />
              <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
              <mat-datepicker #endPicker></mat-datepicker>
            </mat-form-field>
            }

            <!-- Comparison Mode Toggle -->
            <button mat-raised-button [color]="comparisonMode ? 'primary' : ''" (click)="toggleComparisonMode()" class="whitespace-nowrap">
              <mat-icon>{{ comparisonMode ? 'compare' : 'compare_arrows' }}</mat-icon>
              {{ comparisonMode ? ('comparison-active' | transloco) : ('enable-comparison' | transloco) }}
            </button>

            <!-- Reset Filters -->
            <button mat-icon-button matTooltip="{{ 'reset-filters' | transloco }}" (click)="resetFilters()">
              <mat-icon>refresh</mat-icon>
            </button>
          </div>

          <!-- Comparison Period Selector -->
          @if (comparisonMode) {
          <div class="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 class="text-sm font-semibold mb-3 text-blue-900">{{ 'comparison-settings' | transloco }}</h3>
            <div class="flex flex-col md:flex-row gap-4 items-end">
              <mat-form-field class="flex-1">
                <mat-label>{{ 'compare-with' | transloco }}</mat-label>
                <mat-select [formControl]="comparisonPeriodPreset" (selectionChange)="onComparisonPresetChange()">
                  <mat-option value="previous-period">{{ 'previous-period' | transloco }}</mat-option>
                  <mat-option value="previous-month">{{ 'previous-month' | transloco }}</mat-option>
                  <mat-option value="previous-quarter">{{ 'previous-quarter' | transloco }}</mat-option>
                  <mat-option value="previous-year">{{ 'previous-year' | transloco }}</mat-option>
                  <mat-option value="custom">{{ 'custom-period' | transloco }}</mat-option>
                </mat-select>
              </mat-form-field>

              @if (comparisonPeriodPreset.value === 'custom') {
              <mat-form-field class="flex-1">
                <mat-label>{{ 'comparison-start' | transloco }}</mat-label>
                <input matInput [matDatepicker]="compStartPicker" [formControl]="comparisonStartDateControl" (dateChange)="onComparisonCustomDateChange()" />
                <mat-datepicker-toggle matSuffix [for]="compStartPicker"></mat-datepicker-toggle>
                <mat-datepicker #compStartPicker></mat-datepicker>
              </mat-form-field>

              <mat-form-field class="flex-1">
                <mat-label>{{ 'comparison-end' | transloco }}</mat-label>
                <input matInput [matDatepicker]="compEndPicker" [formControl]="comparisonEndDateControl" (dateChange)="onComparisonCustomDateChange()" />
                <mat-datepicker-toggle matSuffix [for]="compEndPicker"></mat-datepicker-toggle>
                <mat-datepicker #compEndPicker></mat-datepicker>
              </mat-form-field>
              }
            </div>

            <!-- Comparison Stats Summary -->
            @if (comparisonStats) {
            <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-600">{{ 'efficiency-change' | transloco }}</div>
                <div
                  class="text-lg font-bold"
                  [class.text-green-600]="comparisonStats.efficiencyChange > 0"
                  [class.text-red-600]="comparisonStats.efficiencyChange < 0"
                  [class.text-gray-600]="comparisonStats.efficiencyChange === 0"
                >
                  {{ comparisonStats.efficiencyChange > 0 ? '+' : '' }}{{ comparisonStats.efficiencyChange }}%
                </div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-600">{{ 'actions-change' | transloco }}</div>
                <div
                  class="text-lg font-bold"
                  [class.text-green-600]="comparisonStats.actionsChange > 0"
                  [class.text-red-600]="comparisonStats.actionsChange < 0"
                  [class.text-gray-600]="comparisonStats.actionsChange === 0"
                >
                  {{ comparisonStats.actionsChange > 0 ? '+' : '' }}{{ comparisonStats.actionsChange }}
                </div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-600">{{ 'aces-change' | transloco }}</div>
                <div
                  class="text-lg font-bold"
                  [class.text-green-600]="comparisonStats.acesChange > 0"
                  [class.text-red-600]="comparisonStats.acesChange < 0"
                  [class.text-gray-600]="comparisonStats.acesChange === 0"
                >
                  {{ comparisonStats.acesChange > 0 ? '+' : '' }}{{ comparisonStats.acesChange }}
                </div>
              </div>
              <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="text-xs text-gray-600">{{ 'errors-change' | transloco }}</div>
                <div
                  class="text-lg font-bold"
                  [class.text-red-600]="comparisonStats.errorsChange > 0"
                  [class.text-green-600]="comparisonStats.errorsChange < 0"
                  [class.text-gray-600]="comparisonStats.errorsChange === 0"
                >
                  {{ comparisonStats.errorsChange > 0 ? '+' : '' }}{{ comparisonStats.errorsChange }}
                </div>
              </div>
            </div>
            }
          </div>
          }

          <!-- Active Filters Display -->
          @if (hasActiveFilters()) {
          <div class="mt-4 flex flex-wrap gap-2 items-center">
            <span class="text-sm text-gray-600">{{ 'active-filters' | transloco }}:</span>
            @if (eventTypeFilter.value !== 'all') {
            <span class="badge badge-primary">{{ eventTypeFilter.value === 'game' ? ('games' | transloco) : ('training-sessions' | transloco) }}</span>
            } @if (dateRangePreset.value !== 'all') {
            <span class="badge badge-secondary">{{ getDateRangeLabel() }}</span>
            } @if (comparisonMode) {
            <span class="badge badge-accent">{{ 'comparison-mode' | transloco }}</span>
            }
          </div>
          }
        </mat-card-content>
      </mat-card>
      } @if (isLoading) {
      <div class="flex justify-center items-center py-20">
        <div class="loading loading-spinner loading-lg"></div>
      </div>
      } @else if (performances.length === 0) {
      <div class="alert alert-info">
        <mat-icon>info</mat-icon>
        <span>{{ 'no-performance-data' | transloco }}</span>
      </div>
      } @else {

      <!-- Overall Statistics Card -->
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title>{{ 'overall-statistics' | transloco }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="stat bg-base-200 rounded-lg p-4">
              <div class="stat-title text-sm">{{ 'total-events' | transloco }}</div>
              <div class="stat-value text-2xl text-primary">{{ performances.length }}</div>
            </div>
            <div class="stat bg-base-200 rounded-lg p-4">
              <div class="stat-title text-sm">{{ 'total-actions' | transloco }}</div>
              <div class="stat-value text-2xl text-secondary">{{ overallStats.totalActions }}</div>
            </div>
            <div class="stat bg-base-200 rounded-lg p-4">
              <div class="stat-title text-sm">{{ 'avg-efficiency' | transloco }}</div>
              <div class="stat-value text-2xl text-success">{{ overallStats.avgEfficiency }}%</div>
            </div>
            <div class="stat bg-base-200 rounded-lg p-4">
              <div class="stat-title text-sm">{{ 'aces' | transloco }} / {{ 'errors' | transloco }}</div>
              <div class="stat-value text-2xl">
                <span class="text-success">{{ overallStats.totalAces }}</span>
                <span class="text-sm text-gray-500 mx-1">/</span>
                <span class="text-error">{{ overallStats.totalErrors }}</span>
              </div>
            </div>
          </div>

          <!-- Overall Performance Spider Chart -->
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-3">{{ 'performance-distribution' | transloco }}</h3>
            <div echarts [options]="overallSpiderChartOptions" class="w-full h-[400px]"></div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Grade Distribution and Action Efficiency -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Grade Distribution Chart -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ 'grade-distribution' | transloco }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            @if (gradeChartOptions) {
            <div echarts [options]="gradeChartOptions" class="w-full h-[350px]"></div>
            }
          </mat-card-content>
        </mat-card>

        <!-- Action Efficiency Chart -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ 'action-efficiency' | transloco }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            @if (actionGradeChartOptions) {
            <div echarts [options]="actionGradeChartOptions" class="w-full h-[350px]"></div>
            }
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Action by Grade Heatmap -->
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title>{{ 'action-grade-breakdown' | transloco }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          @if (actionGradeHeatmapOptions) {
          <div echarts [options]="actionGradeHeatmapOptions" class="w-full h-[400px]"></div>
          }
        </mat-card-content>
      </mat-card>

      <!-- Action Breakdown Statistics -->
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title>{{ 'action-breakdown' | transloco }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div class="stat bg-blue-50 rounded-lg p-4">
              <div class="stat-title text-sm text-blue-700">{{ 'serves' | transloco }}</div>
              <div class="stat-value text-xl text-blue-900">{{ overallStats.totalServes }}</div>
              <div class="stat-desc text-xs">
                <span class="text-success">{{ overallStats.serveAces }} {{ 'aces' | transloco }}</span> /
                <span class="text-error">{{ overallStats.serveErrors }} {{ 'errors' | transloco }}</span>
              </div>
            </div>
            <div class="stat bg-green-50 rounded-lg p-4">
              <div class="stat-title text-sm text-green-700">{{ 'receives' | transloco }}</div>
              <div class="stat-value text-xl text-green-900">{{ overallStats.totalReceives }}</div>
              <div class="stat-desc text-xs text-error">{{ overallStats.receiveErrors }} {{ 'errors' | transloco }}</div>
            </div>
            <div class="stat bg-purple-50 rounded-lg p-4">
              <div class="stat-title text-sm text-purple-700">{{ 'attacks' | transloco }}</div>
              <div class="stat-value text-xl text-purple-900">{{ overallStats.totalAttacks }}</div>
              <div class="stat-desc text-xs">
                <span class="text-success">{{ overallStats.attackKills }} {{ 'kills' | transloco }}</span> /
                <span class="text-error">{{ overallStats.attackErrors }} {{ 'errors' | transloco }}</span>
              </div>
            </div>
            <div class="stat bg-orange-50 rounded-lg p-4">
              <div class="stat-title text-sm text-orange-700">{{ 'blocks' | transloco }}</div>
              <div class="stat-value text-xl text-orange-900">{{ overallStats.totalBlocks }}</div>
              <div class="stat-desc text-xs text-success">{{ overallStats.blockKills }} {{ 'kills' | transloco }}</div>
            </div>
            <div class="stat bg-yellow-50 rounded-lg p-4">
              <div class="stat-title text-sm text-yellow-700">{{ 'defenses' | transloco }}</div>
              <div class="stat-value text-xl text-yellow-900">{{ overallStats.totalDefenses }}</div>
            </div>
            <div class="stat bg-pink-50 rounded-lg p-4">
              <div class="stat-title text-sm text-pink-700">{{ 'sets' | transloco }}</div>
              <div class="stat-value text-xl text-pink-900">{{ overallStats.totalSets }}</div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Event Type Filter -->
      <div class="mb-4">
        <mat-form-field class="w-full md:w-64">
          <mat-label>{{ 'filter-by-type' | transloco }}</mat-label>
          <mat-select [formControl]="eventTypeFilter">
            <mat-option value="all">{{ 'all-events' | transloco }}</mat-option>
            <mat-option value="game">{{ 'games' | transloco }}</mat-option>
            <mat-option value="training">{{ 'training-sessions' | transloco }}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <!-- Action-Specific Performance Evolution -->
      @if (filteredPerformances.length > 1) {
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title>{{ 'performance-evolution' | transloco }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <!-- Action Type Selector -->
          <mat-form-field class="w-full md:w-64 mb-4">
            <mat-label>{{ 'select-action-type' | transloco }}</mat-label>
            <mat-select [formControl]="selectedAction">
              <mat-option value="serve">{{ 'serves' | transloco }}</mat-option>
              <mat-option value="receive">{{ 'receives' | transloco }}</mat-option>
              <mat-option value="attack">{{ 'attacks' | transloco }}</mat-option>
              <mat-option value="block">{{ 'blocks' | transloco }}</mat-option>
              <mat-option value="defense">{{ 'defenses' | transloco }}</mat-option>
              <mat-option value="set">{{ 'sets' | transloco }}</mat-option>
            </mat-select>
          </mat-form-field>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Action Efficiency Over Time -->
            <div>
              <h3 class="text-lg font-semibold mb-3">{{ 'efficiency-over-time' | transloco }}</h3>
              @if (actionEvolutionChartOptions) {
              <div echarts [options]="actionEvolutionChartOptions" class="w-full h-[350px]"></div>
              }
            </div>

            <!-- Grade Distribution Over Time -->
            <div>
              <h3 class="text-lg font-semibold mb-3">{{ 'grade-evolution' | transloco }}</h3>
              @if (actionGradeEvolutionChartOptions) {
              <div echarts [options]="actionGradeEvolutionChartOptions" class="w-full h-[350px]"></div>
              }
            </div>
          </div>

          <!-- Performance Summary Table -->
          <div class="mt-6 overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>{{ 'date' | transloco }}</th>
                  <th>{{ 'event' | transloco }}</th>
                  <th class="text-center">{{ 'total' | transloco }}</th>
                  <th class="text-center text-green-600">{{ 'aces' | transloco }}</th>
                  <th class="text-center text-blue-600">{{ 'excellent' | transloco }}</th>
                  <th class="text-center text-purple-600">{{ 'good' | transloco }}</th>
                  <th class="text-center text-yellow-600">{{ 'ok' | transloco }}</th>
                  <th class="text-center text-orange-600">{{ 'poor' | transloco }}</th>
                  <th class="text-center text-red-600">{{ 'errors' | transloco }}</th>
                  <th class="text-center">{{ 'efficiency' | transloco }}</th>
                </tr>
              </thead>
              <tbody>
                @for (perf of filteredPerformances; track perf.event.id) { @if (getActionTotal(perf, selectedAction.value!) > 0) {
                <tr>
                  <td>{{ perf.event.date | date : 'short' }}</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <span>{{ perf.event.title }}</span>
                      <span
                        class="badge badge-sm"
                        [class.badge-primary]="perf.event.event_type === 'game'"
                        [class.badge-success]="perf.event.event_type === 'training'"
                      >
                        {{ perf.event.event_type === 'training' ? ('training' | transloco) : ('game' | transloco) }}
                      </span>
                    </div>
                  </td>
                  <td class="text-center font-semibold">{{ getActionTotal(perf, selectedAction.value!) }}</td>
                  <td class="text-center text-green-600">{{ getActionGrade(perf, selectedAction.value!, 'aces') }}</td>
                  <td class="text-center text-blue-600">{{ getActionGrade(perf, selectedAction.value!, 'excellent') }}</td>
                  <td class="text-center text-purple-600">{{ getActionGrade(perf, selectedAction.value!, 'good') }}</td>
                  <td class="text-center text-yellow-600">{{ getActionGrade(perf, selectedAction.value!, 'ok') }}</td>
                  <td class="text-center text-orange-600">{{ getActionGrade(perf, selectedAction.value!, 'poor') }}</td>
                  <td class="text-center text-red-600">{{ getActionGrade(perf, selectedAction.value!, 'errors') }}</td>
                  <td class="text-center">
                    <span
                      class="badge"
                      [class.badge-success]="getActionEfficiencyValue(perf, selectedAction.value!) >= 70"
                      [class.badge-warning]="
                        getActionEfficiencyValue(perf, selectedAction.value!) >= 50 && getActionEfficiencyValue(perf, selectedAction.value!) < 70
                      "
                      [class.badge-error]="getActionEfficiencyValue(perf, selectedAction.value!) < 50"
                    >
                      {{ getActionEfficiencyValue(perf, selectedAction.value!) }}%
                    </span>
                  </td>
                </tr>
                } }
              </tbody>
            </table>
          </div>
        </mat-card-content>
      </mat-card>
      }

      <!-- Training Session Comparison -->
      @if (filteredPerformances.length > 1) {
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title>{{ 'session-comparison' | transloco }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <!-- Multi-select for sessions to compare -->
          <mat-form-field class="w-full mb-4">
            <mat-label>{{ 'select-sessions-to-compare' | transloco }}</mat-label>
            <mat-select [formControl]="selectedSessionsControl" multiple>
              @for (perf of filteredPerformances; track perf.event.id) {
              <mat-option [value]="perf">
                {{ perf.event.title }} ({{ perf.event.date | date : 'short' }})
                <span
                  class="badge badge-sm ml-2"
                  [class.badge-primary]="perf.event.event_type === 'game'"
                  [class.badge-success]="perf.event.event_type === 'training'"
                >
                  {{ perf.event.event_type === 'training' ? ('training' | transloco) : ('game' | transloco) }}
                </span>
              </mat-option>
              }
            </mat-select>
          </mat-form-field>

          @if (comparisonChartOptions) {
          <div echarts [options]="comparisonChartOptions" class="w-full h-[400px]"></div>
          }
        </mat-card-content>
      </mat-card>
      }

      <!-- Individual Event Performance -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ 'event-by-event-performance' | transloco }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="space-y-4">
            @for (perf of filteredPerformances; track perf.event.id) {
            <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-lg font-semibold">{{ perf.event.title }}</h3>
                    <span class="badge" [class.badge-primary]="perf.event.event_type === 'game'" [class.badge-success]="perf.event.event_type === 'training'">
                      {{ perf.event.event_type === 'training' ? ('training' | transloco) : ('game' | transloco) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600">{{ perf.event.date | date : 'full' }}</p>
                </div>
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div class="text-2xl font-bold text-primary">{{ perf.totalActions }}</div>
                    <div class="text-xs text-gray-600">{{ 'actions' | transloco }}</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-success">{{ perf.gradeStats.aces }}</div>
                    <div class="text-xs text-gray-600">{{ 'aces' | transloco }}</div>
                  </div>
                  <div>
                    <div
                      class="text-2xl font-bold"
                      [class.text-success]="perf.efficiency >= 70"
                      [class.text-warning]="perf.efficiency >= 50 && perf.efficiency < 70"
                      [class.text-error]="perf.efficiency < 50"
                    >
                      {{ perf.efficiency }}%
                    </div>
                    <div class="text-xs text-gray-600">{{ 'efficiency' | transloco }}</div>
                  </div>
                </div>
              </div>

              <!-- Event Spider Chart -->
              <div echarts [options]="getEventSpiderChartOptions(perf)" class="w-full h-[300px]"></div>

              <!-- Detailed Stats Grid -->
              <div class="grid grid-cols-2 md:grid-cols-6 gap-2 mt-4 pt-4 border-t">
                <div class="text-center p-2 bg-blue-50 rounded">
                  <div class="text-lg font-semibold text-blue-700">{{ perf.actionStats.serves }}</div>
                  <div class="text-xs text-gray-600">{{ 'serves' | transloco }}</div>
                </div>
                <div class="text-center p-2 bg-green-50 rounded">
                  <div class="text-lg font-semibold text-green-700">{{ perf.actionStats.receives }}</div>
                  <div class="text-xs text-gray-600">{{ 'receives' | transloco }}</div>
                </div>
                <div class="text-center p-2 bg-purple-50 rounded">
                  <div class="text-lg font-semibold text-purple-700">{{ perf.actionStats.attacks }}</div>
                  <div class="text-xs text-gray-600">{{ 'attacks' | transloco }}</div>
                </div>
                <div class="text-center p-2 bg-orange-50 rounded">
                  <div class="text-lg font-semibold text-orange-700">{{ perf.actionStats.blocks }}</div>
                  <div class="text-xs text-gray-600">{{ 'blocks' | transloco }}</div>
                </div>
                <div class="text-center p-2 bg-yellow-50 rounded">
                  <div class="text-lg font-semibold text-yellow-700">{{ perf.actionStats.defenses }}</div>
                  <div class="text-xs text-gray-600">{{ 'defenses' | transloco }}</div>
                </div>
                <div class="text-center p-2 bg-pink-50 rounded">
                  <div class="text-lg font-semibold text-pink-700">{{ perf.actionStats.sets }}</div>
                  <div class="text-xs text-gray-600">{{ 'sets' | transloco }}</div>
                </div>
              </div>
            </div>
            }
          </div>
        </mat-card-content>
      </mat-card>
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
export class PlayerDetailStatsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private playerService = inject(PlayerService);
  private eventsService = inject(EventsService);
  private actionsService = inject(ActionsService);

  readonly ROUTES = SVB_APP_ROUTES;

  player?: PlayerDTO;
  performances: EventPerformance[] = [];
  isLoading = true;

  eventTypeFilter = new FormControl<'all' | 'game' | 'training'>('all');
  selectedSessionsControl = new FormControl<EventPerformance[]>([]);

  // Date range filtering
  dateRangePreset = new FormControl<string>('all');
  startDateControl = new FormControl<Date | null>(null);
  endDateControl = new FormControl<Date | null>(null);

  // Comparison mode
  comparisonMode = false;
  comparisonPeriodPreset = new FormControl<string>('previous-period');
  comparisonStartDateControl = new FormControl<Date | null>(null);
  comparisonEndDateControl = new FormControl<Date | null>(null);
  comparisonStats: {
    efficiencyChange: number;
    actionsChange: number;
    acesChange: number;
    errorsChange: number;
  } | null = null;

  overallSpiderChartOptions: EChartsOption | null = null;
  comparisonChartOptions: EChartsOption | null = null;

  overallStats = {
    totalActions: 0,
    totalAces: 0,
    totalErrors: 0,
    avgEfficiency: 0,
    totalServes: 0,
    totalReceives: 0,
    totalAttacks: 0,
    totalBlocks: 0,
    totalDefenses: 0,
    totalSets: 0,
    serveAces: 0,
    serveErrors: 0,
    receiveErrors: 0,
    attackKills: 0,
    attackErrors: 0,
    blockKills: 0,
  };

  gradeChartOptions: EChartsOption | null = null;
  actionGradeChartOptions: EChartsOption | null = null;
  actionGradeHeatmapOptions: EChartsOption | null = null;

  // Action-specific evolution charts
  selectedAction = new FormControl<string>('serve');
  actionEvolutionChartOptions: EChartsOption | null = null;
  actionGradeEvolutionChartOptions: EChartsOption | null = null;
  selectedTabIndex = 0;

  get filteredPerformances(): EventPerformance[] {
    const filterType = this.eventTypeFilter.value;
    let filtered = filterType === 'all' ? this.performances : this.performances.filter((p) => p.event.event_type === filterType);

    // Apply date range filter
    const dateRange = this.getActiveDateRange();
    if (dateRange) {
      filtered = filtered.filter((p) => {
        const eventDate = new Date(p.event.date);
        return eventDate >= dateRange.start && eventDate <= dateRange.end;
      });
    }

    return filtered;
  }

  get comparisonPerformances(): EventPerformance[] {
    if (!this.comparisonMode) return [];

    const filterType = this.eventTypeFilter.value;
    let filtered = filterType === 'all' ? this.performances : this.performances.filter((p) => p.event.event_type === filterType);

    const comparisonRange = this.getComparisonDateRange();
    if (comparisonRange) {
      filtered = filtered.filter((p) => {
        const eventDate = new Date(p.event.date);
        return eventDate >= comparisonRange.start && eventDate <= comparisonRange.end;
      });
    }

    return filtered;
  }

  async ngOnInit() {
    const playerId = this.route.snapshot.params['id'];
    if (!playerId) {
      this.router.navigate([this.ROUTES.root, this.ROUTES.teams]);
      return;
    }

    await this.loadPlayerData(playerId);

    // Watch for filter changes
    this.eventTypeFilter.valueChanges.subscribe(() => {
      this.selectedSessionsControl.setValue([]);
    });

    // Watch for session selection changes
    this.selectedSessionsControl.valueChanges.subscribe((selected) => {
      if (selected && selected.length > 0) {
        this.updateComparisonChart(selected);
      } else {
        this.comparisonChartOptions = null;
      }
    });

    // Watch for action selection changes
    this.selectedAction.valueChanges.subscribe(() => {
      this.generateActionEvolutionCharts();
    });

    // Watch for filter changes to recalculate stats
    this.eventTypeFilter.valueChanges.subscribe(() => this.recalculateStats());
    this.dateRangePreset.valueChanges.subscribe(() => this.recalculateStats());
  }

  // Date range and comparison methods
  getActiveDateRange(): { start: Date; end: Date } | null {
    const preset = this.dateRangePreset.value;
    const now = new Date();

    if (preset === 'all') return null;

    if (preset === 'custom') {
      const start = this.startDateControl.value;
      const end = this.endDateControl.value;
      if (start && end) {
        return { start, end };
      }
      return null;
    }

    const start = new Date();
    switch (preset) {
      case 'last-7':
        start.setDate(now.getDate() - 7);
        break;
      case 'last-30':
        start.setDate(now.getDate() - 30);
        break;
      case 'last-90':
        start.setDate(now.getDate() - 90);
        break;
      case 'last-6-months':
        start.setMonth(now.getMonth() - 6);
        break;
      case 'last-year':
        start.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return null;
    }

    return { start, end: now };
  }

  getComparisonDateRange(): { start: Date; end: Date } | null {
    if (!this.comparisonMode) return null;

    const preset = this.comparisonPeriodPreset.value;

    if (preset === 'custom') {
      const start = this.comparisonStartDateControl.value;
      const end = this.comparisonEndDateControl.value;
      if (start && end) {
        return { start, end };
      }
      return null;
    }

    const currentRange = this.getActiveDateRange();
    if (!currentRange) return null;

    const duration = currentRange.end.getTime() - currentRange.start.getTime();

    let start: Date;
    let end: Date;

    switch (preset) {
      case 'previous-period':
        end = new Date(currentRange.start);
        start = new Date(end.getTime() - duration);
        break;
      case 'previous-month':
        end = new Date();
        end.setMonth(end.getMonth() - 1);
        start = new Date(end);
        start.setMonth(start.getMonth() - 1);
        break;
      case 'previous-quarter':
        end = new Date();
        end.setMonth(end.getMonth() - 3);
        start = new Date(end);
        start.setMonth(start.getMonth() - 3);
        break;
      case 'previous-year':
        end = new Date();
        end.setFullYear(end.getFullYear() - 1);
        start = new Date(end);
        start.setFullYear(start.getFullYear() - 1);
        break;
      default:
        return null;
    }

    return { start, end };
  }

  onDateRangePresetChange() {
    if (this.dateRangePreset.value !== 'custom') {
      this.startDateControl.setValue(null);
      this.endDateControl.setValue(null);
    }
    this.recalculateStats();
  }

  onCustomDateChange() {
    this.recalculateStats();
  }

  onComparisonPresetChange() {
    if (this.comparisonPeriodPreset.value !== 'custom') {
      this.comparisonStartDateControl.setValue(null);
      this.comparisonEndDateControl.setValue(null);
    }
    this.calculateComparisonStats();
  }

  onComparisonCustomDateChange() {
    this.calculateComparisonStats();
  }

  toggleComparisonMode() {
    this.comparisonMode = !this.comparisonMode;
    if (this.comparisonMode) {
      this.calculateComparisonStats();
    } else {
      this.comparisonStats = null;
    }
  }

  resetFilters() {
    this.eventTypeFilter.setValue('all');
    this.dateRangePreset.setValue('all');
    this.startDateControl.setValue(null);
    this.endDateControl.setValue(null);
    this.comparisonMode = false;
    this.comparisonPeriodPreset.setValue('previous-period');
    this.comparisonStartDateControl.setValue(null);
    this.comparisonEndDateControl.setValue(null);
    this.comparisonStats = null;
    this.recalculateStats();
  }

  hasActiveFilters(): boolean {
    return this.eventTypeFilter.value !== 'all' || this.dateRangePreset.value !== 'all' || this.comparisonMode;
  }

  getDateRangeLabel(): string {
    const preset = this.dateRangePreset.value;
    if (preset === 'custom') {
      const start = this.startDateControl.value;
      const end = this.endDateControl.value;
      if (start && end) {
        return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
      }
      return 'Custom Range';
    }
    return preset || 'All Time';
  }

  recalculateStats() {
    if (this.filteredPerformances.length > 0) {
      this.calculateOverallStats();
      this.generateOverallSpiderChart();
      this.generateActionEvolutionCharts();
    }
    if (this.comparisonMode) {
      this.calculateComparisonStats();
    }
  }

  calculateComparisonStats() {
    if (!this.comparisonMode) {
      this.comparisonStats = null;
      return;
    }

    const currentPerfs = this.filteredPerformances;
    const comparisonPerfs = this.comparisonPerformances;

    if (currentPerfs.length === 0 || comparisonPerfs.length === 0) {
      this.comparisonStats = null;
      return;
    }

    // Calculate current period stats
    let currentActions = 0;
    let currentAces = 0;
    let currentErrors = 0;
    let currentEfficiency = 0;

    for (const perf of currentPerfs) {
      currentActions += perf.totalActions;
      currentAces += perf.gradeStats.aces;
      currentErrors += perf.gradeStats.errors;
      currentEfficiency += perf.efficiency;
    }
    const currentAvgEff = currentPerfs.length > 0 ? currentEfficiency / currentPerfs.length : 0;

    // Calculate comparison period stats
    let compActions = 0;
    let compAces = 0;
    let compErrors = 0;
    let compEfficiency = 0;

    for (const perf of comparisonPerfs) {
      compActions += perf.totalActions;
      compAces += perf.gradeStats.aces;
      compErrors += perf.gradeStats.errors;
      compEfficiency += perf.efficiency;
    }
    const compAvgEff = comparisonPerfs.length > 0 ? compEfficiency / comparisonPerfs.length : 0;

    this.comparisonStats = {
      efficiencyChange: Math.round(currentAvgEff - compAvgEff),
      actionsChange: currentActions - compActions,
      acesChange: currentAces - compAces,
      errorsChange: currentErrors - compErrors,
    };
  }

  async loadPlayerData(playerId: string) {
    try {
      this.isLoading = true;

      // Load player info
      this.player = await this.playerService.getPlayer(playerId);

      // Load all events where player participated
      const allEvents = await this.eventsService.getEvents();
      const playerEvents = allEvents.filter((event) => event.attendees.includes(playerId));

      // Load performance data for each event
      this.performances = [];
      for (const event of playerEvents) {
        const actions = await this.actionsService.getActionsOfEvent(event.id);
        const playerActions = actions.filter((a) => a.player_id.id === playerId);

        if (playerActions.length > 0) {
          const performance = this.calculateEventPerformance(event, playerActions);
          this.performances.push(performance);
        }
      }

      // Sort by date (most recent first)
      this.performances.sort((a, b) => new Date(b.event.date).getTime() - new Date(a.event.date).getTime());

      // Calculate overall stats
      this.calculateOverallStats();

      // Generate overall spider chart
      this.generateOverallSpiderChart();

      // Generate action evolution charts
      this.generateActionEvolutionCharts();
    } catch (error) {
      console.error('Error loading player data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private calculateEventPerformance(event: EventResponse, actions: ActionDTO[]): EventPerformance {
    const actionStats: ActionStats = {
      serves: actions.filter((a) => a.kind === 'S').length,
      receives: actions.filter((a) => a.kind === 'R').length,
      attacks: actions.filter((a) => a.kind === 'A').length,
      blocks: actions.filter((a) => a.kind === 'B').length,
      defenses: actions.filter((a) => a.kind === 'D').length,
      sets: actions.filter((a) => a.kind === 'E').length,
    };

    const gradeStats: GradeStats = {
      aces: actions.filter((a) => a.grade === '#').length,
      excellent: actions.filter((a) => a.grade === '!').length,
      good: actions.filter((a) => a.grade === '+').length,
      ok: actions.filter((a) => a.grade === '/').length,
      poor: actions.filter((a) => a.grade === '-').length,
      errors: actions.filter((a) => a.grade === '=').length,
    };

    // Calculate action-grade breakdown
    const actionGradeBreakdown: ActionGradeBreakdown = {
      serve: this.calculateGradeBreakdownForAction(actions, 'S'),
      receive: this.calculateGradeBreakdownForAction(actions, 'R'),
      attack: this.calculateGradeBreakdownForAction(actions, 'A'),
      block: this.calculateGradeBreakdownForAction(actions, 'B'),
      defense: this.calculateGradeBreakdownForAction(actions, 'D'),
      set: this.calculateGradeBreakdownForAction(actions, 'E'),
    };

    const totalActions = actions.length;
    const positiveActions = gradeStats.aces + gradeStats.excellent + gradeStats.good;
    const efficiency = totalActions > 0 ? Math.round((positiveActions / totalActions) * 100) : 0;

    // Calculate efficiency per action type
    const serveEfficiency = this.calculateActionEfficiency(actions, 'S');
    const receiveEfficiency = this.calculateActionEfficiency(actions, 'R');
    const attackEfficiency = this.calculateActionEfficiency(actions, 'A');
    const blockEfficiency = this.calculateActionEfficiency(actions, 'B');
    const defenseEfficiency = this.calculateActionEfficiency(actions, 'D');
    const setEfficiency = this.calculateActionEfficiency(actions, 'E');

    return {
      event,
      actions,
      actionStats,
      gradeStats,
      actionGradeBreakdown,
      totalActions,
      efficiency,
      serveEfficiency,
      receiveEfficiency,
      attackEfficiency,
      blockEfficiency,
      defenseEfficiency,
      setEfficiency,
    };
  }

  private calculateGradeBreakdownForAction(actions: ActionDTO[], kind: string) {
    const filtered = actions.filter((a) => a.kind === kind);
    return {
      aces: filtered.filter((a) => a.grade === '#').length,
      excellent: filtered.filter((a) => a.grade === '!').length,
      good: filtered.filter((a) => a.grade === '+').length,
      ok: filtered.filter((a) => a.grade === '/').length,
      poor: filtered.filter((a) => a.grade === '-').length,
      errors: filtered.filter((a) => a.grade === '=').length,
    };
  }

  private calculateActionEfficiency(actions: ActionDTO[], kind: string): number {
    const filtered = actions.filter((a) => a.kind === kind);
    if (filtered.length === 0) return 0;

    const positive = filtered.filter((a) => a.grade === '#' || a.grade === '!' || a.grade === '+').length;
    return Math.round((positive / filtered.length) * 100);
  }

  private calculateOverallStats() {
    let totalActions = 0;
    let totalAces = 0;
    let totalErrors = 0;
    let totalEfficiency = 0;
    let totalServes = 0;
    let totalReceives = 0;
    let totalAttacks = 0;
    let totalBlocks = 0;
    let totalDefenses = 0;
    let totalSets = 0;
    let serveAces = 0;
    let serveErrors = 0;
    let receiveErrors = 0;
    let attackKills = 0;
    let attackErrors = 0;
    let blockKills = 0;

    for (const perf of this.performances) {
      totalActions += perf.totalActions;
      totalAces += perf.gradeStats.aces;
      totalErrors += perf.gradeStats.errors;
      totalEfficiency += perf.efficiency;

      totalServes += perf.actionStats.serves;
      totalReceives += perf.actionStats.receives;
      totalAttacks += perf.actionStats.attacks;
      totalBlocks += perf.actionStats.blocks;
      totalDefenses += perf.actionStats.defenses;
      totalSets += perf.actionStats.sets;

      serveAces += perf.actionGradeBreakdown.serve.aces;
      serveErrors += perf.actionGradeBreakdown.serve.errors;
      receiveErrors += perf.actionGradeBreakdown.receive.errors;
      attackKills += perf.actionGradeBreakdown.attack.aces;
      attackErrors += perf.actionGradeBreakdown.attack.errors;
      blockKills += perf.actionGradeBreakdown.block.aces;
    }

    this.overallStats = {
      totalActions,
      totalAces,
      totalErrors,
      avgEfficiency: this.performances.length > 0 ? Math.round(totalEfficiency / this.performances.length) : 0,
      totalServes,
      totalReceives,
      totalAttacks,
      totalBlocks,
      totalDefenses,
      totalSets,
      serveAces,
      serveErrors,
      receiveErrors,
      attackKills,
      attackErrors,
      blockKills,
    };

    // Generate grade distribution chart
    this.generateGradeChart();
    // Generate action-grade heatmap
    this.generateActionGradeChart();
    // Generate action-grade breakdown heatmap
    this.generateActionGradeHeatmap();
  }

  private generateGradeChart() {
    // Aggregate grade statistics across all performances
    let totalAces = 0;
    let totalExcellent = 0;
    let totalGood = 0;
    let totalOk = 0;
    let totalPoor = 0;
    let totalErrors = 0;

    for (const perf of this.performances) {
      totalAces += perf.gradeStats.aces;
      totalExcellent += perf.gradeStats.excellent;
      totalGood += perf.gradeStats.good;
      totalOk += perf.gradeStats.ok;
      totalPoor += perf.gradeStats.poor;
      totalErrors += perf.gradeStats.errors;
    }

    this.gradeChartOptions = {
      title: {
        text: 'Overall Grade Distribution',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          data: [
            { value: totalAces, name: 'Aces', itemStyle: { color: '#10b981' } },
            { value: totalExcellent, name: 'Excellent', itemStyle: { color: '#3b82f6' } },
            { value: totalGood, name: 'Good', itemStyle: { color: '#8b5cf6' } },
            { value: totalOk, name: 'OK', itemStyle: { color: '#f59e0b' } },
            { value: totalPoor, name: 'Poor', itemStyle: { color: '#ef4444' } },
            { value: totalErrors, name: 'Errors', itemStyle: { color: '#dc2626' } },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  private generateActionGradeChart() {
    // Calculate efficiency percentage for each action type
    const serveEfficiency = this.overallStats.totalServes > 0 ? ((this.overallStats.serveAces / this.overallStats.totalServes) * 100).toFixed(1) : '0';
    const receiveEfficiency =
      this.overallStats.totalReceives > 0
        ? (((this.overallStats.totalReceives - this.overallStats.receiveErrors) / this.overallStats.totalReceives) * 100).toFixed(1)
        : '0';
    const attackEfficiency = this.overallStats.totalAttacks > 0 ? ((this.overallStats.attackKills / this.overallStats.totalAttacks) * 100).toFixed(1) : '0';
    const blockEfficiency = this.overallStats.totalBlocks > 0 ? ((this.overallStats.blockKills / this.overallStats.totalBlocks) * 100).toFixed(1) : '0';

    this.actionGradeChartOptions = {
      title: {
        text: 'Action Efficiency',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        data: ['Serve', 'Receive', 'Attack', 'Block'],
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: {
          formatter: '{value}%',
        },
      },
      series: [
        {
          name: 'Efficiency',
          type: 'bar',
          data: [
            {
              value: parseFloat(serveEfficiency),
              itemStyle: { color: '#3b82f6' },
            },
            {
              value: parseFloat(receiveEfficiency),
              itemStyle: { color: '#10b981' },
            },
            {
              value: parseFloat(attackEfficiency),
              itemStyle: { color: '#f59e0b' },
            },
            {
              value: parseFloat(blockEfficiency),
              itemStyle: { color: '#8b5cf6' },
            },
          ],
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%',
          },
        },
      ],
    };
  }

  private generateActionGradeHeatmap() {
    // Aggregate action-grade breakdown across all performances
    const actionGradeData: { serve: GradeStats; receive: GradeStats; attack: GradeStats; block: GradeStats; defense: GradeStats; set: GradeStats } = {
      serve: { aces: 0, excellent: 0, good: 0, ok: 0, poor: 0, errors: 0 },
      receive: { aces: 0, excellent: 0, good: 0, ok: 0, poor: 0, errors: 0 },
      attack: { aces: 0, excellent: 0, good: 0, ok: 0, poor: 0, errors: 0 },
      block: { aces: 0, excellent: 0, good: 0, ok: 0, poor: 0, errors: 0 },
      defense: { aces: 0, excellent: 0, good: 0, ok: 0, poor: 0, errors: 0 },
      set: { aces: 0, excellent: 0, good: 0, ok: 0, poor: 0, errors: 0 },
    };

    for (const perf of this.performances) {
      const breakdown = perf.actionGradeBreakdown;

      // Sum up each action type's grades
      actionGradeData.serve.aces += breakdown.serve.aces;
      actionGradeData.serve.excellent += breakdown.serve.excellent;
      actionGradeData.serve.good += breakdown.serve.good;
      actionGradeData.serve.ok += breakdown.serve.ok;
      actionGradeData.serve.poor += breakdown.serve.poor;
      actionGradeData.serve.errors += breakdown.serve.errors;

      actionGradeData.receive.aces += breakdown.receive.aces;
      actionGradeData.receive.excellent += breakdown.receive.excellent;
      actionGradeData.receive.good += breakdown.receive.good;
      actionGradeData.receive.ok += breakdown.receive.ok;
      actionGradeData.receive.poor += breakdown.receive.poor;
      actionGradeData.receive.errors += breakdown.receive.errors;

      actionGradeData.attack.aces += breakdown.attack.aces;
      actionGradeData.attack.excellent += breakdown.attack.excellent;
      actionGradeData.attack.good += breakdown.attack.good;
      actionGradeData.attack.ok += breakdown.attack.ok;
      actionGradeData.attack.poor += breakdown.attack.poor;
      actionGradeData.attack.errors += breakdown.attack.errors;

      actionGradeData.block.aces += breakdown.block.aces;
      actionGradeData.block.excellent += breakdown.block.excellent;
      actionGradeData.block.good += breakdown.block.good;
      actionGradeData.block.ok += breakdown.block.ok;
      actionGradeData.block.poor += breakdown.block.poor;
      actionGradeData.block.errors += breakdown.block.errors;

      actionGradeData.defense.aces += breakdown.defense.aces;
      actionGradeData.defense.excellent += breakdown.defense.excellent;
      actionGradeData.defense.good += breakdown.defense.good;
      actionGradeData.defense.ok += breakdown.defense.ok;
      actionGradeData.defense.poor += breakdown.defense.poor;
      actionGradeData.defense.errors += breakdown.defense.errors;

      actionGradeData.set.aces += breakdown.set.aces;
      actionGradeData.set.excellent += breakdown.set.excellent;
      actionGradeData.set.good += breakdown.set.good;
      actionGradeData.set.ok += breakdown.set.ok;
      actionGradeData.set.poor += breakdown.set.poor;
      actionGradeData.set.errors += breakdown.set.errors;
    }

    // Prepare data for stacked bar chart
    const actions = ['Serve', 'Receive', 'Attack', 'Block', 'Defense', 'Set'];
    const acesData = [
      actionGradeData.serve.aces,
      actionGradeData.receive.aces,
      actionGradeData.attack.aces,
      actionGradeData.block.aces,
      actionGradeData.defense.aces,
      actionGradeData.set.aces,
    ];
    const excellentData = [
      actionGradeData.serve.excellent,
      actionGradeData.receive.excellent,
      actionGradeData.attack.excellent,
      actionGradeData.block.excellent,
      actionGradeData.defense.excellent,
      actionGradeData.set.excellent,
    ];
    const goodData = [
      actionGradeData.serve.good,
      actionGradeData.receive.good,
      actionGradeData.attack.good,
      actionGradeData.block.good,
      actionGradeData.defense.good,
      actionGradeData.set.good,
    ];
    const okData = [
      actionGradeData.serve.ok,
      actionGradeData.receive.ok,
      actionGradeData.attack.ok,
      actionGradeData.block.ok,
      actionGradeData.defense.ok,
      actionGradeData.set.ok,
    ];
    const poorData = [
      actionGradeData.serve.poor,
      actionGradeData.receive.poor,
      actionGradeData.attack.poor,
      actionGradeData.block.poor,
      actionGradeData.defense.poor,
      actionGradeData.set.poor,
    ];
    const errorsData = [
      actionGradeData.serve.errors,
      actionGradeData.receive.errors,
      actionGradeData.attack.errors,
      actionGradeData.block.errors,
      actionGradeData.defense.errors,
      actionGradeData.set.errors,
    ];

    this.actionGradeHeatmapOptions = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: unknown) => {
          const paramArray = params as Array<{ seriesName: string; value: number; marker: string; axisValue?: string }>;
          let result = `<strong>${paramArray[0].axisValue || ''}</strong><br/>`;
          let total = 0;
          paramArray.forEach((item) => {
            total += item.value;
            result += `${item.marker} ${item.seriesName}: ${item.value}<br/>`;
          });
          result += `<strong>Total: ${total}</strong>`;
          return result;
        },
      },
      legend: {
        data: ['Aces', 'Excellent', 'Good', 'OK', 'Poor', 'Errors'],
        bottom: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '12%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: actions,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Aces',
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
          data: acesData,
          itemStyle: { color: '#10b981' },
          label: {
            show: true,
            position: 'inside',
            formatter: (params: unknown) => {
              const p = params as { value: number };
              return p.value > 0 ? p.value.toString() : '';
            },
          },
        },
        {
          name: 'Excellent',
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
          data: excellentData,
          itemStyle: { color: '#3b82f6' },
          label: {
            show: true,
            position: 'inside',
            formatter: (params: unknown) => {
              const p = params as { value: number };
              return p.value > 0 ? p.value.toString() : '';
            },
          },
        },
        {
          name: 'Good',
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
          data: goodData,
          itemStyle: { color: '#8b5cf6' },
          label: {
            show: true,
            position: 'inside',
            formatter: (params: unknown) => {
              const p = params as { value: number };
              return p.value > 0 ? p.value.toString() : '';
            },
          },
        },
        {
          name: 'OK',
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
          data: okData,
          itemStyle: { color: '#f59e0b' },
          label: {
            show: true,
            position: 'inside',
            formatter: (params: unknown) => {
              const p = params as { value: number };
              return p.value > 0 ? p.value.toString() : '';
            },
          },
        },
        {
          name: 'Poor',
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
          data: poorData,
          itemStyle: { color: '#ef4444' },
          label: {
            show: true,
            position: 'inside',
            formatter: (params: unknown) => {
              const p = params as { value: number };
              return p.value > 0 ? p.value.toString() : '';
            },
          },
        },
        {
          name: 'Errors',
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
          data: errorsData,
          itemStyle: { color: '#dc2626' },
          label: {
            show: true,
            position: 'inside',
            formatter: (params: unknown) => {
              const p = params as { value: number };
              return p.value > 0 ? p.value.toString() : '';
            },
          },
        },
      ],
    };
  }

  private generateOverallSpiderChart() {
    // Aggregate all action stats
    const totalStats: ActionStats = {
      serves: 0,
      receives: 0,
      attacks: 0,
      blocks: 0,
      defenses: 0,
      sets: 0,
    };

    for (const perf of this.performances) {
      totalStats.serves += perf.actionStats.serves;
      totalStats.receives += perf.actionStats.receives;
      totalStats.attacks += perf.actionStats.attacks;
      totalStats.blocks += perf.actionStats.blocks;
      totalStats.defenses += perf.actionStats.defenses;
      totalStats.sets += perf.actionStats.sets;
    }

    const maxValue = Math.max(totalStats.serves, totalStats.receives, totalStats.attacks, totalStats.blocks, totalStats.defenses, totalStats.sets);

    this.overallSpiderChartOptions = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'item',
      },
      radar: {
        indicator: [
          { name: 'Serves', max: maxValue },
          { name: 'Receives', max: maxValue },
          { name: 'Attacks', max: maxValue },
          { name: 'Blocks', max: maxValue },
          { name: 'Defenses', max: maxValue },
          { name: 'Sets', max: maxValue },
        ],
        radius: '70%',
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [totalStats.serves, totalStats.receives, totalStats.attacks, totalStats.blocks, totalStats.defenses, totalStats.sets],
              name: 'Overall Performance',
              areaStyle: {
                color: 'rgba(59, 130, 246, 0.3)',
              },
              lineStyle: {
                color: 'rgba(59, 130, 246, 1)',
                width: 2,
              },
              itemStyle: {
                color: 'rgba(59, 130, 246, 1)',
              },
            },
          ],
        },
      ],
    };
  }

  getEventSpiderChartOptions(perf: EventPerformance): EChartsOption {
    const stats = perf.actionStats;
    const maxValue = Math.max(
      stats.serves,
      stats.receives,
      stats.attacks,
      stats.blocks,
      stats.defenses,
      stats.sets,
      10 // minimum scale
    );

    return {
      tooltip: {
        trigger: 'item',
      },
      radar: {
        indicator: [
          { name: 'Serves', max: maxValue },
          { name: 'Receives', max: maxValue },
          { name: 'Attacks', max: maxValue },
          { name: 'Blocks', max: maxValue },
          { name: 'Defenses', max: maxValue },
          { name: 'Sets', max: maxValue },
        ],
        radius: '65%',
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [stats.serves, stats.receives, stats.attacks, stats.blocks, stats.defenses, stats.sets],
              name: perf.event.title,
              areaStyle: {
                color: perf.event.event_type === 'game' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(34, 197, 94, 0.3)',
              },
              lineStyle: {
                color: perf.event.event_type === 'game' ? 'rgba(99, 102, 241, 1)' : 'rgba(34, 197, 94, 1)',
                width: 2,
              },
              itemStyle: {
                color: perf.event.event_type === 'game' ? 'rgba(99, 102, 241, 1)' : 'rgba(34, 197, 94, 1)',
              },
            },
          ],
        },
      ],
    };
  }

  private updateComparisonChart(selectedPerformances: EventPerformance[]) {
    if (selectedPerformances.length === 0) {
      this.comparisonChartOptions = null;
      return;
    }

    // Calculate max value across all selected sessions
    let maxValue = 0;
    for (const perf of selectedPerformances) {
      const max = Math.max(
        perf.actionStats.serves,
        perf.actionStats.receives,
        perf.actionStats.attacks,
        perf.actionStats.blocks,
        perf.actionStats.defenses,
        perf.actionStats.sets
      );
      if (max > maxValue) maxValue = max;
    }

    const colors = [
      'rgba(59, 130, 246, 0.3)', // blue
      'rgba(34, 197, 94, 0.3)', // green
      'rgba(168, 85, 247, 0.3)', // purple
      'rgba(251, 146, 60, 0.3)', // orange
      'rgba(236, 72, 153, 0.3)', // pink
    ];

    const lineColors = ['rgba(59, 130, 246, 1)', 'rgba(34, 197, 94, 1)', 'rgba(168, 85, 247, 1)', 'rgba(251, 146, 60, 1)', 'rgba(236, 72, 153, 1)'];

    this.comparisonChartOptions = {
      title: {
        text: 'Session Comparison',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        data: selectedPerformances.map((p) => p.event.title),
        bottom: 0,
      },
      radar: {
        indicator: [
          { name: 'Serves', max: maxValue },
          { name: 'Receives', max: maxValue },
          { name: 'Attacks', max: maxValue },
          { name: 'Blocks', max: maxValue },
          { name: 'Defenses', max: maxValue },
          { name: 'Sets', max: maxValue },
        ],
        radius: '60%',
      },
      series: [
        {
          type: 'radar',
          data: selectedPerformances.map((perf, index) => ({
            value: [
              perf.actionStats.serves,
              perf.actionStats.receives,
              perf.actionStats.attacks,
              perf.actionStats.blocks,
              perf.actionStats.defenses,
              perf.actionStats.sets,
            ],
            name: perf.event.title,
            areaStyle: {
              color: colors[index % colors.length],
            },
            lineStyle: {
              color: lineColors[index % lineColors.length],
              width: 2,
            },
            itemStyle: {
              color: lineColors[index % lineColors.length],
            },
          })),
        },
      ],
    };
  }

  // Helper methods for action evolution tracking
  getActionTotal(perf: EventPerformance, actionType: string): number {
    const actionMap: Record<string, keyof ActionStats> = {
      serve: 'serves',
      receive: 'receives',
      attack: 'attacks',
      block: 'blocks',
      defense: 'defenses',
      set: 'sets',
    };
    const key = actionMap[actionType];
    return key ? perf.actionStats[key] : 0;
  }

  getActionGrade(perf: EventPerformance, actionType: string, grade: keyof GradeStats): number {
    const actionMap: Record<string, keyof ActionGradeBreakdown> = {
      serve: 'serve',
      receive: 'receive',
      attack: 'attack',
      block: 'block',
      defense: 'defense',
      set: 'set',
    };
    const key = actionMap[actionType];
    return key ? perf.actionGradeBreakdown[key][grade] : 0;
  }

  getActionEfficiencyValue(perf: EventPerformance, actionType: string): number {
    const efficiencyMap: Record<string, keyof EventPerformance> = {
      serve: 'serveEfficiency',
      receive: 'receiveEfficiency',
      attack: 'attackEfficiency',
      block: 'blockEfficiency',
      defense: 'defenseEfficiency',
      set: 'setEfficiency',
    };
    const key = efficiencyMap[actionType];
    return key ? (perf[key] as number) : 0;
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
  }

  private generateActionEvolutionCharts() {
    const actionType = this.selectedAction.value;
    if (!actionType) return;

    const sortedPerfs = [...this.filteredPerformances].sort((a, b) => new Date(a.event.date).getTime() - new Date(b.event.date).getTime());

    // Filter out performances with no actions of this type
    const relevantPerfs = sortedPerfs.filter((p) => this.getActionTotal(p, actionType) > 0);

    if (relevantPerfs.length === 0) {
      this.actionEvolutionChartOptions = null;
      this.actionGradeEvolutionChartOptions = null;
      return;
    }

    // Efficiency over time chart
    const dates = relevantPerfs.map((p) => new Date(p.event.date).toLocaleDateString());
    const efficiencies = relevantPerfs.map((p) => this.getActionEfficiencyValue(p, actionType));

    this.actionEvolutionChartOptions = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: unknown) => {
          const paramArray = params as Array<{ name: string; seriesName: string; value: number }>;
          const param = paramArray[0];
          return `${param.name}<br/>${param.seriesName}: ${param.value}%`;
        },
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value}%',
        },
      },
      grid: {
        bottom: 80,
        left: 50,
        right: 30,
      },
      series: [
        {
          name: 'Efficiency',
          type: 'line',
          data: efficiencies,
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#3b82f6',
          },
          itemStyle: {
            color: '#3b82f6',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0.1)' },
              ],
            },
          },
          markLine: {
            silent: true,
            lineStyle: {
              color: '#f59e0b',
              type: 'dashed',
            },
            data: [{ yAxis: 70, name: 'Target' }],
            label: {
              formatter: 'Target: {c}%',
            },
          },
        },
      ],
    };

    // Grade distribution stacked area chart
    const acesData = relevantPerfs.map((p) => this.getActionGrade(p, actionType, 'aces'));
    const excellentData = relevantPerfs.map((p) => this.getActionGrade(p, actionType, 'excellent'));
    const goodData = relevantPerfs.map((p) => this.getActionGrade(p, actionType, 'good'));
    const okData = relevantPerfs.map((p) => this.getActionGrade(p, actionType, 'ok'));
    const poorData = relevantPerfs.map((p) => this.getActionGrade(p, actionType, 'poor'));
    const errorsData = relevantPerfs.map((p) => this.getActionGrade(p, actionType, 'errors'));

    this.actionGradeEvolutionChartOptions = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['Aces', 'Excellent', 'Good', 'OK', 'Poor', 'Errors'],
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          rotate: 45,
          interval: 0,
        },
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        bottom: 80,
        left: 50,
        right: 30,
      },
      series: [
        {
          name: 'Aces',
          type: 'bar',
          stack: 'total',
          data: acesData,
          itemStyle: { color: '#10b981' },
        },
        {
          name: 'Excellent',
          type: 'bar',
          stack: 'total',
          data: excellentData,
          itemStyle: { color: '#3b82f6' },
        },
        {
          name: 'Good',
          type: 'bar',
          stack: 'total',
          data: goodData,
          itemStyle: { color: '#8b5cf6' },
        },
        {
          name: 'OK',
          type: 'bar',
          stack: 'total',
          data: okData,
          itemStyle: { color: '#f59e0b' },
        },
        {
          name: 'Poor',
          type: 'bar',
          stack: 'total',
          data: poorData,
          itemStyle: { color: '#ef4444' },
        },
        {
          name: 'Errors',
          type: 'bar',
          stack: 'total',
          data: errorsData,
          itemStyle: { color: '#dc2626' },
        },
      ],
    };
  }
}
