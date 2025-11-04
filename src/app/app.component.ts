import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { TranslocoModule } from '@jsverse/transloco';
import { dispatch, select } from '@ngxs/store';
import { filter } from 'rxjs';
import { SupabaseService } from '../services/supabase.service';
import { SVB_APP_ROUTES } from './ROUTES';
import { PwaService } from './pwa.service';
import { SessionState, setAuthSession } from './session.state';

@Component({
  standalone: true,
  imports: [RouterModule, TranslocoModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ROUTES = SVB_APP_ROUTES;
  router = inject(Router);
  supabase = inject(SupabaseService);
  pwa = inject(PwaService);
  sw = inject(SwUpdate);

  session = select(SessionState.session);
  setSession = dispatch(setAuthSession);

  // Drawer state
  isDrawerOpen = signal(false);

  // Get current year for footer
  get currentYear(): number {
    return new Date().getFullYear();
  }

  toggleDrawer(): void {
    this.isDrawerOpen.update((value) => !value);
  }
  async ngOnInit() {
    this.#toggleDrawerOnNavEnd();
    this.pwa.init();
    if (!(await this.sw.activateUpdate)) return;
    const b = await this.sw.checkForUpdate();
    if (b) {
      try {
        await this.sw.activateUpdate();
      } catch (error) {
        console.error(error);
      }
    }
    this.sw.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log('SW:VERSION_DETECTED', evt.version.hash);
          break;
        case 'VERSION_READY':
          console.log('SW:VERSION_READY', `${evt.currentVersion.hash}:${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log('SW:VERSION_INSTALLATION_FAILED', `${evt.version.hash}:${evt.error}`);
          break;
      }
    });
  }

  #toggleDrawerOnNavEnd() {
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      this.isDrawerOpen.set(false);
    });
  }

  async logout() {
    try {
      await this.supabase.signOut();
      console.log('Logged out successfully');
      this.router.navigate([SVB_APP_ROUTES.root]);
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  }
}
