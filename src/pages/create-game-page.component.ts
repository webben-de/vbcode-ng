import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { SupabaseService } from '../services/supabase.service';

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
          <mat-label>Home</mat-label>
          <mat-select formControlName="home_team" (valueChange)="OnHomeTeamChange($event)" #homeTeam>
            <mat-option *ngFor="let item of teams | async" [value]="item.id">
              {{ item.name }}
            </mat-option>
          </mat-select>
          <mat-hint>
            <a [routerLink]="['/teams', homeTeam.value]"> Edit this team </a>
          </mat-hint>
        </mat-form-field>
        <h5>Start Rotation</h5>
        <div class="grid grid-cols-3">
          @for(a of createGameForm.controls.home_team_start_rotation.controls ; track $index){

          <mat-form-field>
            <mat-label>{{ $index + 1 }}</mat-label>
            <mat-select [formControl]="a">
              @for (item of attendeesOptions; track $index) {
              <mat-option [value]="item?.id"> {{ item?.trikot }} - {{ item?.name }} </mat-option>
              }
            </mat-select>
          </mat-form-field>
          }
        </div>
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
          <mat-select placeholder="Players" formControlName="attendees" [multiple]="true" #attendes>
            <mat-option *ngFor="let item of attendeesOptions" [value]="item?.id"> {{ item?.name }} ({{ item?.trikot }}) </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-button [type]="'submit'">Submit</button>
        <pre><code>{{this.createGameForm}}</code></pre>
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
  supabase = inject(SupabaseService);
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
    home_team: new FormControl<string | undefined>(undefined),
    home_team_start_rotation: new FormArray([
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
    ]),
    away_team_start_rotation: new FormArray([
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
    ]),
    away_team: new FormControl<string | undefined>(undefined),
    owner: new FormControl<string>(this.supabase.session?.user.id!),
    shared_with: new FormControl<string[]>([]),
    visibility: new FormControl<'Public' | 'Private'>('Private'),
  });
  /**
   *
   */
  async createGame() {
    const payload = this.createGameForm.value as createEventDTO | EventDTO;
    try {
      const event = await this.eventsService.createEvent(payload);
      // this.createGameForm.reset();
      this.snack
        .open('Event create', 'open', { duration: 5000 })
        .onAction()
        .subscribe(() => {
          // this.router.navigate(['/report', 'details', event[0]?.id]);
        });
    } catch (error) {
      // biome-ignore lint/style/useTemplate: <explanation>
      this.snack.open('Error creating Event:' + error, 'OK', { duration: 2000 });
    }
  }
  /**
   *
   */
  async OnHomeTeamChange($event?: any) {
    const team = await this.teamService.getTeam($event);
    this.attendeesOptions = await this.playerService.getPlayerList(team.players);
  }
  /**
   *
   */
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['game']) this.createGameForm.patchValue(data['game'] as EventDTO);
      this.OnHomeTeamChange(this.createGameForm.controls.home_team.value);
    });
  }
}
