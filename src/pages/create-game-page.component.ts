import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { EventsService } from '../services/events.service';
import { PlayerService } from '../services/player.service';
import { SupabaseService } from '../services/supabase.service';
import type { EventDTO, createEventDTO } from '../types/EventDTO';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        <mat-form-field>
          <mat-label>Gegner</mat-label>
          <input matInput placeholder="Gegener" formControlName="opponent" />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>Attendees</mat-label>
          <mat-select placeholder="Players" formControlName="attendees" [multiple]="true">
            <mat-option *ngFor="let item of players | async" [value]="item.id"> {{ item.name }} ({{ item.trikot }}) </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-button [type]="'submit'">Submit</button>
      </form>
      <hr />
      <p><a [routerLink]="['/games']">See all your games here</a></p>
    </div>
  `,
})
export class CreateGamePageComponent implements OnInit {
  snack = inject(MatSnackBar);
  router = inject(Router);
  eventsService = inject(EventsService);
  playerService = inject(PlayerService);
  supa = inject(SupabaseService);
  /**
   *
   */
  players = this.playerService.getPlayers();
  createGameForm = new FormGroup({
    // id: new FormControl<string | undefined>(undefined),
    title: new FormControl<string>('', Validators.required),
    date: new FormControl<Date>(new Date(), Validators.required),
    attendees: new FormControl<string[]>([]),
    owner: new FormControl<string | null>(null, Validators.required),
    opponent: new FormControl<string | null>(null, Validators.required),
  });
  /**
   *
   */
  async createGame() {
    const payload = this.createGameForm.value as createEventDTO;
    try {
      const event = await this.eventsService.createEvent(payload);
      this.createGameForm.reset();
      this.snack
        .open('Event create', 'open', { duration: 5000 })
        .onAction()
        .subscribe(() => {
          this.router.navigate(['/report', 'details', event.id]);
        });
    } catch (error) {
      this.snack.open('Error creating Event:' + error, 'OK', { duration: 2000 });
    }
  }

  ngOnInit(): void {
    if (this.supa._session) this.createGameForm.controls.owner.setValue(this.supa._session.user.id);
  }
}
