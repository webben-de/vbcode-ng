import { Component, type OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngxs/store';
import { SVB_APP_ROUTES } from '../app/ROUTES';
import { SessionState } from '../app/session.state';

@Component({
  selector: 'app-landing-page',
  template: `
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">S(VB) Code</h1>
          <p class="py-6"></p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    <header class="bg-blue-500 text-white p-4 text-center">
      <h1 class="text-3xl font-bold">Deine Volleyball App</h1>
      <p class="text-lg">Verbessere dein Spiel, verbessere dein Team</p>
    </header>

    <main class="container mx-auto p-4">
      <section class="bg-white rounded-lg shadow-md p-6 my-4">
        <h2 class="text-2xl font-bold mb-4">Datenerfassung leicht gemacht</h2>
        <p>
          Erfasse alle wichtigen Spielinformationen schnell und einfach mit unserem intuitiven Datenerfassungssystem. Nutze den bewährten Basic Code von
          DataVolley für eine präzise Analyse.
        </p>
      </section>

      <section class="bg-white rounded-lg shadow-md p-6 my-4">
        <h2 class="text-2xl font-bold mb-4">Lerne aus der Vergangenheit</h2>
        <p>
          Greife auf detaillierte Statistiken vergangener Spiele zu. Analysiere Bewertungen, Spielerleistungen und Aktionen, um dein Spiel zu verbessern und
          fundierte Entscheidungen zu treffen.
        </p>
      </section>

      <section class="bg-white rounded-lg shadow-md p-6 my-4">
        <h2 class="text-2xl font-bold mb-4">Plane für den Erfolg</h2>
        <p>
          Plane deine Spiele strategisch mit unserer Start-Rotations-Planung. Sieh voraus, wie sich deine Aufstellung im Laufe des Spiels entwickelt, und
          optimiere deine Taktik.
        </p>
      </section>

      <section class="text-center my-8">
        <a href="#" class="btn btn-primary btn-lg">App herunterladen</a>
      </section>
    </main>

    <footer class="bg-gray-200 text-center p-4">
      <p>&copy; 2023 SV Beyendorf Volleyball</p>
    </footer>
  `,
})
export class LandingPageComponent implements OnInit {
  router = inject(Router);
  store = inject(Store);
  session = this.store.select(SessionState.session);
  ROUTES = SVB_APP_ROUTES;

  ngOnInit(): void {
    this.session.subscribe((user) => {
      if (user) {
        // this.router.navigate([ROUTES.root, ROUTES.user]);
      }
    });
  }
}
