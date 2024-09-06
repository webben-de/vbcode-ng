import { Component, type OnInit, inject } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SupabaseService } from './supabase.service';
import { MatIconModule } from '@angular/material/icon';
import { initFlowbite } from 'flowbite';

@Component({
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [RouterModule, AuthComponent, MatIconModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  supabase = inject(SupabaseService);

  session = this.supabase.session;

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
    initFlowbite();
  }
}
