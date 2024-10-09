import { Pipe, type PipeTransform } from '@angular/core';
import type { FormControl } from '@angular/forms';
import type { PlayerDTO } from '../types/PlayerDTO';

@Pipe({
  name: 'attendesAvailable',
  standalone: true,
})
export class AttendesAvailablePipe implements PipeTransform {
  transform(attendees: PlayerDTO[], args: { [x: number]: FormControl }) {
    if (!args) return attendees;
    const ids = Object.values(args).map((control) => control.value);
    // const attendessIds = attendees.filter((player) => ids.includes(player.id));
    return attendees || [];
  }
}
