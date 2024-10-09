import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { select } from '@ngxs/store';
import { SVB_APP_ROUTES } from 'src/app/ROUTES';
import { SessionState } from '../app/session.state';
import { PristineEventPipe } from '../pipes/pristineEvent.pipe';
import { EventsService } from '../services/events.service';
import { PlayerService } from '../services/player.service';
import { SupabaseService } from '../services/supabase.service';
import { type TeamDTO, TeamsService } from '../services/teams.service';
import type { EventDTO, createEventDTO } from '../types/EventDTO';
import type { PlayerDTO } from '../types/PlayerDTO';
import { AttendeesSelectFormControlComponent } from './atoms/attendees-select-form-control.component';
import { SingleRoationFormControlComponent } from './atoms/single-roation-form-control.component';

@Component({
  selector: 'app-create-game-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
    TranslocoModule,
    SingleRoationFormControlComponent,
    PristineEventPipe,
    AttendeesSelectFormControlComponent,
  ],
  template: `
    <div class="flex flex-col items-start gap-8 h-full p-8">
      <span class="text-2xl font-bold">
        @if (!createGameForm.controls.id.value) {
        {{ 'create-a-new-game' | transloco }}
        }@else {
        {{ 'edit-a-game' | transloco }}

        }
      </span>
      <form [formGroup]="createGameForm" #form (submit)="createGame()" class="flex flex-col w-full">
        <mat-form-field class="w-full">
          <mat-label>{{ 'title' | transloco }}</mat-label>
          <input matInput formControlName="title" />
        </mat-form-field>
        <div class="flex justify-between">
          <mat-form-field class="w-1/3">
            <mat-label>{{ 'visibility' | transloco }}</mat-label>
            <mat-select formControlName="visibility">
              <mat-option *ngFor="let item of ['Private', 'Public']" [value]="item">
                {{ item }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field class="w-1/2">
            <mat-label>{{ 'date' | transloco }}</mat-label>
            <input matInput type="date" formControlName="date" />
          </mat-form-field>
        </div>
        <!-- ALL ATTENDEES AVAILABLE FROM THE (HOME) TEAM -->

        <hr />
        <span class="text-lg">{{ 'home' | transloco }}</span>
        <mat-form-field class="w-full">
          <mat-label>{{ 'home-team' | transloco }}</mat-label>
          <mat-select formControlName="home_team" (valueChange)="OnHomeTeamChange($event)" #homeTeam>
            @for (item of teams; track $index) {
            <mat-option [value]="item.id">
              {{ item.name }}
            </mat-option>
            }
          </mat-select>
          <mat-hint>
            <a [routerLink]="[ROUTES.root + ROUTES.teams, homeTeam.value]"> {{ 'edit-this-team' | transloco }} </a>
          </mat-hint>
        </mat-form-field>
        @if (createGameForm.controls.home_team.valid) {
        <app-attendees-select-form-control [playerList]="playerList" [attendees]="createGameForm.controls.attendees" />
        }
        <!-- -->
        @if (homeTeam.value) {

        <span class="text-md">{{ 'start-rotation' | transloco }}</span>
        <p>Bezieht sich nur auf Satz 1 solange diese noch nicht Satzweise abgepasst werden kann</p>
        <div class="grid grid-cols-3">
          @for (index of [4,3,2,5,6,1]; track $index) {
          <app-single-roation-form-control
            [playerList]="playerList"
            [index]="index"
            [attendees]="createGameForm.controls.attendees.value"
            [home_team_start_rotation]="createGameForm.controls.home_team_start_rotation"
          />
          }
        </div>
        }
        <hr class="my-2" />
        <div class="">
          <mat-form-field class="w-full">
            <mat-label>{{ 'away-team' | transloco }}</mat-label>
            <mat-select formControlName="away_team" #awayTeam>
              @for (item of teams |pristineEvent: homeTeam.value; track $index) {
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
              [playerList]="playerList"
              [attendees]="createGameForm.controls.attendees.value"
              [index]="index"
              [home_team_start_rotation]="createGameForm.controls.away_team_start_rotation"
            />
            }
          </div>
          }
        </div>
        <label class="label cursor-pointer">
          <span class="label-text">{{ 'event-finished' | transloco }}</span>
          <input type="checkbox" class="toggle" #eventFinished />
        </label>
        {{ eventFinished.value }}
        @if (eventFinished.checked || createGameForm.controls.result_home.value || createGameForm.controls.result_away.value) {

        <div class="flex gap-2 w-full">
          <div class="w-1/2">
            <mat-form-field class="w-full">
              <mat-label>{{ 'result-home' | transloco }} </mat-label>
              <input matInput type="number" formControlName="result_home" />
            </mat-form-field>
          </div>
          <div class="w-1/2">
            <mat-form-field class="w-full">
              <mat-label>{{ 'result-away' | transloco }} </mat-label>
              <input matInput type="number" formControlName="result_away" />
            </mat-form-field>
          </div>
        </div>
        }
        <button class="btn" [type]="'submit'">{{ 'submit' | transloco }}</button>
      </form>
      <hr />
      <p class="flex flex-col  gap-2">
        <a class="btn btn-outline btn-secondary" [routerLink]="[ROUTES.root, ROUTES.games]">{{ 'see-all-your-games-here' | transloco }}</a>
        @if (createGameForm.controls.id.value) {

        <a class="btn btn-outline btn-secondary" [routerLink]="[ROUTES.root, ROUTES.roationPlaner, createGameForm.controls.id.value]">{{
          'See Rotation Preview' | transloco
        }}</a>
        }
      </p>
    </div>
  `,
})
export class CreateGamePageComponent implements OnInit {
  ROUTES = SVB_APP_ROUTES;
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
  teams: TeamDTO[] = [];
  players = this.playerService.getPlayers();
  playerList: PlayerDTO[] = [];
  createGameForm = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    title: new FormControl<string>('', Validators.required),
    date: new FormControl<Date>(new Date(), Validators.required),
    attendees: new FormControl<string[]>([]),
    result_home: new FormControl<number | undefined>(undefined),
    result_away: new FormControl<number | undefined>(undefined),
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
      this.snack.open('Error creating Event:' + error, 'OK', {
        duration: 2000,
      });
    }
  }
  /**
   *
   */
  async OnHomeTeamChange($event?: string) {
    if (!$event) return;
    const team = await this.teamService.getTeam($event);
    this.playerList = await this.playerService.getPlayerList(team.players);
  }
  /**
   *
   */
  async ngOnInit() {
    this.route.data.subscribe((data) => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      if (data['game']) this.createGameForm.patchValue(data['game'] as EventDTO);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      this.OnHomeTeamChange(this.createGameForm.controls.home_team.value as any);
    });
    this.teams = await this.teamService.getTeams();
  }
}
