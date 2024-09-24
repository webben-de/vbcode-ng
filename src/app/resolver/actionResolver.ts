import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot } from '@angular/router';
import { ActionsService } from '../../services/action.service';
import type { ActionGrade } from '../../types/ActionGrade';
import type { ActionKind } from '../../types/ActionKind';

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

export function actionByGradeAndPlayerResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    const grade = route.paramMap.get('grade') as ActionGrade;
    const player = route.paramMap.get('player');
    if (!id || !grade || !player) return;
    return inject(ActionsService).getActionsOfEventByGradeAndPlayer(id, grade, player);
  };
}
export function actionByGradeResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    const grade = route.paramMap.get('grade') as ActionGrade;
    if (!id || !grade) return;
    return inject(ActionsService).getActionsOfEventByGrade(id, grade);
  };
}

export function actionsByPlayerResolver() {
  return (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id');
    const player = route.paramMap.get('player');
    if (!id || !player) return;
    return inject(ActionsService).getActionsOfEventByPlayer(id, player);
  };
}
