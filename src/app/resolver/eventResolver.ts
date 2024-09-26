import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { EventsService } from '../../services/events.service';
import { SupabaseService } from '../../services/supabase.service';
import { SessionState } from '../session.state';

export function eventResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    if (!id) return;
    return inject(EventsService).getEvent(id);
  };
}
export const userResolver: ResolveFn<any> = (route, state) => {
  const store = inject(Store);
  return store.selectOnce(SessionState.session);
  // return 'fuck';
};
