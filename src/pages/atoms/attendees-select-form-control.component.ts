import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { type FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@jsverse/transloco';
import type { PlayerDTO } from '../../types/PlayerDTO';

@Component({
  selector: 'app-attendees-select-form-control',
  standalone: true,
  template: ` <mat-form-field class="w-full">
    <mat-label>{{ 'attendees' | transloco }}</mat-label>
    <mat-select placeholder="Players" [formControl]="attendees()" [multiple]="true" #attendes>
      @for (item of playerList(); track $index) {
      <mat-option [value]="item?.id"> {{ item?.name }} ({{ item?.trikot }}) </mat-option>
      }
    </mat-select>
  </mat-form-field>`,
  imports: [MatFormFieldModule, MatSelectModule, CommonModule, TranslocoModule, ReactiveFormsModule],
})
export class AttendeesSelectFormControlComponent {
  playerList = input.required<(PlayerDTO | null)[]>();
  attendees = input.required<FormControl>();
}
