import type { Route } from '@angular/router';
import { provideStates, select } from '@ngxs/store';
import { LandingPageComponent } from '../pages/landing-page.component';
import { UserLandingPageComponent } from '../pages/user-landing-page.component';
import { ROUTES } from './ROUTES';
import { AuthComponent } from './auth.component';
import authenticationGuard from './guards/authenticationGuardFn';
import { actionByKindAndGradeResolver, actionByKindAndPlayerResolver, actionByKindResolver, actionResolver } from './resolver/actionResolver';
import eventResolver from './resolver/eventResolver';
import teamResolver from './resolver/teamResolver';
import { SessionState } from './session.state';

export const appRoutes: Route[] = [
  {
    path: ROUTES.report,
    loadComponent: () => import('../pages/gameview-page.component').then((mod) => mod.GameViewComponent),
    canActivate: [authenticationGuard()],
  },
  {
    path: `${ROUTES.reportDetailId}/kind/:kind/player/:player`,
    pathMatch: 'full',
    loadComponent: () => import('../pages/report-details/sub-pages/report-player-detail-page.component').then((mod) => mod.ReportPlayerDetailPageComponent),
    resolve: {
      actions: actionByKindAndPlayerResolver(),
      // game: eventResolver(),
    },
  },
  {
    path: `${ROUTES.reportDetailId}/kind/:kind/grade/:grade`,
    pathMatch: 'full',
    loadComponent: () => import('../pages/report-details/sub-pages/report-grade-detail-page.component').then((mod) => mod.ReportGradeDetailPageComponent),
    resolve: {
      actions: actionByKindAndGradeResolver(),
      // game: eventResolver(),
    },
  },
  {
    path: `${ROUTES.reportDetailId}/grade/:grade`,
    pathMatch: 'full',
    loadComponent: () => import('../pages/report-details/sub-pages/report-grade-detail-page.component').then((mod) => mod.ReportGradeDetailPageComponent),
    resolve: {
      actions: actionByKindAndGradeResolver(),
      // game: eventResolver(),
    },
  },
  {
    path: `${ROUTES.reportDetailId}/kind/:kind`,
    pathMatch: 'full',
    loadComponent: () => import('../pages/report-details/sub-pages/report-kind-detail-page.component').then((mod) => mod.ReportKindDetailPageComponent),
    resolve: {
      actions: actionByKindResolver(),
      // game: eventResolver(),
    },
  },
  {
    path: ROUTES.reportDetailId,
    pathMatch: 'full',
    loadComponent: () => import('../pages/report-details/report-detail-view-page.component').then((mod) => mod.ReportDetailViewComponent),
    resolve: {
      actions: actionResolver(),
      game: eventResolver(),
    },
  },
  {
    path: `${ROUTES.roationPlaner}/:id`,
    loadComponent: () => import('../pages/rotation-planer-page.component').then((mod) => mod.RotationPlanerPageComponent),
    canActivate: [],
    resolve: { game: eventResolver() },
  },
  {
    path: ROUTES.roationPlaner,
    loadComponent: () => import('../pages/rotation-planer-page.component').then((mod) => mod.RotationPlanerPageComponent),
    canActivate: [],
    resolve: { game: eventResolver() },
  },
  {
    path: `${ROUTES.games}/${ROUTES.create}`,
    loadComponent: () => import('../pages/create-game-page.component').then((mod) => mod.CreateGamePageComponent),
    canActivate: [authenticationGuard()],
  },
  {
    path: `${ROUTES.editGame}/:id`,
    loadComponent: () => import('../pages/create-game-page.component').then((mod) => mod.CreateGamePageComponent),
    resolve: { game: eventResolver() },
  },
  {
    path: ROUTES.teams,
    loadComponent: () => import('../pages/team-list.component').then((mod) => mod.TeamListPageComponent),
  },
  {
    path: `${ROUTES.teams}/create`,
    loadComponent: () => import('../pages/create-team-page.component').then((mod) => mod.CreateTeamPageComponent),
    resolve: { team: teamResolver() },
  },
  {
    path: `${ROUTES.teams}/:id`,
    loadComponent: () => import('../pages/create-team-page.component').then((mod) => mod.CreateTeamPageComponent),
    resolve: { team: teamResolver() },
  },
  {
    path: ROUTES.games,
    loadComponent: () => import('../pages/games-list-page.component').then((mod) => mod.GamesListPageComponent),
  },
  {
    path: `${ROUTES.dataentry}/:id`,
    loadComponent: () => import('../pages/data-entry-page.component').then((mod) => mod.DataEntryComponent),
    canActivate: [authenticationGuard()],
    resolve: { event: eventResolver() },
  },
  {
    path: ROUTES.dataentry,
    loadComponent: () => import('../pages/data-entry-page.component').then((mod) => mod.DataEntryComponent),
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
