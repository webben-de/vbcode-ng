import { Pipe, type PipeTransform } from '@angular/core';
import type { FormControl } from '@angular/forms';
import type { TeamDTO } from '../services/teams.service';
import type { EventDTO } from '../types/EventDTO';

@Pipe({
  name: 'pristineEvent',
  standalone: true,
})
export class PristineEventPipe implements PipeTransform {
  transform(value: TeamDTO[] | null, otherForm: string) {
    if (!value) return null;
    return value.filter((v) => v.id !== otherForm);
  }
}
