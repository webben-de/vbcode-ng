import { Component, type OnInit, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SupabaseService } from '../services/supabase.service';
import { AuthComponent } from './auth.component';

@Component({
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [RouterModule, AuthComponent, MatIconModule, MatSidenavModule, MatListModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  logout() {
    this.supabase.signOut();
  }
  supabase = inject(SupabaseService);
  router = inject(Router);

  session = this.supabase.session;

  ngOnInit() {
    this.supabase.authChanges((_, session) => {
      this.session = session;
      // this.router.navigate(['/report']);
    });
    initFlowbite();
  }
}
