import { Component, type OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SVB_APP_ROUTES } from './ROUTES';
import { SessionState } from './session.state';

@Component({
  selector: 'app-home-redirect',
  standalone: true,
  template: `
    <div class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  `,
})
export class HomeRedirectComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  ngOnInit(): void {
    const session = this.store.selectSnapshot(SessionState.session);

    if (session) {
      // User is logged in, redirect to user dashboard
      this.router.navigate([SVB_APP_ROUTES.root, SVB_APP_ROUTES.user], { replaceUrl: true });
    } else {
      // User is not logged in, show public landing page
      this.router.navigate([SVB_APP_ROUTES.root, 'landing'], { replaceUrl: true });
    }
  }
}
