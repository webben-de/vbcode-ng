import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, Route } from '@angular/router';
import { DataEntryComponent } from '../components/data-entry.component';
import { GameDetailViewComponent } from '../components/game-detail-view.component';
import { GameViewComponent } from '../components/gameview.component';
import { ActionsService } from '../services/action.service';
import { EventsService } from '../services/events.service';
import { SupabaseService } from '../services/supabase.service';
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
