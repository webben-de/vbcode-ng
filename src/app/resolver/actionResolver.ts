import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot } from '@angular/router';
import { ActionsService } from '../../services/action.service';

/**
 *
 * @returns
 */
export default function actionResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    if (!id) return;
    return inject(ActionsService).getActionsOfEvent(id);
  };
}
