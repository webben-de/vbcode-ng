import { Component, type OnInit, ViewChild, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SupabaseService } from '../services/supabase.service';
import { AuthComponent } from './auth.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { ButtomNavComponent } from '../components/buttom-nav.component';

@Component({
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [RouterModule, AuthComponent, MatIconModule, MatSidenavModule, MatListModule, MatSnackBarModule, ButtomNavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
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
  session = this.supabase.session;
  /**
   *
   */
  ngOnInit() {
    this.supabase.authChanges((_, session) => {
      this.session = session;
    });
    this.#toggleDrawerOnNavEnd();
    initFlowbite();
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
      this.router.navigate(['/']);
    } catch (error) {
      this.snack.open('Error while logging out', '', { duration: 1000 });
    }
  }
}
