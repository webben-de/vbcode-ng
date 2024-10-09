import { Pipe, type PipeTransform } from '@angular/core';
import type { FormControl } from '@angular/forms';
import type { PlayerDTO } from '../types/PlayerDTO';

@Pipe({
  name: 'pristine',
  pure: false,
  standalone: true,
})
export class PrisitinePipe implements PipeTransform {
  transform(attendees: PlayerDTO[], args: { [x: number]: FormControl }, index: number) {
    if (!attendees) return [];
    const alreadySetFormValues = Object.values(args).map((control: FormControl<string>) => control.value);
    const withoutOthers = attendees.filter((a) => !alreadySetFormValues.includes(a?.id)) || [];
    const currentPlayer = attendees.find((a) => a?.id === args[index].value); // to keep selcted vlaue visible
    return [...withoutOthers, currentPlayer];
  }
}
