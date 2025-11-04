import { CommonModule } from '@angular/common';
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Component, Input, type OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { SessionState } from '../app/session.state';
import { SupabaseService } from '../services/supabase.service';
import { PlayerEventListComponent } from './user-dashboard/player-event-list.component';
import { PlayerLastGameStatsComponent } from './user-dashboard/player-last-game-stats.component';

@Component({
  selector: 'app-user-landing-page',
  standalone: true,
  imports: [
    TranslocoModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    PlayerEventListComponent,
    PlayerLastGameStatsComponent,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <!-- Header -->
      <header class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div class="container mx-auto px-4 py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <mat-icon class="!text-3xl !w-8 !h-8">dashboard</mat-icon>
              </div>
              <div>
                <h1 class="text-3xl font-bold">Mein Dashboard</h1>
                <p class="text-blue-100 text-sm">Willkommen zurück, {{ getUserName() }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button mat-icon-button [matMenuTriggerFor]="menu" class="!text-white">
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
                  <span>Abmelden</span>
                </button>
              </mat-menu>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <!-- Quick Actions -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Schnellzugriff</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a [routerLink]="[ROUTES.root, ROUTES.teams]" class="group">
              <mat-card class="!p-4 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
                <mat-icon class="!text-4xl !w-12 !h-12 text-blue-600 mb-2 group-hover:text-blue-700">groups</mat-icon>
                <h3 class="text-sm font-semibold text-gray-900">Meine Teams</h3>
              </mat-card>
            </a>

            <a [routerLink]="[ROUTES.root, ROUTES.games]" class="group">
              <mat-card class="!p-4 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
                <mat-icon class="!text-4xl !w-12 !h-12 text-indigo-600 mb-2 group-hover:text-indigo-700">event</mat-icon>
                <h3 class="text-sm font-semibold text-gray-900">Spiele</h3>
              </mat-card>
            </a>

            <a [routerLink]="[ROUTES.root, ROUTES.dataentry]" class="group">
              <mat-card class="!p-4 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
                <mat-icon class="!text-4xl !w-12 !h-12 text-purple-600 mb-2 group-hover:text-purple-700">input</mat-icon>
                <h3 class="text-sm font-semibold text-gray-900">Daten erfassen</h3>
              </mat-card>
            </a>

            <a [routerLink]="[ROUTES.root, ROUTES.report]" class="group">
              <mat-card class="!p-4 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
                <mat-icon class="!text-4xl !w-12 !h-12 text-pink-600 mb-2 group-hover:text-pink-700">assessment</mat-icon>
                <h3 class="text-sm font-semibold text-gray-900">Reports</h3>
              </mat-card>
            </a>
          </div>
        </section>

        <!-- User Profile Card -->
        <section class="mb-8">
          <mat-card class="!p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-4">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                >
                  {{ getUserInitials() }}
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900">{{ getUserName() }}</h3>
                  <p class="text-gray-600">{{ session()?.user?.email }}</p>
                </div>
              </div>
              <button mat-icon-button [matMenuTriggerFor]="profileMenu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #profileMenu="matMenu">
                <button mat-menu-item disabled>
                  <mat-icon>settings</mat-icon>
                  <span>Einstellungen (Bald verfügbar)</span>
                </button>
              </mat-menu>
            </div>
          </mat-card>
        </section>

        <!-- Games and Stats Grid -->
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Player Events -->
          <div>
            <app-player-event-list />
          </div>

          <!-- Player Stats -->
          <div>
            <app-player-last-game-stats />
          </div>
        </div>

        <!-- Additional Info Section -->
        <section class="mt-8">
          <mat-card class="!p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <mat-icon class="text-blue-600">info</mat-icon>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Erste Schritte</h3>
                <p class="text-gray-600 mb-4">Beginne mit der Erfassung deiner Spieldaten, um detaillierte Statistiken und Analysen zu erhalten.</p>
                <div class="flex gap-2">
                  <a [routerLink]="[ROUTES.root, ROUTES.dataentry]" mat-raised-button color="primary">
                    <mat-icon class="mr-2">add</mat-icon>
                    Daten erfassen
                  </a>
                  <a [routerLink]="[ROUTES.root, ROUTES.teams, 'create']" mat-stroked-button>
                    <mat-icon class="mr-2">group_add</mat-icon>
                    Team erstellen
                  </a>
                </div>
              </div>
            </div>
          </mat-card>
        </section>
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

  readonly ROUTES = SVB_APP_ROUTES;
  session = select(SessionState.session);
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
    // Future: Load user profile and additional statistics
    // this.avatarUrl = (await this.supabase.getProfile(this.session()?.user.id))?.data.avatar_url;
    console.log('User dashboard initialized');
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
