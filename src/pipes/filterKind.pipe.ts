import { Pipe, type PipeTransform } from '@angular/core';
import type { ActionDTO } from 'src/types/ActionDTO';
import type { ActionKind } from '../components/kind-options';

@Pipe({ name: 'kindFilter', standalone: true })
export class kindFilterPipe implements PipeTransform {
  transform(actions: ActionDTO[] | null, arg: ActionKind) {
    if (!actions) return;
    return actions.filter((a) => a.kind === arg);
  }
}
