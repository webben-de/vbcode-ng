/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, type OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { SessionState } from '../app/session.state';
import { SupabaseService } from '../services/supabase.service';
import { EventsService } from '../services/events.service';
import { ActionsService } from '../services/action.service';
import type { EventResponse } from '../types/EventDTO';
import { QuickAccessNavComponent, createUserNavCards } from '../components/quick-access-nav.component';

@Component({
  selector: 'app-user-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTooltipModule,
    QuickAccessNavComponent,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <!-- Header -->
      <header class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-2xl">
        <div class="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <mat-icon class="!text-3xl md:!text-4xl !w-8 md:!w-10 !h-8 md:!h-10">sports_volleyball</mat-icon>
              </div>
              <div>
                <h1 class="text-2xl md:text-4xl font-bold tracking-tight">{{ 'dashboard-welcome' | transloco }}</h1>
                <p class="text-blue-100 text-sm md:text-base mt-1">{{ getUserGreeting() }}, {{ getUserName() }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button mat-icon-button [matMenuTriggerFor]="menu" class="!text-white hover:bg-white/10">
                <mat-icon>account_circle</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item disabled>
                  <mat-icon>email</mat-icon>
                  <span class="text-sm">{{ session()?.user?.email }}</span>
                </button>
                <mat-divider></mat-divider>
                <button mat-menu-item (click)="logout()">
                  <mat-icon>logout</mat-icon>
                  <span>{{ 'logout' | transloco }}</span>
                </button>
              </mat-menu>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="container mx-auto px-4 md:px-6 py-6 md:py-8">
        @if (isLoading) {
        <div class="flex items-center justify-center py-20">
          <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">{{ 'loading-dashboard' | transloco }}</p>
          </div>
        </div>
        } @else {
        
        <!-- Statistics Overview -->
        <section class="mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <mat-icon class="text-blue-600">analytics</mat-icon>
            {{ 'your-statistics' | transloco }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <!-- Total Games -->
            <mat-card class="!p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <mat-icon class="text-blue-600 !text-2xl">sports</mat-icon>
                </div>
                <span class="text-3xl font-bold text-blue-600">{{ totalGames }}</span>
              </div>
              <h3 class="text-sm font-medium text-gray-600 mb-1">{{ 'total-games' | transloco }}</h3>
              <p class="text-xs text-gray-500">{{ 'all-time' | transloco }}</p>
            </mat-card>

            <!-- Total Training Sessions -->
            <mat-card class="!p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <mat-icon class="text-green-600 !text-2xl">fitness_center</mat-icon>
                </div>
                <span class="text-3xl font-bold text-green-600">{{ totalTrainingSessions }}</span>
              </div>
              <h3 class="text-sm font-medium text-gray-600 mb-1">{{ 'total-training-sessions' | transloco }}</h3>
              <p class="text-xs text-gray-500">{{ 'all-time' | transloco }}</p>
            </mat-card>

            <!-- Total Actions -->
            <mat-card class="!p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <mat-icon class="text-purple-600 !text-2xl">touch_app</mat-icon>
                </div>
                <span class="text-3xl font-bold text-purple-600">{{ totalActions }}</span>
              </div>
              <h3 class="text-sm font-medium text-gray-600 mb-1">{{ 'total-actions' | transloco }}</h3>
              <p class="text-xs text-gray-500">{{ 'lifetime-performance' | transloco }}</p>
            </mat-card>

            <!-- Average Efficiency -->
            <mat-card class="!p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <mat-icon class="text-orange-600 !text-2xl">trending_up</mat-icon>
                </div>
                <span class="text-3xl font-bold text-orange-600">{{ averageEfficiency }}%</span>
              </div>
              <h3 class="text-sm font-medium text-gray-600 mb-1">{{ 'avg-efficiency' | transloco }}</h3>
              <p class="text-xs text-gray-500">{{ 'overall-performance' | transloco }}</p>
            </mat-card>
          </div>
        </section>

        <!-- Recent Activity & Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Recent Activity -->
          <div class="lg:col-span-2">
            <mat-card class="!p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <mat-icon class="text-indigo-600">history</mat-icon>
                  {{ 'recent-activity' | transloco }}
                </h2>
                <a [routerLink]="[ROUTES.root, ROUTES.games]" mat-button color="primary">
                  {{ 'view-all' | transloco }}
                  <mat-icon class="ml-1">arrow_forward</mat-icon>
                </a>
              </div>
              
              @if (recentEvents.length === 0) {
              <div class="text-center py-12">
                <mat-icon class="!text-6xl !w-16 !h-16 text-gray-300 mb-4">inbox</mat-icon>
                <p class="text-gray-500 mb-4">{{ 'no-recent-activity' | transloco }}</p>
                <a [routerLink]="[ROUTES.root, ROUTES.gameDataEntry]" mat-raised-button color="primary">
                  <mat-icon class="mr-2">add</mat-icon>
                  {{ 'start-first-game' | transloco }}
                </a>
              </div>
              } @else {
              <div class="space-y-3">
                @for (event of recentEvents; track event.id) {
                <div class="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all cursor-pointer border border-gray-100"
                     [routerLink]="[ROUTES.root, ROUTES.games, event.id]">
                  <div class="w-12 h-12 rounded-lg flex items-center justify-center"
                       [class.bg-blue-100]="event.event_type === 'game'"
                       [class.bg-green-100]="event.event_type === 'training'">
                    <mat-icon [class.text-blue-600]="event.event_type === 'game'"
                              [class.text-green-600]="event.event_type === 'training'"
                              class="!text-2xl">
                      {{ event.event_type === 'game' ? 'sports' : 'fitness_center' }}
                    </mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="font-semibold text-gray-900 truncate">{{ event.title }}</h3>
                      <mat-chip class="!h-6 !px-2 !text-xs" 
                                [class.!bg-blue-100]="event.event_type === 'game'"
                                [class.!text-blue-700]="event.event_type === 'game'"
                                [class.!bg-green-100]="event.event_type === 'training'"
                                [class.!text-green-700]="event.event_type === 'training'">
                        {{ event.event_type === 'game' ? ('game' | transloco) : ('training' | transloco) }}
                      </mat-chip>
                    </div>
                    <p class="text-sm text-gray-500">{{ event.date | date:'medium' }}</p>
                  </div>
                  <mat-icon class="text-gray-400">chevron_right</mat-icon>
                </div>
                }
              </div>
              }
            </mat-card>
          </div>

          <!-- Quick Actions -->
          <div>
            <mat-card class="!p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <mat-icon class="text-indigo-600">flash_on</mat-icon>
                {{ 'quick-actions' | transloco }}
              </h2>
              <div class="space-y-3">
                <a [routerLink]="[ROUTES.root, ROUTES.gameDataEntry]" 
                   mat-raised-button 
                   color="primary" 
                   class="!w-full !justify-start !py-6">
                  <mat-icon class="mr-3">add_circle</mat-icon>
                  <span>{{ 'enter-game-data' | transloco }}</span>
                </a>
                <a [routerLink]="[ROUTES.root, ROUTES.trainingDataEntry]" 
                   mat-raised-button 
                   class="!w-full !justify-start !py-6 !bg-green-600 !text-white hover:!bg-green-700">
                  <mat-icon class="mr-3">add_circle</mat-icon>
                  <span>{{ 'enter-training-data' | transloco }}</span>
                </a>
                <a [routerLink]="[ROUTES.root, ROUTES.teams, 'create']" 
                   mat-stroked-button 
                   color="primary" 
                   class="!w-full !justify-start !py-6">
                  <mat-icon class="mr-3">group_add</mat-icon>
                  <span>{{ 'create-a-new-team' | transloco }}</span>
                </a>
                <a [routerLink]="[ROUTES.root, ROUTES.playerProgress]" 
                   mat-stroked-button 
                   color="primary" 
                   class="!w-full !justify-start !py-6">
                  <mat-icon class="mr-3">insights</mat-icon>
                  <span>{{ 'view-progress' | transloco }}</span>
                </a>
              </div>
            </mat-card>
          </div>
        </div>

        <!-- Performance Insights -->
        @if (performanceInsights) {
        <section class="mb-8">
          <mat-card class="!p-6">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <mat-icon class="text-indigo-600">lightbulb</mat-icon>
              {{ 'performance-insights' | transloco }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Action Breakdown -->
              <div>
                <h3 class="font-semibold text-gray-700 mb-4">{{ 'action-breakdown' | transloco }}</h3>
                <div class="space-y-3">
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm text-gray-600">{{ 'serves' | transloco }}</span>
                      <span class="text-sm font-semibold">{{ performanceInsights.serves }} ({{ getPercentage(performanceInsights.serves) }}%)</span>
                    </div>
                    <mat-progress-bar mode="determinate" [value]="getPercentage(performanceInsights.serves)" color="primary"></mat-progress-bar>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm text-gray-600">{{ 'attacks' | transloco }}</span>
                      <span class="text-sm font-semibold">{{ performanceInsights.attacks }} ({{ getPercentage(performanceInsights.attacks) }}%)</span>
                    </div>
                    <mat-progress-bar mode="determinate" [value]="getPercentage(performanceInsights.attacks)" class="!bg-red-100 [&_.mat-mdc-progress-bar-fill]:!bg-red-600"></mat-progress-bar>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm text-gray-600">{{ 'receives' | transloco }}</span>
                      <span class="text-sm font-semibold">{{ performanceInsights.receives }} ({{ getPercentage(performanceInsights.receives) }}%)</span>
                    </div>
                    <mat-progress-bar mode="determinate" [value]="getPercentage(performanceInsights.receives)" class="!bg-green-100 [&_.mat-mdc-progress-bar-fill]:!bg-green-600"></mat-progress-bar>
                  </div>
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm text-gray-600">{{ 'blocks' | transloco }}</span>
                      <span class="text-sm font-semibold">{{ performanceInsights.blocks }} ({{ getPercentage(performanceInsights.blocks) }}%)</span>
                    </div>
                    <mat-progress-bar mode="determinate" [value]="getPercentage(performanceInsights.blocks)" class="!bg-purple-100 [&_.mat-mdc-progress-bar-fill]:!bg-purple-600"></mat-progress-bar>
                  </div>
                </div>
              </div>

              <!-- Quality Metrics -->
              <div>
                <h3 class="font-semibold text-gray-700 mb-4">{{ 'quality-metrics' | transloco }}</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                        <mat-icon class="text-green-700 !text-xl">stars</mat-icon>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">{{ 'aces' | transloco }}</p>
                        <p class="text-2xl font-bold text-green-700">{{ performanceInsights.aces }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                        <mat-icon class="text-red-700 !text-xl">warning</mat-icon>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">{{ 'errors' | transloco }}</p>
                        <p class="text-2xl font-bold text-red-700">{{ performanceInsights.errors }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                        <mat-icon class="text-blue-700 !text-xl">assessment</mat-icon>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">{{ 'ace-error-ratio' | transloco }}</p>
                        <p class="text-2xl font-bold text-blue-700">{{ getAceErrorRatio() }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </mat-card>
        </section>
        }

        <!-- Navigation Grid -->
        <section class="mb-8">
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <mat-icon class="text-indigo-600">apps</mat-icon>
            {{ 'explore-more' | transloco }}
          </h2>
          <app-quick-access-nav [cards]="userNavCards" [size]="'medium'" [columns]="6"></app-quick-access-nav>
        </section>

        }
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      mat-card {
        border-radius: 12px !important;
      }

      a {
        text-decoration: none;
      }
    `,
  ],
})
export class UserLandingPageComponent implements OnInit {
  private readonly supabase = inject(SupabaseService);
  private readonly dom = inject(DomSanitizer);
  private readonly router = inject(Router);
  private readonly eventsService = inject(EventsService);
  private readonly actionsService = inject(ActionsService);

  readonly ROUTES = SVB_APP_ROUTES;
  readonly userNavCards = createUserNavCards();
  session = select(SessionState.session);
  user_player = select(SessionState.user_player);

  // Dashboard state
  isLoading = true;
  totalGames = 0;
  totalTrainingSessions = 0;
  totalActions = 0;
  averageEfficiency = 0;
  recentEvents: EventResponse[] = [];
  performanceInsights: {
    serves: number;
    attacks: number;
    receives: number;
    blocks: number;
    aces: number;
    errors: number;
  } | null = null;
  /**
   *
   */
  updateProfileForm = new FormGroup({
    avatar_url: new FormControl<string>(''),
  });
  /**
   *
   */
  get avatarUrl() {
    return this.updateProfileForm.value.avatar_url as string;
  }

  /**
   *
   */
  _avatarUrl: SafeResourceUrl | undefined;
  /**
   *
   */
  uploading = false;
  /**
   *
   */
  @Input()
  set avatarUrl(url: string | null) {
    if (url) {
      this.downloadImage(url);
    }
  }
  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      await this.loadDashboardData();
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async loadDashboardData(): Promise<void> {
    const player = this.user_player();
    if (!player) return;

    // Load all events for the user
    const allEvents = await this.eventsService.getEventsOfPlayer();
    if (!allEvents) return;

    // Calculate statistics
    this.totalGames = allEvents.filter(e => e.event_type === 'game').length;
    this.totalTrainingSessions = allEvents.filter(e => e.event_type === 'training').length;
    
    // Get recent events (last 5)
    this.recentEvents = allEvents
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    // Load action statistics
    await this.loadActionStatistics(player.id, allEvents);
  }

  async loadActionStatistics(playerId: string, events: EventResponse[]): Promise<void> {
    let totalAces = 0;
    let totalErrors = 0;
    let totalServes = 0;
    let totalAttacks = 0;
    let totalReceives = 0;
    let totalBlocks = 0;
    let totalActionCount = 0;
    let totalGoodActions = 0;

    // Aggregate statistics from all events
    for (const event of events) {
      const actions = await this.actionsService.getActionsOfEventByPlayer(event.id, playerId);
      if (!actions) continue;

      totalActionCount += actions.length;

      for (const action of actions) {
        // Count by kind
        if (action.kind === 'S') totalServes++;
        if (action.kind === 'A') totalAttacks++;
        if (action.kind === 'R') totalReceives++;
        if (action.kind === 'B') totalBlocks++;

        // Count by grade
        if (action.grade === '#') totalAces++;
        if (action.grade === '=') totalErrors++;
        if (action.grade === '+' || action.grade === '#') totalGoodActions++;
      }
    }

    this.totalActions = totalActionCount;
    this.averageEfficiency = totalActionCount > 0 
      ? Math.round((totalGoodActions / totalActionCount) * 100) 
      : 0;

    this.performanceInsights = {
      serves: totalServes,
      attacks: totalAttacks,
      receives: totalReceives,
      blocks: totalBlocks,
      aces: totalAces,
      errors: totalErrors,
    };
  }

  getPercentage(value: number): number {
    if (!this.totalActions || this.totalActions === 0) return 0;
    return Math.round((value / this.totalActions) * 100);
  }

  getAceErrorRatio(): string {
    if (!this.performanceInsights) return '0:0';
    const { aces, errors } = this.performanceInsights;
    return `${aces}:${errors}`;
  }

  getUserGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Guten Morgen';
    if (hour < 18) return 'Guten Tag';
    return 'Guten Abend';
  }

  getUserName(): string {
    const email = this.session()?.user?.email;
    if (!email) return 'Spieler';
    // Return email username part or full email
    return email.split('@')[0] || email;
  }

  getUserInitials(): string {
    const name = this.getUserName();
    const parts = name.split(/[\s.]+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  async logout(): Promise<void> {
    try {
      await this.supabase.signOut();
      await this.router.navigate([this.ROUTES.root]);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  async updateProfile() {
    await this.supabase.updateProfile({
      id: this.session()?.user.id,
      avatar_url: this.updateProfileForm.controls.avatar_url.value,
    });
  }
  /**
   *
   * @param path
   */
  async downloadImage(path: string) {
    try {
      const { data } = await this.supabase.downLoadImage(path);
      if (data instanceof Blob) {
        this._avatarUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error downloading image: ', error.message);
      }
    }
  }
  async uploadAvatar(event: Event) {
    try {
      this.uploading = true;
      const target = event.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `public/${Math.random()}.${fileExt}`;

      await this.supabase.uploadAvatar(filePath, file);
      // this.updateProfileForm.patchValue({
      //   avatar_url: filePath,
      // });
      await this.downloadImage(filePath);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.uploading = false;
    }
  }
  /**
   *
   * @param event
   */
  async updateAvatar(event: string): Promise<void> {
    this.updateProfileForm.patchValue({
      avatar_url: event,
    });
    await this.updateProfile();
  }
}
