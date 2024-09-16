import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventsService } from '../services/events.service';
import { PlayerService } from '../services/player.service';
import { TeamsService } from '../services/teams.service';
import type { EventDTO, createEventDTO } from '../types/EventDTO';
import type { PlayerDTO } from '../types/PlayerDTO';

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
          <mat-label>Home</mat-label>
          <mat-select formControlName="home_team" (valueChange)="OnHomeTeamChange()" #homeTeam>
            <mat-option *ngFor="let item of teams | async" [value]="item.id">
              {{ item.name }}
            </mat-option>
          </mat-select>
          <mat-hint>
            <a [routerLink]="['/teams', homeTeam.value]"> Edit this team </a>
          </mat-hint>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>Away</mat-label>
          <mat-select formControlName="away_team">
            <mat-option *ngFor="let item of teams | async" [value]="item.id">
              {{ item.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>Attendees</mat-label>
          <mat-select placeholder="Players" formControlName="attendees" [multiple]="true">
            <mat-option *ngFor="let item of attendeesOptions" [value]="item?.id"> {{ item?.name }} ({{ item?.trikot }}) </mat-option>
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
  route = inject(ActivatedRoute);
  router = inject(Router);
  snack = inject(MatSnackBar);
  eventsService = inject(EventsService);
  playerService = inject(PlayerService);
  teamService = inject(TeamsService);
  teams = this.teamService.getTeams();
  players = this.playerService.getPlayers();
  attendeesOptions: (PlayerDTO | null)[] = [];
  createGameForm = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    title: new FormControl<string>('', Validators.required),
    date: new FormControl<Date>(new Date(), Validators.required),
    attendees: new FormControl<string[]>([]),
    home_team: new FormControl<string>(''),
    away_team: new FormControl<string>(''),
    owner: new FormControl<string>(''),
    shared_with: new FormControl<string[]>([]),
    visibility: new FormControl<'Public' | 'Private'>('Private'),
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
      // biome-ignore lint/style/useTemplate: <explanation>
      this.snack.open('Error creating Event:' + error, 'OK', { duration: 2000 });
    }
  }
  async OnHomeTeamChange() {
    const homeTeam = this.createGameForm.get('home_team')?.value;
    if (homeTeam) {
      const team = await this.teamService.getTeam(homeTeam);
      this.attendeesOptions = (await Promise.all(team.players.map(async (id) => await this.playerService.getPlayer(id)))).map((d) => d) || [];
    }
  }
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['game']) this.createGameForm.patchValue(data['game'] as EventDTO);
      this.OnHomeTeamChange();
    });
  }
}
