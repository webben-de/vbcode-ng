import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { ROUTES } from 'src/app/ROUTES';
import { SessionState } from '../app/session.state';
import { EventsService } from '../services/events.service';
import { PlayerService } from '../services/player.service';
import { SupabaseService } from '../services/supabase.service';
import { TeamsService } from '../services/teams.service';
import type { EventDTO, createEventDTO } from '../types/EventDTO';
import type { PlayerDTO } from '../types/PlayerDTO';
import { AttendeesSelectFormControlComponent } from './atoms/attendees-select-form-control.component';
import { SingleRoationFormControlComponent } from './atoms/single-roation-form-control.component';

type NewType = unknown;

@Component({
  selector: 'app-create-game-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
    TranslocoModule,
    SingleRoationFormControlComponent,
    AttendeesSelectFormControlComponent,
  ],
  template: `
    <div class="flex flex-col items-start gap-8 h-full p-8">
      <span class="text-2xl font-bold">{{ 'create-a-new-game' | transloco }}</span>
      <form [formGroup]="createGameForm" #form (submit)="createGame()" class="flex flex-col w-full">
        <mat-form-field class="w-full">
          <mat-label>{{ 'title' | transloco }}</mat-label>
          <input matInput formControlName="title" />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ 'visibility' | transloco }}</mat-label>
          <mat-select formControlName="visibility">
            <mat-option *ngFor="let item of ['Private', 'Public']" [value]="item">
              {{ item }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>{{ 'date' | transloco }}</mat-label>
          <input matInput type="date" formControlName="date" />
        </mat-form-field>
        <hr />
        <span class="text-lg">{{ 'home' | transloco }}</span>
        <mat-form-field class="w-full">
          <mat-label>{{ 'home-team' | transloco }}</mat-label>
          <mat-select formControlName="home_team" (valueChange)="OnHomeTeamChange($event)" #homeTeam>
            @for (item of teams|async; track $index) {
            <mat-option [value]="item.id">
              {{ item.name }}
            </mat-option>
            }
          </mat-select>
          <mat-hint>
            <a [routerLink]="[ROUTES.root + ROUTES.teams, homeTeam.value]"> {{ 'edit-this-team' | transloco }} </a>
          </mat-hint>
        </mat-form-field>
        @if (homeTeam.value) {

        <span class="text-md">{{ 'start-rotation' | transloco }}</span>
        <div class="grid grid-cols-3">
          @for (index of [4,3,2,5,6,1]; track $index) {
          <app-single-roation-form-control
            [attendeesOptions]="attendeesOptions"
            [index]="index"
            [createGameForm]="this.createGameForm.controls.home_team_start_rotation"
          />
          }
        </div>
        }
        <hr />
        <div class="">
          <mat-form-field class="w-full">
            <mat-label>{{ 'away-team' | transloco }}</mat-label>
            <mat-select formControlName="away_team" #awayTeam>
              @for (item of teams|async; track $index) {
              <mat-option [value]="item.id">
                {{ item.name }}
              </mat-option>
              }
            </mat-select>
          </mat-form-field>
          @if (awayTeam.value) {

          <span class="text-md">{{ 'start-rotation' | transloco }}</span>
          <div class="grid grid-cols-3">
            @for (index of [4,3,2,5,6,1]; track $index) {
            <app-single-roation-form-control
              [attendeesOptions]="attendeesOptions"
              [index]="index"
              [createGameForm]="this.createGameForm.controls.away_team_start_rotation"
            />
            }
          </div>
          }
        </div>
        <app-attendees-select-form-control [attendeesOptions]="attendeesOptions" [attendees]="this.createGameForm.controls.attendees" />
        <button mat-button [type]="'submit'">{{ 'submit' | transloco }}</button>
      </form>
      <hr />
      <p>
        <a [routerLink]="[ROUTES.root, ROUTES.games]">{{ 'see-all-your-games-here' | transloco }}</a>
      </p>
    </div>
  `,
})
export class CreateGamePageComponent implements OnInit {
  ROUTES = ROUTES;
  /**
   *
   */
  route = inject(ActivatedRoute);
  router = inject(Router);
  snack = inject(MatSnackBar);
  eventsService = inject(EventsService);
  supabase = inject(SupabaseService);
  playerService = inject(PlayerService);
  teamService = inject(TeamsService);
  /**
   *
   */
  session = select(SessionState.session);
  /**
   *
   */
  teams = this.teamService.getTeams();
  players = this.playerService.getPlayers();
  attendeesOptions: (PlayerDTO | null)[] = [];
  createGameForm = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    title: new FormControl<string>('', Validators.required),
    date: new FormControl<Date>(new Date(), Validators.required),
    attendees: new FormControl<string[]>([]),
    home_team: new FormControl<string | undefined>(undefined),
    home_team_start_rotation: new FormGroup({
      1: new FormControl<string | null>(null),
      2: new FormControl<string | null>(null),
      3: new FormControl<string | null>(null),
      4: new FormControl<string | null>(null),
      5: new FormControl<string | null>(null),
      6: new FormControl<string | null>(null),
    }),
    away_team_start_rotation: new FormArray([
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
      new FormControl<string | null>(null),
    ]),
    away_team: new FormControl<string | undefined>(undefined),
    owner: new FormControl<string>(this.session()!.user.id, Validators.required),
    shared_with: new FormControl<string[]>([]),
    visibility: new FormControl<'Public' | 'Private'>('Private'),
  });
  /**
   *
   */
  async createGame() {
    const payload = this.createGameForm.value as createEventDTO | EventDTO;
    try {
      await this.eventsService.createEvent(payload);
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
  async OnHomeTeamChange($event?: string) {
    if (!$event) return;
    const team = await this.teamService.getTeam($event);
    this.attendeesOptions = await this.playerService.getPlayerList(team.players);
  }
  /**
   *
   */
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      if (data['game']) this.createGameForm.patchValue(data['game'] as EventDTO);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      this.OnHomeTeamChange(this.createGameForm.controls.home_team.value as any);
    });
  }
}
