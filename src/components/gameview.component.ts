import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActionDTO, SupabaseService } from '../app/supabase.service';
import { MatFormField } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-gameview',
  imports: [
    CommonModule,
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  standalone: true,
  template: `
    <div class="flex p-5">
      <form [formGroup]="gameF">
        <mat-form-field>
          <mat-label>Game:</mat-label>
          <mat-select formControlName="game_id">
            @for (item of events|async; track $index) {
            <mat-option [value]="item.id" selected>
              {{ item.title }}
            </mat-option>
            }
          </mat-select>
        </mat-form-field>
      </form>
    </div>
    <hr />
    <ul class="flex flex-col">
      @for (item of actions|async; track $index) {
      <li class="flex gap-2 text-pretty h-4 w-full justify-between ">
        <span>{{ item.player_id?.name }}</span>
        <span>{{ item.kind }}</span>
        <span>{{ item.character }}</span>
        <span>{{ item.grade }}</span>
        <span>{{ item.game_id?.title }}</span>
        <span>{{ item.game_id?.date }}</span>
      </li>
      }
    </ul>
  `,
})
export class GameViewComponent implements OnInit {
  supabase = inject(SupabaseService);

  events = this.supabase.getEvents();

  actions?: Promise<ActionDTO[]>;
  gameF = new FormGroup({
    game_id: new FormControl<string>(''),
  });
  async ngOnInit() {
    this.events = this.supabase.getEvents();
    this.gameF.controls.game_id.setValue((await this.events)[0].id);
    this.gameF.controls.game_id.valueChanges.subscribe((d) => {
      if (d) this.actions = this.supabase.getActionsOfEvent(d);
    });
  }
}
