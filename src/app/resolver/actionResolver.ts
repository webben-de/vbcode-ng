import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot } from '@angular/router';
import { ActionsService } from '../../services/action.service';
import { ActionGrade } from '../../types/ActionGrade';
import { ActionKind } from '../../types/ActionKind';

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

export function actionByKindAndPlayerResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    const kind = route.paramMap.get('kind');
    const player = route.paramMap.get('player');
    if (!id || !kind || !player) return;
    return inject(ActionsService).getActionsOfEventByKindAndPlayer(id, kind, player);
  };
}

export function actionByKindAndGradeResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    const kind = route.paramMap.get('kind') as ActionKind;
    const grade = route.paramMap.get('grade') as ActionGrade;
    if (!id || !kind || !grade) return;
    return inject(ActionsService).getActionsOfEventByKindAndGrade(id, kind, grade);
  };
}
