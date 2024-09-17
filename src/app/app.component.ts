import { Component, type OnInit, ViewChild, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { type MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { dispatch, select } from '@ngxs/store';
import { filter } from 'rxjs';
import { ButtomNavComponent } from '../components/buttom-nav.component';
import { SupabaseService } from '../services/supabase.service';
import { ROUTES } from './ROUTES';
import { AuthComponent } from './auth.component';
import { SessionState, setAuthSession } from './session.state';

@Component({
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [RouterModule, AuthComponent, MatIconModule, MatSidenavModule, MatListModule, MatSnackBarModule, ButtomNavComponent, TranslocoModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ROUTES = ROUTES;
  snack = inject(MatSnackBar);
  router = inject(Router);
  supabase = inject(SupabaseService);
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
  ngOnInit() {
    this.supabase.authChanges((_, session) => {
      this.setSession(session);
    });
    this.#toggleDrawerOnNavEnd();
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
      this.router.navigate([ROUTES.root]);
    } catch (error) {
      this.snack.open('Error while logging out', '', { duration: 1000 });
    }
  }
}
