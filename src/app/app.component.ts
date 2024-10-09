import { CommonModule } from '@angular/common';
import { Component, type OnInit, ViewChild, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { type MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { TranslocoModule } from '@jsverse/transloco';
import { dispatch, select } from '@ngxs/store';
import { filter } from 'rxjs';
import { ButtomNavComponent } from '../components/buttom-nav.component';
import { SupabaseService } from '../services/supabase.service';
import { SVB_APP_ROUTES } from './ROUTES';
import { AuthComponent } from './auth.component';
import { PwaService } from './pwa.service';
import { SessionState, setAuthSession } from './session.state';
@Component({
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    RouterModule,
    AuthComponent,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    ButtomNavComponent,
    TranslocoModule,
    CommonModule,
  ],

  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ROUTES = SVB_APP_ROUTES;
  snack = inject(MatSnackBar);
  router = inject(Router);
  supabase = inject(SupabaseService);
  pwa = inject(PwaService);
  sw = inject(SwUpdate);
  /**
   *
   */
  @ViewChild('drawer') drawer!: MatDrawer;
  /**
   *
   */
  session = select(SessionState.session);
  setSession = dispatch(setAuthSession);
  /**
   *
   */
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
        case 'VERSION_DETECTED': // Downloading new app version
          console.log('SW:VERSION_DETECTED', evt.version.hash);
          break;
        case 'VERSION_READY': // Current app version & New app version ready for use
          console.log('SW:VERSION_READY', `${evt.currentVersion.hash}:${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED': // Failed to install app version
          console.log('SW:VERSION_INSTALLATION_FAILED', `${evt.version.hash}:${evt.error}`);
          break;
      }
    });
  }
  /**
   *
   */
  #toggleDrawerOnNavEnd() {
    this.router.events.pipe(filter((e: any) => e instanceof NavigationEnd)).subscribe(() => {
      this.drawer.close();
    });
  }
  /**
   *
   */
  async logout() {
    try {
      await this.supabase.signOut();
      this.snack.open('Logged out', '', { duration: 1000 });
      this.router.navigate([SVB_APP_ROUTES.root]);
    } catch (error) {
      this.snack.open('Error while logging out', '', { duration: 1000 });
    }
  }
}
