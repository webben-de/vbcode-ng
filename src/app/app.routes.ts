import { inject } from '@angular/core';
import { type ActivatedRouteSnapshot, type CanActivateFn, type Route, Router } from '@angular/router';
import { CreateGamePageComponent } from '../pages/create-game-page.component';
import { CreateTeamPageComponent } from '../pages/create-team-page.component';
import { DataEntryComponent } from '../pages/data-entry-page.component';
import { GamesListPageComponent } from '../pages/games-list-page.component';
import { GameViewComponent } from '../pages/gameview-page.component';
import { ActionsService } from '../services/action.service';
import { EventsService } from '../services/events.service';
import { SupabaseService } from '../services/supabase.service';
import { TeamsService } from '../services/teams.service';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth.component';
import { RotationPlanerPageComponent } from '../pages/rotation-planer-page.component';

export enum ROUTES {
  report = 'report',
  reportDetail = 'report/details/:id',
  roationPlaner = 'rotation-planer',
  createGame = 'games/create',
  editGame = 'edit-game/:id',
  teams = 'teams',
}

export const appRoutes: Route[] = [
  {
    path: ROUTES.report,
    component: GameViewComponent,
    canActivate: [authenticationGuard()],
  },
  {
    path: ROUTES.reportDetail,
    component: GameViewComponent,
    resolve: {
      actions: actionResolver(),
      game: eventResolver(),
    },
  },
  { path: ROUTES.roationPlaner, component: RotationPlanerPageComponent },
  { path: ROUTES.roationPlaner + '/:id', component: RotationPlanerPageComponent, canActivate: [], resolve: { game: eventResolver() } },
  { path: ROUTES.createGame, component: CreateGamePageComponent, canActivate: [authenticationGuard()] },
  { path: ROUTES.editGame, component: CreateGamePageComponent, resolve: { game: eventResolver() } },
  { path: ROUTES.teams, component: CreateTeamPageComponent },
  { path: 'teams/:id', component: CreateTeamPageComponent, resolve: { team: teamResolver() } },
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
function teamResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    if (!id) return;
    return inject(TeamsService).getTeam(id);
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
