import { Pipe, PipeTransform } from '@angular/core';
import { ActionDTO } from '../app/supabase.service';
import { ActionKind } from './kind-options';

@Pipe({ name: 'kindFilter', standalone: true })
export class kindFilterPipe implements PipeTransform {
  transform(actions: ActionDTO[] | null, arg: ActionKind) {
    if (!actions) return;
    return actions.filter((a) => a.kind === arg);
  }
}
