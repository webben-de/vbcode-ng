import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot } from '@angular/router';
import { EventsService } from '../../services/events.service';

export default function eventResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    if (!id) return;
    return inject(EventsService).getEvent(id);
  };
}
