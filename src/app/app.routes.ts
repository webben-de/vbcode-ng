import type { Route } from '@angular/router';
import { GameViewComponent } from '../components/gameview.component';
import { AppComponent } from './app.component';
import { DataEntryComponent } from '../components/data-entry.component';

export const appRoutes: Route[] = [
  { path: 'gameview', component: GameViewComponent },
  { path: 'dataentry', component: DataEntryComponent },
  { path: '*', component: AppComponent },
];
