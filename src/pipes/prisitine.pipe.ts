import { Pipe, PipeTransform } from '@angular/core';
import { PlayerDTO } from '../types/PlayerDTO';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'pristine',
  standalone: true,
})
export class PrisitinePipe implements PipeTransform {
  transform(attendees: PlayerDTO[], args: { [x: number]: FormControl }) {
    if (!args) return attendees;
    console.log(attendees);
    const ids = Object.values(args).map((fc) => fc.value);
    console.log('All Ids in Controls: ', ids);
    const attendessIds = attendees.filter((a) => !ids.includes(a.id));
    console.log('All attendees: ', attendessIds);
    return attendessIds || [];
  }
}
