import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import type { PlayerDTO } from '../../types/PlayerDTO';

@Component({
  selector: 'app-grid-item',
  host: { class: 'p-5 border border-1 flex justify-center items-center h-full' },
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col justify-center items-center gap-2 ">
      @let roation = rotationMap.get(currentRotation()); @let player = roatedPlayer().get(roation!.get(index())!);
      <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
        <span class="countdown font-league text-5xl text-center">
          <span style="--value:{{ !toggleTrikot() ? rotationIndexMap.get(index()) : player?.trikot }};"></span>
        </span>
      </div>
      <label class="swap font-league uppercase ">
        {{ player?.name }}
      </label>
    </div>
  `,
})
export class RotationGridItemComponent {
  currentRotation = input.required<string>();
  index = input.required<number>();
  toggleTrikot = input.required<boolean>();
  roatedPlayer = input.required<Map<number | string, PlayerDTO>>();
  rotationIndexMap = new Map().set(1, '4').set(2, '3').set(3, '2').set(4, '5').set(5, '6').set(6, '1');
  rotationMap: Map<string | number, Map<string | number, number | string>> = new Map()
    .set('1', new Map().set(1, 4).set(2, 3).set(3, 2).set(4, 5).set(5, 6).set(6, 1))
    .set('2', new Map().set(1, 5).set(2, 4).set(3, 3).set(4, 6).set(5, 1).set(6, 2))
    .set('3', new Map().set(1, 6).set(2, 5).set(3, 4).set(4, 1).set(5, 2).set(6, 3))
    .set('4', new Map().set(1, 1).set(2, 6).set(3, 5).set(4, 2).set(5, 3).set(6, 4))
    .set('5', new Map().set(1, 2).set(2, 1).set(3, 6).set(4, 3).set(5, 4).set(6, 5))
    .set('6', new Map().set(1, 3).set(2, 2).set(3, 1).set(4, 4).set(5, 5).set(6, 6));
}
