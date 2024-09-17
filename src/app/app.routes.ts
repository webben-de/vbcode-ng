import type { Route } from '@angular/router';
import { CreateGamePageComponent } from '../pages/create-game-page.component';
import { CreateTeamPageComponent } from '../pages/create-team-page.component';
import { DataEntryComponent } from '../pages/data-entry-page.component';
import { GamesListPageComponent } from '../pages/games-list-page.component';
import { GameViewComponent } from '../pages/gameview-page.component';
import { RotationPlanerPageComponent } from '../pages/rotation-planer-page.component';
import { ROUTES } from './ROUTES';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth.component';
import authenticationGuard from './guards/authenticationGuardFn';
import actionResolver from './resolver/actionResolver';
import eventResolver from './resolver/eventResolver';
import teamResolver from './resolver/teamResolver';

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
  {
    path: `${ROUTES.roationPlaner}/:id`,
    component: RotationPlanerPageComponent,
    canActivate: [],
    resolve: { game: eventResolver() },
  },
  {
    path: ROUTES.createGame,
    component: CreateGamePageComponent,
    canActivate: [authenticationGuard()],
  },
  {
    path: `${ROUTES.editGame}/:id`,
    component: CreateGamePageComponent,
    resolve: { game: eventResolver() },
  },
  { path: ROUTES.teams, component: CreateTeamPageComponent },
  {
    path: `${ROUTES.teams}/:id`,
    component: CreateTeamPageComponent,
    resolve: { team: teamResolver() },
  },
  { path: ROUTES.games, component: GamesListPageComponent },
  {
    path: `${ROUTES.dataentry}/:id`,
    component: DataEntryComponent,
    canActivate: [authenticationGuard()],
  },
  {
    path: ROUTES.dataentry,
    component: DataEntryComponent,
    canActivate: [authenticationGuard()],
  },
  { path: ROUTES.login, component: AuthComponent },
  { path: '*', component: AppComponent },
];
