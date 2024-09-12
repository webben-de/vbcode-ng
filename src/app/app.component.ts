import { Component, type OnInit, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterEvent, RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SupabaseService } from '../services/supabase.service';
import { AuthComponent } from './auth.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [RouterModule, AuthComponent, MatIconModule, MatSidenavModule, MatListModule, MatSnackBarModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  snack = inject(MatSnackBar);
  router = inject(Router);
  supabase = inject(SupabaseService);

  session = this.supabase.session;

  ngOnInit() {
    this.supabase.authChanges((_, session) => {
      this.session = session;
      // this.router.navigate(['/report']);
    });
    // this.router.events.pipe(filter())
    initFlowbite();
  }
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
