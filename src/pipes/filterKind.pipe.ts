import { Pipe, type PipeTransform } from '@angular/core';
import type { ActionDTO } from '../types/ActionDTO';
import type { ActionKind } from '../types/ActionKind';

@Pipe({ name: 'kindFilter', standalone: true })
export class kindFilterPipe implements PipeTransform {
  /**
   *
   * @param actions
   * @param kind
   * @returns
   */
  transform(actions: ActionDTO[] | null, kind: ActionKind) {
    if (!actions) return;
    return actions.filter((a) => a.kind === kind);
  }
}
