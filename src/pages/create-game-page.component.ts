import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { EventsService } from '../services/events.service';
import { PlayerService } from '../services/player.service';
import { SupabaseService } from '../services/supabase.service';
import type { EventDTO, createEventDTO } from '../types/EventDTO';

@Component({
  selector: 'app-create-game-page',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule, CommonModule, RouterModule],
  template: `
    <div class="flex flex-col items-start gap-8 h-full p-8">
      <h2>Create a new Game</h2>
      <form [formGroup]="createGameForm" #form (submit)="createGame()" class="flex flex-col w-full">
        <mat-form-field class="w-full">
          <mat-label>Title</mat-label>
          <input matInput placeholder="Friendship" formControlName="title" />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>Date</mat-label>
          <input matInput type="date" formControlName="date" placeholder="Friendship" />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>Attendees</mat-label>
          <mat-select placeholder="Players" formControlName="attendees" [multiple]="true">
            <mat-option *ngFor="let item of players | async" [value]="item.id"> {{ item.name }} ({{ item.trikot }}) </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-button [type]="'submit'">Submit</button>
      </form>
      <pre><code>{{createGameForm.value|json}}</code></pre>
      <hr />
      <p><a [routerLink]="['/games']">See all your games here</a></p>
    </div>
  `,
})
export class CreateGamePageComponent implements OnInit {
  eventsService = inject(EventsService);
  playerService = inject(PlayerService);
  players = this.playerService.getPlayers();
  createGameForm = new FormGroup({
    // id: new FormControl<string | undefined>(undefined),
    title: new FormControl<string>('', Validators.required),
    date: new FormControl<Date>(new Date(), Validators.required),
    attendees: new FormControl<string[]>([]),
  });
  /**
   *
   */
  async createGame() {
    const payload = this.createGameForm.value as createEventDTO;
    await this.eventsService.createEvent(payload);
  }

  ngOnInit(): void {}
}
