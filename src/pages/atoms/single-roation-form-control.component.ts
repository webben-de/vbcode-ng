import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PlayerDTO } from '../../types/PlayerDTO';
import { PrisitinePipe } from '../../pipes/prisitine.pipe';

@Component({
  selector: 'app-single-roation-form-control',
  standalone: true,
  host: { class: 'flex flex-col' },
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, PrisitinePipe],
  template: `
    <mat-form-field>
      <mat-label>{{ index() }}</mat-label>
      <mat-select [formControl]="createGameForm()['controls'][index()]">
        @for (item of attendeesOptions() | pristine:createGameForm()['controls'] ; track $index) {
        <mat-option [value]="item?.id"> {{ item?.trikot }} - {{ item?.name }} </mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class SingleRoationFormControlComponent {
  index = input.required<number>();
  createGameForm = input.required<any>();

  attendeesOptions = input.required<PlayerDTO[]>();
}
