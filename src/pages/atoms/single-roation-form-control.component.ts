import { Component, computed, input } from '@angular/core';
import { type FormArray, type FormControl, type FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AttendesAvailablePipe } from '../../pipes/attendesAvailable.pipe';
import { PrisitinePipe } from '../../pipes/prisitine.pipe';
import type { PlayerDTO } from '../../types/PlayerDTO';

type RotationFormGroup = FormGroup<{
  1: FormControl<string | null>;
  2: FormControl<string | null>;
  3: FormControl<string | null>;
  4: FormControl<string | null>;
  5: FormControl<string | null>;
  6: FormControl<string | null>;
}>;

@Component({
  selector: 'app-single-roation-form-control',
  standalone: true,
  host: { class: 'flex flex-col' },
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, PrisitinePipe, AttendesAvailablePipe],
  template: `
    <mat-form-field>
      <mat-label>{{ index() }}</mat-label>
      @let hm = home_team_start_rotation()['controls'];
      <mat-select [formControl]="hm[index()]">
        @for (item of attendeesPlayer() | pristine:hm:index(); track $index) {
        <mat-option [value]="item?.id"> {{ item?.trikot }} - {{ item?.name }} </mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class SingleRoationFormControlComponent {
  index = input.required<number>();
  home_team_start_rotation = input.required<RotationFormGroup | any>();

  playerList = input.required<PlayerDTO[]>();
  attendees = input.required<string[] | null>();
  attendeesPlayer = computed(() => this.attendees()?.map((id) => this.playerList().find((p) => p.id === id)) as PlayerDTO[]);
}
