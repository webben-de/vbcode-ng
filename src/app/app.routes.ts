import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, Route } from '@angular/router';
import { CreateGamePageComponent } from '../pages/create-game-page.component';
import { DataEntryComponent } from '../pages/data-entry-page.component';
import { GameDetailViewComponent } from '../pages/game-detail-view-page.component';
import { GamesListPageComponent } from '../pages/games-list-page.component';
import { GameViewComponent } from '../pages/gameview-page.component';
import { ActionsService } from '../services/action.service';
import { EventsService } from '../services/events.service';
import { AppComponent } from './app.component';

export const appRoutes: Route[] = [
  {
    path: 'gameview',
    component: GameViewComponent,
  },
  {
    path: 'gameview/:id',
    component: GameDetailViewComponent,
    resolve: {
      actions: actionResolver(),
      game: eventResolver(),
    },
  },
  { path: 'create-game', component: CreateGamePageComponent },
  { path: 'games', component: GamesListPageComponent },
  { path: 'dataentry', component: DataEntryComponent },
  { path: '*', component: AppComponent },
];

function eventResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    if (!id) return;
    return inject(EventsService).getEvent(id);
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
