import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, Route } from '@angular/router';
import { DataEntryComponent } from '../components/data-entry.component';
import { GameDetailViewComponent } from '../components/game-detail-view.component';
import { GameViewComponent } from '../components/gameview.component';
import { AppComponent } from './app.component';
import { SupabaseService } from './supabase.service';

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
      game: (route: ActivatedRouteSnapshot) => {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        return inject(SupabaseService).getEvent(route.paramMap.get('id')!);
      },
    },
  },
  { path: 'dataentry', component: DataEntryComponent },
  { path: '*', component: AppComponent },
];
function actionResolver() {
  return (route: ActivatedRouteSnapshot) => {
    return inject(SupabaseService).getActionsOfEvent(
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      route.paramMap.get('id')!
    );
  };
}
