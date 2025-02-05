import { Pipe, type PipeTransform } from '@angular/core';
import type { PlayerDTO } from '../types/PlayerDTO';

//Pipe for filter only available players from an array
@Pipe({
  name: 'onlyAvailable',
  standalone: true,
  pure: true,
})
export class OnlyAvailablePipe implements PipeTransform {
  transform(value: PlayerDTO[] | null, players: PlayerDTO[]): PlayerDTO[] {
    if (!value) return [];
    return value.filter((item) => !players.find((player) => player.id === item.id));
  }
}
