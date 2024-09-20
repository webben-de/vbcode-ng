import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot } from '@angular/router';
import { ActionsService } from '../../services/action.service';

/**
 *
 * @returns
 */
export function actionResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    if (!id) return;
    return inject(ActionsService).getActionsOfEvent(id);
  };
}

export function actionByKindResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    const kind = route.paramMap.get('kind');
    if (!id || !kind) return;
    return inject(ActionsService).getActionsOfEventByKind(id, kind);
  };
}
