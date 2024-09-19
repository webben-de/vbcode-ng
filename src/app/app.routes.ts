import type { Route } from '@angular/router';
import { CreateGamePageComponent } from '../pages/create-game-page.component';
import { CreateTeamPageComponent } from '../pages/create-team-page.component';
import { DataEntryComponent } from '../pages/data-entry-page.component';
import { GamesListPageComponent } from '../pages/games-list-page.component';
import { GameViewComponent } from '../pages/gameview-page.component';
import { RotationPlanerPageComponent } from '../pages/rotation-planer-page.component';
import { ROUTES } from './ROUTES';
import authenticationGuard from './guards/authenticationGuardFn';
import actionResolver from './resolver/actionResolver';
import eventResolver from './resolver/eventResolver';
import teamResolver from './resolver/teamResolver';
import { LandingPageComponent } from '../pages/landing-page.component';
import { UserLandingPageComponent } from '../pages/user-landing-page.component';
import { provideStates, select } from '@ngxs/store';
import { SessionState } from './session.state';
import { GameDetailViewComponent } from '../pages/game-detail-view-page.component';
import { TeamListPageComponent } from '../pages/team-list.component';
import { AuthComponent } from './auth.component';

export const appRoutes: Route[] = [
  {
    path: ROUTES.report,
    component: GameViewComponent,
    canActivate: [authenticationGuard()],
  },
  {
    path: ROUTES.reportDetailId,
    component: GameDetailViewComponent,
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
    path: ROUTES.games + '/' + ROUTES.create,
    component: CreateGamePageComponent,
    canActivate: [authenticationGuard()],
  },
  {
    path: `${ROUTES.editGame}/:id`,
    component: CreateGamePageComponent,
    resolve: { game: eventResolver() },
  },
  { path: ROUTES.teams, component: TeamListPageComponent },
  {
    path: `${ROUTES.teams}/create`,
    component: CreateTeamPageComponent,
    resolve: { team: teamResolver() },
  },
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
  {
    path: ROUTES.user,
    component: UserLandingPageComponent,
    resolve: {
      user: () => () => {
        const session = select(SessionState.session);
        return session()?.user;
      },
    },
    providers: [provideStates([SessionState])],
    canActivate: [authenticationGuard()],
  },
  { path: '', component: LandingPageComponent },
  { path: '*', component: LandingPageComponent },
];
