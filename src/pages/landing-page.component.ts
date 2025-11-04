import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { SessionState } from '../app/session.state';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div class="absolute inset-0 bg-black opacity-10"></div>
        <div class="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <mat-icon class="text-yellow-300">sports_volleyball</mat-icon>
              <span class="text-sm font-semibold">SV Beyendorf Volleyball</span>
            </div>
            <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">S(VB) Code</h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Deine professionelle Volleyball-App für Datenerfassung, Analyse und Spielplanung
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              @if (isLoggedIn()) {
              <a
                [routerLink]="[ROUTES.root, ROUTES.user]"
                mat-raised-button
                class="!bg-white !text-blue-600 !px-8 !py-3 !text-lg !font-semibold hover:!bg-gray-100 transition-all shadow-lg"
              >
                <mat-icon class="mr-2">dashboard</mat-icon>
                Zum Dashboard
              </a>
              } @else {
              <a
                [routerLink]="[ROUTES.root, ROUTES.login]"
                mat-raised-button
                class="!bg-white !text-blue-600 !px-8 !py-3 !text-lg !font-semibold hover:!bg-gray-100 transition-all shadow-lg"
              >
                <mat-icon class="mr-2">login</mat-icon>
                Jetzt starten
              </a>
              }
              <a href="#features" mat-stroked-button class="!border-white !text-white !px-8 !py-3 !text-lg hover:!bg-white/10 transition-all">
                Mehr erfahren
                <mat-icon class="ml-2">arrow_downward</mat-icon>
              </a>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="container mx-auto px-4 py-16 md:py-24">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Alles was du brauchst</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">Professionelle Tools für Training, Analyse und Spielvorbereitung</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Feature 1 -->
          <mat-card class="!p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <mat-icon class="!text-4xl !w-10 !h-10 text-blue-600">edit_note</mat-icon>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Datenerfassung</h3>
              <p class="text-gray-600 leading-relaxed">
                Erfasse alle wichtigen Spielinformationen schnell und einfach. Nutze den bewährten DataVolley Basic Code für präzise Analysen.
              </p>
            </div>
          </mat-card>

          <!-- Feature 2 -->
          <mat-card class="!p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-500">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <mat-icon class="!text-4xl !w-10 !h-10 text-indigo-600">analytics</mat-icon>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Spielanalyse</h3>
              <p class="text-gray-600 leading-relaxed">
                Detaillierte Statistiken und Auswertungen vergangener Spiele. Analysiere Spielerleistungen und identifiziere Verbesserungspotenziale.
              </p>
            </div>
          </mat-card>

          <!-- Feature 3 -->
          <mat-card class="!p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-500">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <mat-icon class="!text-4xl !w-10 !h-10 text-purple-600">rotate_right</mat-icon>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Rotationsplanung</h3>
              <p class="text-gray-600 leading-relaxed">
                Plane deine Start-Rotation strategisch. Visualisiere Aufstellungen und optimiere deine Spieltaktik im Voraus.
              </p>
            </div>
          </mat-card>
        </div>
      </section>

      <!-- Quick Access Section -->
      <section class="bg-gray-50 py-16 md:py-24">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Schnellzugriff</h2>
            <p class="text-xl text-gray-600">Direkt zu den wichtigsten Funktionen</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <a [routerLink]="[ROUTES.root, ROUTES.teams]" class="group">
              <mat-card class="!p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
                <mat-icon class="!text-5xl !w-14 !h-14 text-blue-600 mb-3 group-hover:text-blue-700">groups</mat-icon>
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600">Teams</h3>
                <p class="text-sm text-gray-500 mt-2">Verwalte deine Teams</p>
              </mat-card>
            </a>

            <a [routerLink]="[ROUTES.root, ROUTES.games]" class="group">
              <mat-card class="!p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
                <mat-icon class="!text-5xl !w-14 !h-14 text-indigo-600 mb-3 group-hover:text-indigo-700">event</mat-icon>
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">Spiele</h3>
                <p class="text-sm text-gray-500 mt-2">Alle Events im Überblick</p>
              </mat-card>
            </a>

            <a [routerLink]="[ROUTES.root, ROUTES.dataentry]" class="group">
              <mat-card class="!p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
                <mat-icon class="!text-5xl !w-14 !h-14 text-purple-600 mb-3 group-hover:text-purple-700">input</mat-icon>
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-purple-600">Datenerfassung</h3>
                <p class="text-sm text-gray-500 mt-2">Spieldaten eingeben</p>
              </mat-card>
            </a>

            <a [routerLink]="[ROUTES.root, ROUTES.report]" class="group">
              <mat-card class="!p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
                <mat-icon class="!text-5xl !w-14 !h-14 text-pink-600 mb-3 group-hover:text-pink-700">assessment</mat-icon>
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-pink-600">Reports</h3>
                <p class="text-sm text-gray-500 mt-2">Auswertungen ansehen</p>
              </mat-card>
            </a>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="container mx-auto px-4 py-16 md:py-24">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <mat-icon class="!text-6xl !w-16 !h-16 mb-6 text-yellow-300">emoji_events</mat-icon>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Bereit durchzustarten?</h2>
          <p class="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">Verbessere dein Spiel, verbessere dein Team. Starte jetzt mit S(VB) Code.</p>
          @if (!isLoggedIn()) {
          <a
            [routerLink]="[ROUTES.root, ROUTES.login]"
            mat-raised-button
            class="!bg-white !text-blue-600 !px-8 !py-3 !text-lg !font-semibold hover:!bg-gray-100 transition-all shadow-lg"
          >
            <mat-icon class="mr-2">login</mat-icon>
            Jetzt anmelden
          </a>
          }
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <mat-icon>sports_volleyball</mat-icon>
                S(VB) Code
              </h3>
              <p class="text-gray-400">Professionelle Volleyball-Analyse und Spielvorbereitung</p>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Schnelllinks</h4>
              <ul class="space-y-2 text-gray-400">
                <li><a [routerLink]="[ROUTES.root, ROUTES.teams]" class="hover:text-white transition-colors">Teams</a></li>
                <li><a [routerLink]="[ROUTES.root, ROUTES.games]" class="hover:text-white transition-colors">Spiele</a></li>
                <li><a [routerLink]="[ROUTES.root, ROUTES.report]" class="hover:text-white transition-colors">Reports</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">Kontakt</h4>
              <p class="text-gray-400">
                SV Beyendorf Volleyball<br />
                Magdeburg, Deutschland
              </p>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {{ currentYear }} SV Beyendorf Volleyball. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in {
        animation: fade-in 0.8s ease-out;
      }

      mat-card {
        border-radius: 16px !important;
      }

      a {
        text-decoration: none;
      }
    `,
  ],
})
export class LandingPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  readonly ROUTES = SVB_APP_ROUTES;
  readonly currentYear = new Date().getFullYear();

  session = this.store.select(SessionState.session);
  userSession: unknown = null;

  ngOnInit(): void {
    this.session.subscribe((user) => {
      this.userSession = user;
      if (user) {
        // Optionally auto-redirect logged-in users
        // this.router.navigate([this.ROUTES.root, this.ROUTES.user]);
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.userSession;
  }
}
