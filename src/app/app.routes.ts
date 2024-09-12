import { inject } from '@angular/core';
import { Router, type ActivatedRouteSnapshot, type CanActivateFn, type Route } from '@angular/router';
import { CreateGamePageComponent } from '../pages/create-game-page.component';
import { DataEntryComponent } from '../pages/data-entry-page.component';
import { GameDetailViewComponent } from '../pages/game-detail-view-page.component';
import { GamesListPageComponent } from '../pages/games-list-page.component';
import { GameViewComponent } from '../pages/gameview-page.component';
import { ActionsService } from '../services/action.service';
import { EventsService } from '../services/events.service';
import { AppComponent } from './app.component';
import { SupabaseService } from '../services/supabase.service';
import { AuthComponent } from './auth.component';

export const appRoutes: Route[] = [
  {
    path: 'report',
    component: GameViewComponent,
    canActivate: [authenticationGuard()],
  },
  {
    path: 'report/details/:id',
    component: GameDetailViewComponent,
    resolve: {
      actions: actionResolver(),
      game: eventResolver(),
    },
  },
  { path: 'games/create', component: CreateGamePageComponent, canActivate: [authenticationGuard()] },
  { path: 'games', component: GamesListPageComponent },
  { path: 'dataentry/:id', component: DataEntryComponent, canActivate: [authenticationGuard()] },
  { path: 'dataentry', component: DataEntryComponent, canActivate: [authenticationGuard()] },
  { path: 'login', component: AuthComponent },
  { path: '*', component: AppComponent },
];

function eventResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    if (!id) return;
    return inject(EventsService).getEvent(id);
  };
}

export function authenticationGuard(): CanActivateFn {
  return () => {
    const supabase = inject(SupabaseService);
    const router = inject(Router);

    if (supabase.session) {
      return true;
    }
    return router.navigate(['/login']);
  };
}
/**
 *
 * @returns
 */
function actionResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    if (!id) return;
    return inject(ActionsService).getActionsOfEvent(id);
  };
}
